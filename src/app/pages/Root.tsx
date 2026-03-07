import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, ShoppingBag, MessageCircle, Bell } from "lucide-react";
import { notifications } from "../data/chatData";
import { conversations } from "../data/chatData";
import { useEffect } from "react";

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [navigate]);

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMessages = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const navItems = [
    { path: "/", icon: Home, label: "Bosh sahifa" },
    { path: "/chat", icon: MessageCircle, label: "Xabarlar", badge: unreadMessages },
    { path: "/orders", icon: ShoppingBag, label: "Buyurtmalar" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">FERDO</h1>
            <p className="text-sm text-green-100">Fermerdan to'g'ridan-to'g'ri</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 hover:bg-green-500 rounded-full transition-colors"
            >
              <Bell className="w-6 h-6" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {unreadNotifications}
                </span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
            >
              Chiqish
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-md mx-auto flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                           (item.path === '/chat' && location.pathname.startsWith('/chat'));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center gap-1 py-3 px-6 transition-all ${
                  isActive ? "text-green-600" : "text-gray-500"
                }`}
              >
                <div className="relative">
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-green-600 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}