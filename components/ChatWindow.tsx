
import React, { useState } from 'react';
import { Send, Image as ImageIcon, Video, Mic, Smile } from 'lucide-react';
import { MOCK_USERS } from '../constants';

const ChatWindow: React.FC = () => {
  const [messages] = useState([
    { id: 'm1', text: "Hey! Just saw your post about Kyoto. I'm there too!", senderId: '2', time: '10:05 AM' },
    { id: 'm2', text: "That's awesome! Let's meet at the Gion district?", senderId: 'me', time: '10:07 AM' },
    { id: 'm3', text: "Perfect! 3 PM works?", senderId: '2', time: '10:08 AM' },
  ]);

  return (
    <div className="fixed bottom-0 right-4 sm:right-8 w-80 sm:w-96 h-[500px] bg-white rounded-t-3xl shadow-2xl border border-slate-100 flex flex-col z-[60] overflow-hidden animate-in slide-in-from-bottom-full duration-500">
      {/* Header */}
      <div className="blue-gradient p-4 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={MOCK_USERS[1].avatar} className="w-10 h-10 rounded-full object-cover border-2 border-white/30" alt="Yuki" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-blue-500 rounded-full" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Yuki Tanaka</h4>
            <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Japan • Active Now</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Video className="w-5 h-5 cursor-pointer hover:opacity-70" />
          <SettingsIcon className="w-5 h-5 cursor-pointer hover:opacity-70" />
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.senderId === 'me' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none'}`}>
              <p>{msg.text}</p>
              <p className={`text-[9px] mt-1 text-right ${msg.senderId === 'me' ? 'text-blue-200' : 'text-slate-400'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t space-y-3">
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-blue-500"><ImageIcon className="w-5 h-5" /></button>
          <button className="text-slate-400 hover:text-blue-500"><Mic className="w-5 h-5" /></button>
          <button className="text-slate-400 hover:text-blue-500"><Smile className="w-5 h-5" /></button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Type your message..."
              className="w-full bg-slate-100 rounded-full py-2 px-4 text-sm outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
          <button className="w-10 h-10 blue-gradient text-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

export default ChatWindow;
