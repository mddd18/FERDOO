import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { conversations, generateReply } from "../data/chatData";
import { ArrowLeft, Send, Phone, MoreVertical } from "lucide-react";

export default function ChatDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find((c) => c.id === id);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || !conversation) return;

    const newMsg = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Sun'iy intellekt / bot javobi simulyatsiyasi
    setTimeout(() => {
      const reply = generateReply(conversation.farmerName);
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  if (!conversation) return <div className="p-4">Chat topilmadi</div>;

  return (
    // z-[100] pastki menyuni yopib, ekranni to'liq egallash uchun
    <div className="fixed inset-0 z-[100] bg-[#f1f4ee] flex flex-col animate-fadeIn">
      
      {/* Tepa qism (Header) */}
      <header className="bg-white/95 backdrop-blur-xl px-3 py-3 flex items-center gap-3 border-b border-black/[0.03] shrink-0 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2.5 bg-[#f8f9f5] rounded-full active:scale-95 transition-transform text-[#2d3429]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 flex items-center gap-3 cursor-pointer">
          <div className="relative">
            <img src={conversation.farmerAvatar} alt="" className="w-11 h-11 rounded-full object-cover border border-gray-100" />
            {conversation.isOnline && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
          </div>
          <div>
            <h2 className="font-bold text-[#2d3429] leading-tight">{conversation.farmerName}</h2>
            <p className="text-[11px] font-bold text-[#4a6d3a]">
              {conversation.isOnline ? 'Onlayn' : 'Yaqinda kirdi'}
            </p>
          </div>
        </div>
        <button className="p-2 text-[#4a6d3a] hover:bg-gray-100 rounded-full"><Phone className="w-5 h-5" /></button>
        <button className="p-2 text-[#6b7a62] hover:bg-gray-100 rounded-full"><MoreVertical className="w-5 h-5" /></button>
      </header>

      {/* Xabarlar maydoni */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isMe = msg.sender === "me";
          return (
            <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-5 py-3.5 shadow-sm ${
                isMe 
                  ? 'bg-[#4a6d3a] text-white rounded-t-[1.5rem] rounded-bl-[1.5rem] rounded-br-[0.4rem]' 
                  : 'bg-white text-[#2d3429] rounded-t-[1.5rem] rounded-br-[1.5rem] rounded-bl-[0.4rem] border border-black/[0.03]'
              }`}>
                <p className="text-[14px] font-medium leading-relaxed">{msg.text}</p>
                <span className={`text-[10px] font-bold mt-1.5 block text-right ${isMe ? 'text-white/70' : 'text-[#a3b19b]'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Xabar yozish maydoni */}
      <div className="p-3 bg-white/95 backdrop-blur-xl border-t border-black/[0.03] shrink-0 pb-6">
        <div className="flex items-center gap-2 bg-[#f8f9f5] p-1.5 rounded-full shadow-inner border border-black/[0.02]">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Xabar yozing..."
            className="flex-1 bg-transparent px-5 py-3 font-semibold text-sm focus:outline-none text-[#2d3429] placeholder:text-[#a3b19b]"
          />
          <button 
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="w-12 h-12 bg-[#4a6d3a] rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:bg-[#a3b19b] active:scale-95 transition-transform shrink-0 shadow-md"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
      
    </div>
  );
}
