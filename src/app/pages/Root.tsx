import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, ShoppingBag, MessageCircle, Bell } from "lucide-react";
import { notifications, conversations } from "../data/chatData";
import { useEffect } from "react";

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
    { path: "/", icon: Home, label: "Bosh sahifa" },
    { path: "/chat", icon: MessageCircle, label: "Xabarlar", badge: unreadMessages },
    { path: "/orders", icon: ShoppingBag, label: "Buyurtmalar" },
  ];

  return (
    <div className="min-h-screen pb-32">
      {/* Tepa menyu (Header) - Mobil ramka ichiga qulflangan */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 z-50 pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="bg-white/80 backdrop-blur-xl px-5 py-2.5 rounded-2xl shadow-sm border border-white/50">
            <h1 className="text-xl font-black text-[#2d5a27] tracking-tight">FERDO</h1>
          </div>
          <button onClick={() => navigate('/notifications')} className="relative p-3 bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-white/50 active:scale-95 transition-transform">
            <Bell className="w-6 h-6 text-[#2d5a27]" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-md">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Asosiy kontent */}
      <main className="px-4 pt-28 h-full">
        <Outlet />
      </main>

      {/* Pastki menyu (Bottom Navigation) - Mobil ramka markaziga qulflangan */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[382px] bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 z-50">
        <div className="flex justify-around items-center p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button 
                key={item.path} 
                onClick={() => navigate(item.path)} 
                className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-300 active:scale-90 ${isActive ? "bg-[#e2f0d9] text-[#4a6d3a]" : "text-[#6b7a62]"}`}
              >
                <div className="relative">
                  <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-sm' : ''}`} />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
