import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Send, Paperclip, Mic, Copy, BookOpen, GraduationCap, FileText, Sparkles, MessageSquare, Clock, Zap } from 'lucide-react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ActionCard = ({ icon: Icon, title, onClick }) => (
  <button onClick={onClick} className="glass-panel p-5 rounded-2xl flex items-center gap-4 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)] transition-all duration-300 group text-left border border-white/5">
    <div className="p-3 bg-primary/20 rounded-xl text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
      <Icon size={24} />
    </div>
    <span className="font-semibold text-textMain group-hover:text-white transition-colors">{title}</span>
  </button>
);

export default function ChatArea() {
  const { currentChat, sendMessage, uploadPdf, isLoading, studyMode, setStudyMode } = useChatStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, isLoading]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      uploadPdf(file);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Voice Input (Web Speech API)
  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice input not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + ' ' + transcript);
    };
    recognition.start();
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-background relative">
      {/* Header / Study Mode Selector */}
      <div className="absolute top-0 w-full h-16 border-b border-white/5 glass z-10 flex items-center justify-between px-6 shadow-sm">
        <div className="flex-1 hidden md:block"></div>
        <div className="flex items-center gap-1 bg-surface/50 p-1 rounded-2xl border border-white/5 shadow-inner">
          <button
            onClick={() => setStudyMode('normal')}
            className={clsx("flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300", studyMode === 'normal' ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20" : "text-textMuted hover:text-textMain")}
          >
            <BookOpen size={16} /> Normal
          </button>
          <button
            onClick={() => setStudyMode('teacher')}
            className={clsx("flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300", studyMode === 'teacher' ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20" : "text-textMuted hover:text-textMain")}
          >
            <GraduationCap size={16} /> Teacher
          </button>
          <button
            onClick={() => setStudyMode('exam')}
            className={clsx("flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300", studyMode === 'exam' ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20" : "text-textMuted hover:text-textMain")}
          >
            <FileText size={16} /> Exam
          </button>
        </div>
        <div className="flex-1 flex justify-end">
          {/* Placeholder for Theme/Profile dropdown */}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pt-24 pb-32 px-4 md:px-12 lg:px-24 xl:px-48 space-y-6 scroll-smooth">
        {!currentChat?.messages?.length ? (
          <div className="h-full flex flex-col items-center justify-center text-textMain animate-fade-in max-w-4xl mx-auto w-full pb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.3)] mb-6 transform hover:scale-105 transition-transform duration-500">
              <Sparkles size={40} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Your AI Study Assistant</h2>
            <p className="text-textMuted text-lg md:text-xl mb-12 font-medium">Ask questions, upload notes, and learn smarter.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              <ActionCard icon={Paperclip} title="Upload PDF Notes" onClick={() => fileInputRef.current.click()} />
              <ActionCard icon={MessageSquare} title="Ask a Question" onClick={() => {}} />
              <ActionCard icon={Zap} title="Generate Important Questions" onClick={() => sendMessage("Generate some important exam questions based on my course.")} />
              <ActionCard icon={Clock} title="5-Min Quick Revision" onClick={() => sendMessage("Give me a 5-minute quick revision on key computer science concepts.")} />
            </div>
          </div>
        ) : (
          currentChat.messages.map((msg, idx) => (
            <div key={idx} className={clsx("flex gap-4 animate-slide-up", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg text-white font-bold text-sm", msg.role === 'user' ? "bg-gradient-to-br from-primary to-secondary" : "bg-gradient-to-br from-purple-600 to-indigo-600")}>
                {msg.role === 'user' ? 'U' : <Sparkles size={18} />}
              </div>
              <div className="flex flex-col group max-w-[80%] min-w-0">
                <div className={clsx("p-5 rounded-3xl overflow-hidden shadow-sm", msg.role === 'user' ? "bg-gradient-to-br from-primary to-secondary text-white rounded-tr-sm shadow-primary/20" : "glass-panel text-textMain rounded-tl-sm leading-relaxed prose prose-invert max-w-none")}>
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
                <div className={clsx("flex items-center gap-2 mt-2", msg.role === 'user' ? "self-end" : "self-start")}>
                  <span className="text-[10px] text-textMuted uppercase tracking-wider">{msg.role === 'user' ? 'You' : 'Studiqo'}</span>
                  {msg.role === 'assistant' && (
                    <button onClick={() => copyToClipboard(msg.content)} className="text-textMuted hover:text-primary opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 text-xs bg-surface/50 px-2 py-1 rounded-md">
                      <Copy size={12} /> Copy
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-4 animate-slide-up">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg text-white">
              <Sparkles size={18} />
            </div>
            <div className="p-5 rounded-3xl glass-panel border border-white/5 rounded-tl-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-textMuted rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-textMuted rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-textMuted rounded-full typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-background via-background/90 to-transparent pb-8 pt-12 px-4 md:px-12 lg:px-24 xl:px-48 z-10 pointer-events-none">
        <form onSubmit={handleSend} className="relative flex items-center max-w-4xl mx-auto glass-panel rounded-full p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] focus-within:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all duration-300 pointer-events-auto border border-white/10">
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button type="button" onClick={() => fileInputRef.current.click()} className="p-3 text-textMuted hover:text-primary hover:bg-primary/10 rounded-full transition-colors ml-1" title="Upload PDF">
            <Paperclip size={20} />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? "Studiqo is thinking..." : "Ask anything about BTech CSE subjects..."}
            disabled={isLoading}
            className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-textMain placeholder-textMuted text-base font-medium"
          />

          <button type="button" onClick={startVoiceInput} className="p-3 text-textMuted hover:text-primary hover:bg-primary/10 rounded-full transition-colors mr-1" title="Voice Input">
            <Mic size={20} />
          </button>
          
          <button type="submit" disabled={!input.trim() || isLoading} className="p-3 mr-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:from-surface disabled:to-surface disabled:text-textMuted text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/50 disabled:shadow-none active:scale-95">
            <Send size={20} className={clsx(input.trim() && !isLoading && "translate-x-0.5")} />
          </button>
        </form>
        <div className="text-center mt-4 text-xs text-textMuted font-medium pointer-events-auto">
          AI can make mistakes. Consider verifying important information.
        </div>
      </div>
    </div>
  );
}
