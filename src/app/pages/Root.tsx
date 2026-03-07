import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, ShoppingBag, MessageCircle, Bell } from "lucide-react";
import { notifications, conversations } from "../data/chatData";
import { useEffect } from "react";
import { Toaster } from "sonner"; // Sonner - zamonaviy Toasts

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/auth");
  }, [navigate]);

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMessages = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const navItems = [
    { path: "/", icon: Home, label: "Asosiy" },
    { path: "/chat", icon: MessageCircle, label: "Chat", badge: unreadMessages },
    { path: "/orders", icon: ShoppingBag, label: "Xaridlar" },
  ];

  // Haptic Feedback (Titrash) funksiyasi
  const handleNavClick = (path: string) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(40); // 40 millisoniya mayin titrash
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Zamonaviy Toaster Sozlamalari */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#4a6d3a',
            color: 'white',
            border: 'none',
            borderRadius: '100px',
            padding: '16px 20px',
            boxShadow: '0 10px 40px rgba(74,109,58,0.4)',
            fontWeight: 'bold'
          }
        }} 
      />
      
      {/* Tepa menyu (Header) */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-[#f1f4ee]/80 backdrop-blur-xl border-b border-[#2d3429]/5">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 bg-[#4a6d3a] rounded-xl flex items-center justify-center shadow-md">
               <span className="text-white font-black text-lg leading-none mt-0.5">F</span>
             </div>
             <h1 className="text-2xl font-black text-[#2d3429] tracking-tight">FERDO</h1>
          </div>
          <button 
            onClick={() => handleNavClick('/notifications')} 
            className="relative p-2.5 text-[#4a6d3a] bg-white rounded-full shadow-sm border border-white active:scale-90 transition-transform"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
            )}
          </button>
        </div>
      </header>

      {/* Asosiy kontent */}
      <main className="px-4 pt-24 h-full">
        <Outlet />
      </main>

      {/* Pastki menyu */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-2xl border-t border-[#2d3429]/5 rounded-t-[2rem] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
        <div className="flex justify-around items-end px-2 pt-3 pb-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button 
                key={item.path} 
                onClick={() => handleNavClick(item.path)} 
                className="relative flex flex-col items-center justify-center w-20 gap-1.5 group active:scale-95 transition-transform"
              >
                <div className={`absolute -top-3 w-8 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-[#4a6d3a]' : 'bg-transparent'}`} />
                <div className="relative">
                  <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'text-[#4a6d3a] drop-shadow-sm scale-110' : 'text-[#a3b19b] group-hover:text-[#6b7a62]'}`} strokeWidth={isActive ? 2.5 : 2} />
                  {item.badge && item.badge > 0 && <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-sm border-[1.5px] border-white">{item.badge}</span>}
                </div>
                <span className={`text-[11px] font-bold transition-all duration-300 ${isActive ? 'text-[#4a6d3a]' : 'text-[#a3b19b]'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      
    </div>
  );
}
