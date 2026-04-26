import React from 'react';
import { useAuthStore } from './store/useAuthStore';
import AuthModal from './components/AuthModal';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

function App() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-textMain flex flex-col items-center justify-center">
        {/* Landing Page Preview Background */}
        <div className="absolute inset-0 z-0 bg-[#0F172A] overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] bg-secondary/20 rounded-full blur-[100px] animate-blob" style={{animationDelay: '5s', animationDuration: '20s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-purple-900/10 rounded-full blur-[150px] animate-blob" style={{animationDelay: '10s', animationDuration: '25s'}}></div>
        </div>
        
        <div className="z-10 text-center max-w-2xl px-4 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Introducing Studiqo 2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">
            Master your studies with <br className="hidden md:block" /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Studiqo</span>
          </h1>
          <p className="text-lg md:text-xl text-textMuted mb-12 font-medium max-w-xl mx-auto">
            Your personal, intelligent AI study companion. Upload notes, generate questions, and learn smarter, not harder.
          </p>
        </div>

        <AuthModal />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <ChatArea />
    </div>
  );
}

export default App;
