import { create } from 'zustand';
import api from '../lib/axios';

export const useChatStore = create((set, get) => ({
  chats: [],
  currentChat: null,
  studyMode: 'normal', // normal, teacher, exam
  isLoading: false,

  setStudyMode: (mode) => set({ studyMode: mode }),

  fetchHistory: async () => {
    try {
      const res = await api.get('/chat/history');
      set({ chats: res.data });
    } catch (err) {
      console.error(err);
    }
  },

  selectChat: async (id) => {
    if (!id) {
      set({ currentChat: null });
      return;
    }
    try {
      const res = await api.get(`/chat/${id}`);
      set({ currentChat: res.data });
    } catch (err) {
      console.error(err);
    }
  },

  sendMessage: async (message) => {
    const { currentChat, studyMode } = get();
    const chatId = currentChat ? currentChat._id : null;
    
    // Optimistic UI update
    const optimisticMsg = { role: 'user', content: message, _id: Date.now() };
    if (currentChat) {
      set({ currentChat: { ...currentChat, messages: [...currentChat.messages, optimisticMsg] } });
    } else {
      set({ currentChat: { messages: [optimisticMsg] } });
    }
    set({ isLoading: true });

    try {
      const res = await api.post('/chat/message', {
        chatId,
        message,
        mode: studyMode
      });
      set({ currentChat: res.data });
      get().fetchHistory(); // refresh history to get updated title
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  uploadPdf: async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);
    set({ isLoading: true });
    try {
      const res = await api.post('/chat/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      set({ currentChat: res.data });
      get().fetchHistory();
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  }
}));


