
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Info } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

const Assistant: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: 'Greetings! I am Zenith AI, your ultra-intelligent browsing partner. How can I optimize your workflow today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction: 'You are Zenith AI, a premium and high-tech browser extension assistant created by khdxsohee. Your tone is professional, intelligent, and slightly futuristic. You excel at web summaries, coding help, and productivity advice. Speak Roman Urdu or Hindi when prompted by the user.',
        },
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        text: response.text || "I'm sorry, I couldn't process that command.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "Error: Zenith Neural Link failed. Check your API configuration.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-16rem)] max-w-4xl mx-auto rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-2xl overflow-hidden`}>
      <div className={`p-4 border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold">Zenith AI</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Active</span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500">
          <Info className="w-5 h-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' 
                ? 'bg-indigo-600 text-white' 
                : isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-600'
            }`}>
              {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
              msg.role === 'assistant' 
                ? isDarkMode ? 'bg-slate-800/50 text-slate-100' : 'bg-slate-100 text-slate-900'
                : 'bg-indigo-600 text-white'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className={`rounded-2xl px-4 py-3 ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100'} flex items-center gap-2`}>
              <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
              <span className="text-sm text-slate-500">Zenith is processing...</span>
            </div>
          </div>
        )}
      </div>

      <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
          isDarkMode ? 'bg-slate-950 border-slate-800 focus-within:border-indigo-500/50' : 'bg-slate-50 border-slate-200 focus-within:border-indigo-500'
        }`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Kiye gae sawal ka jawab..."
            className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-lg transition-colors ${
              input.trim() && !isLoading ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-500 mt-3 uppercase font-bold tracking-widest">
          Zenith AI Platform by khdxsohee
        </p>
      </div>
    </div>
  );
};

export default Assistant;
