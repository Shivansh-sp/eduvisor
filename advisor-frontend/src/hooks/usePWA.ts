import { useState, useEffect } from 'react';
import {
  registerServiceWorker,
  subscribeToNotifications,
  isOnline,
  addNetworkListener,
  setupInstallPrompt,
  triggerInstall,
  canInstallPWA,
  isStandalone,
  saveToOfflineStorage,
  getFromOfflineStorage
} from '../utils/pwaUtils';

interface PWAState {
  isOnline: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  isLoading: boolean;
  hasNotificationPermission: boolean;
  serviceWorkerRegistration: ServiceWorkerRegistration | null;
}

export const usePWA = () => {
  const [pwaState, setPwaState] = useState<PWAState>({
    isOnline: isOnline(),
    isInstallable: canInstallPWA(),
    isInstalled: isStandalone(),
    isLoading: true,
    hasNotificationPermission: Notification?.permission === 'granted',
    serviceWorkerRegistration: null
  });

  useEffect(() => {
    const initializePWA = async () => {
      try {
        // Register service worker
        const registration = await registerServiceWorker();
        
        setPwaState(prev => ({
          ...prev,
          serviceWorkerRegistration: registration,
          isLoading: false
        }));

        // Setup install prompt
        setupInstallPrompt();

        // Subscribe to notifications if permission granted
        if (registration && Notification?.permission === 'granted') {
          await subscribeToNotifications(registration);
        }
      } catch (error) {
        console.error('PWA initialization failed:', error);
        setPwaState(prev => ({
          ...prev,
          isLoading: false
        }));
      }
    };

    initializePWA();

    // Network status listener
    const removeNetworkListener = addNetworkListener((online) => {
      setPwaState(prev => ({
        ...prev,
        isOnline: online
      }));

      if (online) {
        // Sync offline data when back online
        syncOfflineData();
      }
    });

    // Listen for app installed event
    const handleAppInstalled = () => {
      setPwaState(prev => ({
        ...prev,
        isInstalled: true,
        isInstallable: false
      }));
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup
    return () => {
      if (typeof removeNetworkListener === 'function') {
        (removeNetworkListener as () => void)();
      }
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async (): Promise<boolean> => {
    if (!pwaState.isInstallable) {
      return false;
    }

    const installed = await triggerInstall();
    if (installed) {
      setPwaState(prev => ({
        ...prev,
        isInstalled: true,
        isInstallable: false
      }));
    }
    return installed;
  };

  const requestNotifications = async (): Promise<boolean> => {
    if (!pwaState.serviceWorkerRegistration) {
      return false;
    }

    try {
      const subscription = await subscribeToNotifications(pwaState.serviceWorkerRegistration);
      const hasPermission = subscription !== null;
      
      setPwaState(prev => ({
        ...prev,
        hasNotificationPermission: hasPermission
      }));

      return hasPermission;
    } catch (error) {
      console.error('Notification subscription failed:', error);
      return false;
    }
  };

  const saveOfflineData = (key: string, data: any): void => {
    saveToOfflineStorage(key, data);
  };

  const getOfflineData = (key: string): any | null => {
    return getFromOfflineStorage(key);
  };

  const syncOfflineData = async (): Promise<void> => {
    // Implement offline data synchronization logic
    try {
      const offlineKeys = Object.keys(localStorage).filter(key => key.startsWith('offline_'));
      
      for (const key of offlineKeys) {
        const data = getFromOfflineStorage(key.replace('offline_', ''));
        if (data) {
          // Sync data with server
          console.log('Syncing offline data:', key, data);
          // Implement actual sync logic here
        }
      }
    } catch (error) {
      console.error('Offline data sync failed:', error);
    }
  };

  const showNotification = (title: string, options?: NotificationOptions): void => {
    if (pwaState.hasNotificationPermission && 'Notification' in window) {
      new Notification(title, {
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        ...options
      });
    }
  };

  return {
    ...pwaState,
    installApp,
    requestNotifications,
    saveOfflineData,
    getOfflineData,
    syncOfflineData,
    showNotification
  };
};

// Hook for offline-first data fetching
export const useOfflineFirst = <T>(
  key: string,
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { isOnline, saveOfflineData, getOfflineData } = usePWA();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to get cached data first
        const cachedData = getOfflineData(key);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
        }

        // If online, fetch fresh data
        if (isOnline) {
          const freshData = await fetchFn();
          setData(freshData);
          saveOfflineData(key, freshData);
        } else if (!cachedData) {
          throw new Error('No cached data available and device is offline');
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, isOnline, ...dependencies]);

  const refetch = async (): Promise<void> => {
    if (isOnline) {
      try {
        setLoading(true);
        const freshData = await fetchFn();
        setData(freshData);
        saveOfflineData(key, freshData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    data,
    loading,
    error,
    refetch,
    isStale: !isOnline && data !== null
  };
};
