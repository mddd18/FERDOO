import { useNavigate } from "react-router";
import { notifications } from "../data/chatData";
import { Bell, Package, MessageCircle, Star, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Notifications() {
  const navigate = useNavigate();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-5 h-5 text-green-600" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-blue-600" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-600" />;
      case 'new_product':
        return <ShoppingBag className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-white border-gray-200';
    
    switch (type) {
      case 'order':
        return 'bg-green-50 border-green-300';
      case 'message':
        return 'bg-blue-50 border-blue-300';
      case 'review':
        return 'bg-yellow-50 border-yellow-300';
      case 'new_product':
        return 'bg-purple-50 border-purple-300';
      default:
        return 'bg-gray-50 border-gray-300';
    }
  };

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    // Navigate based on notification type
    switch (notification.type) {
      case 'message':
        if (notification.relatedId) {
          const conv = notification.relatedId;
          // Extract farmer ID from conversation ID
          navigate('/chat');
        }
        break;
      case 'order':
        navigate('/orders');
        break;
      case 'new_product':
        if (notification.relatedId) {
          navigate(`/farmer/${notification.relatedId}`);
        }
        break;
      case 'review':
        navigate('/orders');
        break;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} daqiqa oldin`;
    } else if (hours < 24) {
      return `${hours} soat oldin`;
    } else if (days === 1) {
      return 'Kecha';
    } else if (days < 7) {
      return `${days} kun oldin`;
    } else {
      return date.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-semibold text-lg">Bildirishnomalar</h2>
            {unreadCount > 0 && (
              <p className="text-xs text-gray-500">{unreadCount} ta o'qilmagan</p>
            )}
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" className="text-green-600">
            Hammasini o'qilgan qilish
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${getNotificationColor(
                notification.type,
                notification.isRead
              )}`}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`p-2 rounded-full ${
                  notification.isRead ? 'bg-gray-100' : 'bg-white'
                }`}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`font-semibold text-sm ${
                      notification.isRead ? 'text-gray-700' : 'text-gray-900'
                    }`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-green-600 rounded-full ml-2 mt-1.5 flex-shrink-0" />
                    )}
                  </div>
                  <p className={`text-sm mb-2 ${
                    notification.isRead ? 'text-gray-600' : 'text-gray-800'
                  }`}>
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatTime(notification.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Bildirishnomalar yo'q</p>
          </div>
        )}
      </div>
    </div>
  );
}
