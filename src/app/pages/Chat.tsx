import { useNavigate } from "react-router";
import { Search, CheckCheck, MessageSquareOff } from "lucide-react";
import { conversations } from "../data/chatData";

export default function Chat() {
  const navigate = useNavigate();

  return (
    <div className="animate-fadeIn">
      
      {/* Sarlavha qismi (Sticky olib tashlandi, chunki Root header bor) */}
      <div className="mb-6 px-2">
        <h1 className="text-2xl font-black text-[#2d3429] tracking-tight">Xabarlar</h1>
        <p className="text-[#6b7a62] text-xs font-bold mt-1 uppercase tracking-wider">
          Sizning yozishmalaringiz
        </p>
      </div>

      <div className="space-y-6">
        {/* Qidiruv qutisi */}
        <div className="relative shadow-sm rounded-[1.8rem] overflow-hidden border border-black/[0.02]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3b19b]" />
          <input 
            type="text" 
            placeholder="Kishilar yoki xabarlarni qidirish..." 
            className="w-full h-[3.5rem] bg-white pl-14 pr-6 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#e2f0d9] text-[#2d3429] placeholder:text-[#a3b19b]"
          />
        </div>

        {/* Chatlar Ro'yxati */}
        <div className="space-y-3">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
              <MessageSquareOff className="w-12 h-12 text-[#a3b19b] mb-3" />
              <p className="text-sm font-bold text-[#6b7a62]">Hozircha xabarlar yo'q</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <div 
                key={conv.id} 
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(15);
                  navigate(`/chat/${conv.id}`);
                }}
                className="bg-white p-4 rounded-[1.8rem] flex items-center gap-4 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer border border-black/[0.02] hover:shadow-md"
              >
                {/* Avatar qismi */}
                <div className="relative shrink-0">
                  <img 
                    src={conv.farmerAvatar} 
                    alt={conv.farmerName} 
                    className="w-[3.5rem] h-[3.5rem] rounded-full object-cover border border-black/[0.03]" 
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                </div>
                
                {/* Ma'lumot qismi */}
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-[#2d3429] truncate text-base leading-none">
                      {conv.farmerName}
                    </h3>
                    <span className="text-[10px] font-bold text-[#a3b19b] shrink-0 ml-2">
                      {new Date(conv.lastMessageTime).toLocaleTimeString('uz-UZ', {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className={`text-xs truncate pr-3 ${conv.unreadCount > 0 ? 'text-[#2d3429] font-black' : 'text-[#6b7a62] font-semibold'}`}>
                      {conv.lastMessage}
                    </p>
                    
                    {/* O'qilmagan xabarlar nishoni */}
                    {conv.unreadCount > 0 ? (
                      <span className="min-w-[20px] h-5 px-1.5 bg-[#4a6d3a] text-white text-[10px] font-black flex items-center justify-center rounded-full shadow-sm shrink-0">
                        {conv.unreadCount}
                      </span>
                    ) : (
                      <CheckCheck className="w-4 h-4 text-[#a3b19b] shrink-0" strokeWidth={2.5} />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
