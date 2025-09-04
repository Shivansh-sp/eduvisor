// PWA Utilities
export const isPWASupported = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

export const isStandalone = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone ||
         document.referrer.includes('android-app://');
};

export const canInstallPWA = (): boolean => {
  return !isStandalone() && isPWASupported();
};

// Service Worker Registration
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!isPWASupported()) {
    console.log('PWA not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered successfully:', registration);
    
    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content available, show update notification
            showUpdateNotification();
          }
        });
      }
    });
    
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

// Push Notification Utilities
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const subscribeToNotifications = async (registration: ServiceWorkerRegistration): Promise<PushSubscription | null> => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      return null;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY || '')
    });

    console.log('Push subscription successful:', subscription);
    return subscription;
  } catch (error) {
    console.error('Push subscription failed:', error);
    return null;
  }
};

// Offline Storage Utilities
export const saveToOfflineStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(`offline_${key}`, JSON.stringify({
      data,
      timestamp: Date.now(),
      version: '1.0'
    }));
  } catch (error) {
    console.error('Failed to save to offline storage:', error);
  }
};

export const getFromOfflineStorage = (key: string): any | null => {
  try {
    const stored = localStorage.getItem(`offline_${key}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Check if data is not too old (7 days)
      if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
        return parsed.data;
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to get from offline storage:', error);
    return null;
  }
};

export const clearOfflineStorage = (): void => {
  try {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('offline_'));
    keys.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Failed to clear offline storage:', error);
  }
};

// Network Status
export const isOnline = (): boolean => {
  return navigator.onLine;
};

export const addNetworkListener = (callback: (online: boolean) => void): (() => void) => {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return (): void => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Install Prompt
let deferredPrompt: any = null;

export const setupInstallPrompt = (): void => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt();
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    deferredPrompt = null;
    hideInstallPrompt();
  });
};

export const triggerInstall = async (): Promise<boolean> => {
  if (!deferredPrompt) {
    return false;
  }

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt');
    deferredPrompt = null;
    return true;
  } else {
    console.log('User dismissed the install prompt');
    return false;
  }
};

// Background Sync
export const registerBackgroundSync = async (tag: string): Promise<void> => {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await (registration as any).sync.register(tag);
      console.log('Background sync registered:', tag);
    } catch (error) {
      console.error('Background sync registration failed:', error);
    }
  }
};

// Helper Functions
const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const showUpdateNotification = (): void => {
  // Show a notification to user about available update
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="position: fixed; top: 20px; right: 20px; background: #4f46e5; color: white; padding: 16px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000; max-width: 300px;">
      <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Update Available</h4>
      <p style="margin: 0 0 12px 0; font-size: 12px;">A new version of EduAdvisor is available.</p>
      <button onclick="window.location.reload()" style="background: white; color: #4f46e5; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; cursor: pointer;">Update Now</button>
      <button onclick="this.parentElement.remove()" style="background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); padding: 6px 12px; border-radius: 4px; font-size: 12px; margin-left: 8px; cursor: pointer;">Later</button>
    </div>
  `;
  document.body.appendChild(notification);
};

const showInstallPrompt = (): void => {
  // Show install prompt
  const prompt = document.createElement('div');
  prompt.id = 'install-prompt';
  prompt.innerHTML = `
    <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: white; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.12); z-index: 1000; max-width: 400px; margin: 0 auto; border: 1px solid #e5e7eb;">
      <div style="padding: 20px;">
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #6366f1, #22c55e); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <span style="color: white; font-size: 20px;">📚</span>
          </div>
          <div>
            <h4 style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937;">Install EduAdvisor</h4>
            <p style="margin: 0; font-size: 12px; color: #6b7280;">Get the full app experience</p>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button id="install-btn" style="flex: 1; background: #6366f1; color: white; border: none; padding: 10px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">Install</button>
          <button onclick="document.getElementById('install-prompt').remove()" style="flex: 1; background: #f3f4f6; color: #374151; border: none; padding: 10px 16px; border-radius: 6px; font-size: 14px; cursor: pointer;">Not Now</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(prompt);
  
  document.getElementById('install-btn')?.addEventListener('click', () => {
    triggerInstall().then((installed) => {
      if (installed) {
        document.getElementById('install-prompt')?.remove();
      }
    });
  });
};

const hideInstallPrompt = (): void => {
  const prompt = document.getElementById('install-prompt');
  if (prompt) {
    prompt.remove();
  }
};
