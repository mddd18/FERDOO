import { useNavigate } from "react-router";
import { ArrowLeft, Bell, Package, CheckCircle2, MessageSquare } from "lucide-react";
import { notifications } from "../data/chatData";

export default function Notifications() {
  const navigate = useNavigate();

  // Ikonka turini tanlash
  const getIcon = (type: string) => {
    switch(type) {
      case 'order_status': return <Package className="w-5 h-5 text-blue-500" />;
      case 'system': return <Bell className="w-5 h-5 text-yellow-500" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-[#4a6d3a]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f4ee] pb-20 animate-fadeIn">
      
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-black/[0.05] px-4 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 bg-[#f8f9f5] rounded-full active:scale-95 transition-transform text-[#2d3429]"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-[#2d3429]">Bildirishnomalar</h1>
      </header>

      {/* Kontent */}
      <div className="p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#6b7a62]">
            <Bell className="w-16 h-16 text-[#dce7d3] mb-4" />
            <p className="font-medium">Hozircha xabarlar yo'q</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-[1.5rem] flex gap-4 transition-all ${
                notification.isRead ? 'bg-white shadow-sm' : 'bg-[#e2f0d9]/50 border border-[#4a6d3a]/20 shadow-sm'
              }`}
            >
              <div className="mt-1">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {getIcon(notification.type)}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-sm ${notification.isRead ? 'font-semibold text-[#2d3429]' : 'font-bold text-[#4a6d3a]'}`}>
                    {notification.title}
                  </h4>
                  {!notification.isRead && (
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5" />
                  )}
                </div>
                <p className="text-xs text-[#6b7a62] leading-relaxed mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-[#a3b19b]">
                  <CheckCircle2 className="w-3 h-3" />
                  {new Date(notification.timestamp).toLocaleString('uz-UZ', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
