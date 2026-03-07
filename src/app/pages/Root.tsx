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
    <div className="min-h-screen bg-background pb-32">
      <header className="bg-transparent p-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="bg-white/80 backdrop-blur-md px-5 py-2 rounded-2xl shadow-sm">
            <h1 className="text-xl font-black text-[#2d5a27]">FERDO</h1>
          </div>
          <button onClick={() => navigate('/notifications')} className="relative p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm">
            <Bell className="w-6 h-6 text-[#2d5a27]" />
            {unreadNotifications > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">{unreadNotifications}</span>}
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4"><Outlet /></main>

      <nav className="fixed bottom-8 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-none max-w-md mx-auto">
        <div className="flex justify-around items-center p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button key={item.path} onClick={() => navigate(item.path)} className={`relative flex flex-col items-center gap-1 p-4 rounded-full transition-all ${isActive ? "bg-[#d0e7d2] text-[#2d5a27]" : "text-gray-400"}`}>
                <div className="relative">
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
                  {item.badge && item.badge > 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">{item.badge}</span>}
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
