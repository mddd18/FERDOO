import { useNavigate } from "react-router";
import { Search, CheckCheck } from "lucide-react";
import { conversations } from "../data/chatData";

export default function Chat() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f1f4ee] animate-fadeIn">
      
      {/* Tepa qism (Header) */}
      <header className="sticky top-0 z-20 bg-[#f1f4ee]/90 backdrop-blur-xl px-6 py-5">
        <h1 className="text-2xl font-black text-[#2d3429] tracking-tight">Xabarlar</h1>
      </header>

      <div className="px-4 space-y-5 pb-32">
        {/* Qidiruv */}
        <div className="relative shadow-sm rounded-full overflow-hidden">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7a62]" />
          <input 
            type="text" 
            placeholder="Kishilar yoki xabarlarni qidirish..." 
            className="w-full h-14 bg-white pl-14 pr-6 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#e2f0d9]"
          />
        </div>

        {/* Chatlar Ro'yxati */}
        <div className="space-y-3">
          {conversations.map((conv) => (
            <div 
              key={conv.id} 
              onClick={() => navigate(`/chat/${conv.id}`)}
              className="bg-white p-4 rounded-[1.8rem] flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.03)] active:scale-95 transition-transform cursor-pointer border border-black/[0.02]"
            >
              <div className="relative shrink-0">
                <img src={conv.farmerAvatar} alt={conv.farmerName} className="w-14 h-14 rounded-full object-cover border-2 border-[#f1f4ee]" />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-[#2d3429] truncate text-base">{conv.farmerName}</h3>
                  <span className="text-[10px] font-bold text-[#a3b19b]">
                    {new Date(conv.lastMessageTime).toLocaleTimeString('uz-UZ', {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-sm truncate pr-2 ${conv.unreadCount > 0 ? 'text-[#2d3429] font-bold' : 'text-[#6b7a62] font-medium'}`}>
                    {conv.lastMessage}
                  </p>
                  {conv.unreadCount > 0 ? (
                    <span className="w-5 h-5 bg-[#4a6d3a] text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm shrink-0">
                      {conv.unreadCount}
                    </span>
                  ) : (
                    <CheckCheck className="w-4 h-4 text-[#a3b19b] shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
