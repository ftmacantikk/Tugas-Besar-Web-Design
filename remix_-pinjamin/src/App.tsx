import React, { useState, useRef, useEffect } from 'react';
import { PinjamInProvider, usePinjamIn } from './context/PinjamInContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { RegistrationFlow } from './components/RegistrationFlow';
import { BrowseItems } from './components/BrowseItems';
import { BorrowerDashboard } from './components/BorrowerDashboard';
import { LenderDashboard } from './components/LenderDashboard';
import { ItemDetailPage } from './components/ItemDetailPage';
import { Sparkles, LayoutGrid, MessageSquare, X, Send, Bot, User as UserIcon } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

const AppContent: React.FC = () => {
  const { activeScreen, navigateTo, user, loginDemoUser, logout, askAssistant } = usePinjamIn();
  // Interactive AI Assistant states
  const [showAiChat, setShowAiChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 'welcome', 
      sender: 'bot', 
      text: 'Halo Sobat PinjamIn! 👋 Saya AI PinjamIn, asisten sewa kampus siap sedia membantu Anda. Ada perkakas apa yang sedang Anda cari atau ingin sewakan hari ini?' 
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAiTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;
    
    if (!textToSend) {
      setInputVal('');
    }

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    try {
      const responseText = await askAssistant(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (_) {
      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: 'Waduh, koneksi asisten saya mengalami sedikit gangguan transmisi. Tolong coba kirim di saat sepi kelas ya!'
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#ededed] font-sans grid-mesh">
      {/* Shared Navigation Header */}
      <Header />

      {/* Primary Dynamic Screen Routing */}
      <main className="flex-grow">
        {activeScreen === 'landing' && <LandingPage />}
        {activeScreen === 'register' && <RegistrationFlow />}
        {activeScreen === 'browse' && <BrowseItems />}
        {activeScreen === 'borrower-dashboard' && <BorrowerDashboard />}
        {activeScreen === 'lender-dashboard' && <LenderDashboard />}
        {activeScreen === 'item-detail' && <ItemDetailPage />}
      </main>

      {/* Shared Global Footer */}
      <Footer />

      {/* ================= 🪄 AI CHAT TOGGLE ================= */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-3">
        
        {/* AI Assistant Chat Panel Slide out */}
        {showAiChat && (
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-3xl w-80 sm:w-96 h-[500px] shadow-2xl flex flex-col overflow-hidden text-left bg-mesh mr-1">
            {/* Header */}
            <div className="bg-[#0c0c0c] border-b border-[#1a1a1a] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-yellow-400 text-black rounded-lg">
                  <Bot className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-[#ededed] leading-none flex items-center space-x-1">
                    <span>ASISTEN AI PINJAMIN</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </h3>
                  <p className="text-[9px] text-zinc-450 text-zinc-400 font-medium font-mono">Powered by Gemini 3.5 Flash</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAiChat(false)}
                className="p-1 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3.5 no-scrollbar flex flex-col" ref={scrollRef}>
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex space-x-2 items-start max-w-[85%] ${m.sender === 'user' ? 'self-end flex-row-reverse space-x-reverse' : 'self-start'}`}
                >
                  <div className={`p-1.5 rounded-full shrink-0 ${m.sender === 'user' ? 'bg-zinc-805 bg-zinc-800' : 'bg-yellow-400 text-black'}`}>
                    {m.sender === 'user' ? <UserIcon className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${m.sender === 'user' ? 'bg-zinc-900 border border-[#1a1a1a] text-zinc-100' : 'bg-[#181816] text-[#ededed] border-l-2 border-yellow-400'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isAiTyping && (
                <div className="flex space-x-2 items-start self-start max-w-[80%]">
                  <div className="p-1.5 rounded-full bg-yellow-400 text-black shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 rounded-2xl text-xs bg-zinc-905 bg-zinc-900 text-zinc-400 italic">
                    AI PinjamIn sedang mengetik...
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts helper inside assistant */}
            <div className="p-2 bg-black/40 border-t border-[#1a1a1a] overflow-x-auto whitespace-nowrap space-x-1 px-3 py-2 no-scrollbar">
              <button 
                onClick={() => handleQuickPrompt("Rekomendasikan kamera murah")}
                className="text-[10px] font-bold text-yellow-405 text-yellow-400 bg-yellow-950/30 border border-yellow-901/30 px-2.5 py-1 rounded-full hover:bg-yellow-400 hover:text-black transition-colors shrink-0 cursor-pointer"
              >
                📸 Rekomendasi Kamera
              </button>
              <button 
                onClick={() => handleQuickPrompt("Berapa tarif pas sewa iPad?")}
                className="text-[10px] font-bold text-yellow-405 text-yellow-400 bg-yellow-950/30 border border-yellow-901/30 px-2.5 py-1 rounded-full hover:bg-yellow-400 hover:text-black transition-colors shrink-0 cursor-pointer"
              >
                🏷️ Tarif Pas iPad
              </button>
              <button 
                onClick={() => handleQuickPrompt("Bagaimana aturan denda keterlambatan?")}
                className="text-[10px] font-bold text-yellow-405 text-yellow-400 bg-yellow-950/30 border border-yellow-901/30 px-2.5 py-1 rounded-full hover:bg-yellow-400 hover:text-black transition-colors shrink-0 cursor-pointer"
              >
                🤝 Aturan Keterlambatan
              </button>
            </div>

            {/* Input fields */}
            <div className="p-3 bg-zinc-955 bg-[#0a0a0a] border-t border-[#1a1a1a] flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Tanyakan rekomendasi alat sewa..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                className="flex-grow bg-[#111111] text-xs text-white border border-[#1a1a1a] focus:border-yellow-400 rounded-xl px-3 py-2.5 outline-none font-medium"
              />
              <button 
                onClick={() => handleSendMessage()}
                className="bg-yellow-400 hover:bg-yellow-300 text-black p-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Shared Assistant Sticky Bubble */}
        <button 
          onClick={() => setShowAiChat(!showAiChat)}
          className="bg-yellow-400 text-black p-4 rounded-full shadow-2xl shadow-yellow-501 hover:scale-105 active:scale-95 duration-200 transition-all cursor-pointer animate-pulse"
        >
          {showAiChat ? <X className="w-6 h-6 shrink-0" /> : <MessageSquare className="w-6 h-6 shrink-0" />}
        </button>

      </div>
    </div>
  );
};

export default function App() {
  return (
    <PinjamInProvider>
      <AppContent />
    </PinjamInProvider>
  );
}
