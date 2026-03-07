import { useNavigate } from "react-router";
import { conversations } from "../data/chatData";
import { MessageCircle, Search } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Input } from "../components/ui/input";
import { useState } from "react";

export default function Chat() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Kecha';
    } else if (days < 7) {
      return `${days} kun oldin`;
    } else {
      return date.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Xabarlar</h2>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Fermer qidirish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Conversations List */}
      {filteredConversations.length > 0 ? (
        <div className="space-y-2">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => navigate(`/chat/${conv.farmerId}`)}
              className={`bg-white border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
                conv.unreadCount > 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <ImageWithFallback
                      src={conv.farmerAvatar}
                      alt={conv.farmerName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conv.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">
                        {conv.unreadCount}
                      </span>
                    </div>
                  )}
                </div>

                {/* Message Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`font-semibold ${conv.unreadCount > 0 ? 'text-gray-900' : 'text-gray-800'}`}>
                      {conv.farmerName}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {formatTime(conv.lastMessageTime)}
                    </span>
                  </div>
                  <p
                    className={`text-sm truncate ${
                      conv.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">
            {searchQuery ? 'Natija topilmadi' : 'Hali xabarlar yo\'q'}
          </p>
          <p className="text-sm text-gray-400">
            Fermerlar bilan muloqot boshlash uchun ularning profiliga o'ting
          </p>
        </div>
      )}
    </div>
  );
}
