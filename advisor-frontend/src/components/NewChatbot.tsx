import React, { useEffect } from 'react';

interface NewChatbotProps {
  isVisible: boolean;
}

const NewChatbot: React.FC<NewChatbotProps> = ({ isVisible }) => {
  useEffect(() => {
    if (!isVisible) return;

    // Check if scripts are already loaded
    if (window.botpressWebchat) {
      return;
    }

    // Load Botpress webchat script
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v3.2/inject.js';
    injectScript.defer = true;
    document.head.appendChild(injectScript);

    // Load bot configuration script
    const botScript = document.createElement('script');
    botScript.src = 'https://files.bpcontent.cloud/2025/03/29/10/20250329102306-6BV2I5JN.js';
    botScript.defer = true;
    document.head.appendChild(botScript);

    return () => {
      // Cleanup: Remove scripts when component unmounts or becomes invisible
      const scripts = document.querySelectorAll('script[src*="botpress"]');
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [isVisible]);

  // This component doesn't render anything visible - Botpress handles the UI
  return null;
};

export default NewChatbot;
