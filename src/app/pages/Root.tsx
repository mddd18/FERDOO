import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, ShoppingBag, MessageCircle, Bell, Sparkles } from "lucide-react";
import { notifications, conversations } from "../data/chatData";
import { useEffect } from "react";
import { Toaster } from "sonner";

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
    { path: "/ai-agent", icon: Sparkles, label: "AI Zaxira" },
    { path: "/chat", icon: MessageCircle, label: "Chat", badge: unreadMessages },
    { path: "/orders", icon: ShoppingBag, label: "Xaridlar" },
  ];

  const handleNavClick = (path: string) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30); 
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#f8f9f5] flex flex-col pt-[env(safe-area-inset-top)]">
      
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#2d3429', color: 'white', border: 'none',
            borderRadius: '20px', padding: '16px 20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: 'bold'
          }
        }} 
      />
      
      {/* Header: z-50 */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-[#f8f9f5]/80 backdrop-blur-2xl border-b border-black/[0.02]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
             <img 
               src="/logo.png" 
               alt="Ferdo Logo" 
               className="w-10 h-10 object-contain drop-shadow-sm"
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.nextElementSibling?.classList.remove('hidden');
               }}
             />
             <div className="hidden w-10 h-10 bg-[#e2f0d9] rounded-[1.2rem] flex items-center justify-center">
               <span className="text-[#4a6d3a] font-black text-xl leading-none mt-0.5">F</span>
             </div>
             <h1 className="text-xl font-black text-[#2d3429] tracking-tight">FERDO</h1>
          </div>
          <button 
            onClick={() => handleNavClick('/notifications')} 
            className="relative p-2.5 text-[#2d3429] bg-white rounded-full shadow-sm active:scale-90 transition-transform"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
            )}
          </button>
        </div>
      </header>

      {/* MAIN: pt-24 tepadan joy, pb-32 pastdan joy tashlaydi */}
      <main 
        key={location.pathname} 
        className="flex-1 px-4 pt-24 pb-32 animate-slideInRight will-change-transform overflow-x-hidden"
      >
        <Outlet />
      </main>

      {/* Bottom Nav: z-50 */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-2xl rounded-t-[2.5rem] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom,20px)] border-t border-black/[0.02]">
        <div className="flex justify-around items-center px-4 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button 
                key={item.path} 
                onClick={() => handleNavClick(item.path)} 
                className="relative flex flex-col items-center justify-center w-20 h-14 group active:scale-90 transition-transform duration-200"
              >
                <div className={`absolute inset-0 rounded-[1.2rem] transition-all duration-300 ${isActive ? 'bg-[#e2f0d9] scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className="relative">
                    <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-[#4a6d3a]' : 'text-[#a3b19b] group-hover:text-[#6b7a62]'}`} strokeWidth={isActive ? 2.5 : 2} />
                    {item.badge && item.badge > 0 && <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-sm border-[1.5px] border-[#e2f0d9]">{item.badge}</span>}
                  </div>
                  <span className={`text-[10px] font-bold transition-all duration-300 ${isActive ? 'text-[#4a6d3a] h-auto opacity-100 mt-0.5' : 'h-0 opacity-0 overflow-hidden'}`}>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
      
    </div>
  );
}
