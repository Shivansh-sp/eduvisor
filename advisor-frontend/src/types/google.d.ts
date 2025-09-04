
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: any) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: (callback: (notification: any) => void) => void;
          renderButton: (element: HTMLElement, config: {
            theme: string;
            size: string;
            width: string;
            text: string;
            shape: string;
          }) => void;
        };
      };
    };
  }
}

export {};
