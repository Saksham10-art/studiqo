import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import { PlusCircle, MessageSquare, LogOut, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const { chats, fetchHistory, currentChat, selectChat } = useChatStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="w-64 h-screen glass border-r border-border/50 flex flex-col transition-all z-20 hidden md:flex">
      <div className="p-5 flex items-center gap-3 border-b border-border/30">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20 animate-float">
          <Sparkles size={18} />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-textMuted">Studiqo</h1>
      </div>

      <div className="p-4">
        <button
          onClick={() => selectChat(null)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:-translate-y-0.5"
        >
          <PlusCircle size={20} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {chats.map(chat => (
          <button
            key={chat._id}
            onClick={() => selectChat(chat._id)}
            className={clsx(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-left transition-all truncate group",
              currentChat?._id === chat._id 
                ? "bg-primary/15 text-primary border border-primary/20 shadow-[inset_0_0_12px_rgba(124,58,237,0.1)]" 
                : "text-textMuted hover:bg-surface/60 hover:text-textMain border border-transparent"
            )}
          >
            <MessageSquare size={16} className={clsx("shrink-0", currentChat?._id === chat._id ? "text-primary" : "text-textMuted group-hover:text-textMain")} />
            <span className="truncate font-medium">{chat.title || 'New Chat'}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-border/30 mt-auto">
        {/* User Profile */}
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-surface/40 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-md shadow-primary/20">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 truncate">
            <div className="text-sm font-semibold text-textMain truncate">{user?.name}</div>
            <div className="text-xs text-textMuted truncate">{user?.email}</div>
          </div>
          <button onClick={(e) => {e.stopPropagation(); logout();}} className="p-1.5 text-textMuted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300 hover:rotate-12" title="Log out">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
