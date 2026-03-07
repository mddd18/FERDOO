import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { conversations } from "../data/chatData";
import { ArrowLeft, Send, User } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function ChatDetails() {
  const { farmerId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find((c) => c.farmerId === farmerId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="p-4">
        <p>Suhbat topilmadi</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      alert(`Xabar yuborildi: ${newMessage}`);
      setNewMessage("");
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-3 z-10 shadow-sm">
        <button onClick={() => navigate('/chat')} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div
          onClick={() => navigate(`/farmer/${farmerId}`)}
          className="flex items-center gap-3 flex-1 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <ImageWithFallback
              src={conversation.farmerAvatar}
              alt={conversation.farmerName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold">{conversation.farmerName}</h2>
            <p className="text-xs text-green-600">Onlayn</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/farmer/${farmerId}`)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {conversation.messages.map((message) => {
          const isCurrentUser = message.senderId === 'buyer';
          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  isCurrentUser
                    ? 'bg-green-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                }`}
              >
                <p className="text-sm break-words">{message.message}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span
                    className={`text-xs ${
                      isCurrentUser ? 'text-green-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </span>
                  {isCurrentUser && message.isRead && (
                    <span className="text-xs text-green-100">✓✓</span>
                  )}
                  {isCurrentUser && !message.isRead && (
                    <span className="text-xs text-green-200">✓</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Xabar yozing..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-green-600 hover:bg-green-700 text-white px-4"
            size="icon"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
