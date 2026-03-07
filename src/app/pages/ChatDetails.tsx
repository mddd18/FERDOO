import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { conversations, ChatMessage } from "../data/chatData";
import { ArrowLeft, Send, Phone, MoreVertical, CheckCheck, Check } from "lucide-react";

export default function ChatDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find((c) => c.id === id);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [id, conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || !conversation) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      message: newMessage,
      senderId: "buyer",
      senderName: "Siz",
      timestamp: new Date().toISOString(),
      isRead: false, // Yangi yuborilgan xabar hali o'qilmagan
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    // Realistik effekt: Fermer "yozmoqda..." holati simulyatsiyasi
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: "Yaxshi, tushunarlu. Ertaga ertalab soat 9 larda yetkazib beramiz.",
        senderId: conversation.farmerId,
        senderName: conversation.farmerName,
        timestamp: new Date().toISOString(),
        isRead: true,
      };
      setMessages((prev) => [...prev, replyMsg]);
      
      if (navigator.vibrate) navigator.vibrate(10); // Xabar kelganda qisqa titrash
    }, 2000);
  };

  if (!conversation) return <div className="p-4">Chat topilmadi</div>;

  return (
    <div className="fixed inset-0 z-[100] bg-[#f1f4ee] flex flex-col animate-fadeIn">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl px-3 py-3 flex items-center gap-3 border-b border-black/[0.03] shrink-0 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2.5 bg-[#f8f9f5] rounded-full active:scale-95 transition-transform text-[#2d3429]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 flex items-center gap-3">
          <div className="relative">
            <img src={conversation.farmerAvatar} alt="" className="w-11 h-11 rounded-full object-cover border border-gray-100" />
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <h2 className="font-bold text-[#2d3429] leading-tight text-sm">{conversation.farmerName}</h2>
            <p className="text-[10px] font-bold text-[#4a6d3a]">Onlayn</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-[#4a6d3a] active:bg-gray-100 rounded-full"><Phone className="w-5 h-5" /></button>
          <button className="p-2 text-[#6b7a62] active:bg-gray-100 rounded-full"><MoreVertical className="w-5 h-5" /></button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === "buyer";
          return (
            <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-3 shadow-sm relative ${
                isMe 
                  ? 'bg-[#4a6d3a] text-white rounded-2xl rounded-tr-none' 
                  : 'bg-white text-[#2d3429] rounded-2xl rounded-tl-none border border-black/[0.03]'
              }`}>
                <p className="text-[13px] font-medium leading-relaxed mb-1">{msg.message}</p>
                <div className={`flex items-center justify-end gap-1 ${isMe ? 'text-white/60' : 'text-[#a3b19b]'}`}>
                  <span className="text-[9px] font-bold">
                    {new Date(msg.timestamp).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {isMe && (
                    msg.isRead ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white/95 backdrop-blur-xl border-t border-black/[0.03] pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center gap-2 bg-[#f8f9f5] p-1.5 rounded-full border border-black/[0.02]">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Xabar yozing..."
            className="flex-1 bg-transparent px-4 py-2.5 font-semibold text-xs focus:outline-none text-[#2d3429] placeholder:text-[#a3b19b]"
          />
          <button 
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="w-10 h-10 bg-[#4a6d3a] rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:bg-[#a3b19b] active:scale-95 transition-transform shrink-0"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
