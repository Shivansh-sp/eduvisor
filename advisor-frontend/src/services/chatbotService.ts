import api from './api';

interface ChatMessage {
  message: string;
  sessionId: string;
}

interface ChatResponse {
  success: boolean;
  data: {
    userMessage: any;
    botMessage: {
      message: string;
      timestamp: string;
      _id: string;
    };
  };
}

const sendMessage = async (messageData: ChatMessage): Promise<ChatResponse> => {
  const response = await api.post('/chatbot/message', messageData);
  return response.data;
};

const getChatHistory = async (sessionId: string) => {
  const response = await api.get(`/chatbot/history/${sessionId}`);
  return response.data;
};

const getChatSessions = async () => {
  const response = await api.get('/chatbot/sessions');
  return response.data;
};

const clearChatHistory = async (sessionId: string) => {
  const response = await api.delete(`/chatbot/history/${sessionId}`);
  return response.data;
};

const chatbotService = {
  sendMessage,
  getChatHistory,
  getChatSessions,
  clearChatHistory,
};

export default chatbotService;
