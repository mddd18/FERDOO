import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { farmers, products, reviews } from "../data/mockData";
import { ArrowLeft, Star, MapPin, Calendar, TrendingUp, MessageCircle, Send } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

export default function FarmerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  const farmer = farmers.find((f) => f.id === id);
  const farmerProducts = products.filter((p) => p.farmerId === id);
  const farmerReviews = reviews.filter((r) =>
    farmerProducts.some((p) => p.id === r.productId)
  );

  if (!farmer) {
    return (
      <div className="p-4">
        <p>Fermer topilmadi</p>
      </div>
    );
  }

  const memberSinceDate = new Date(farmer.memberSince);
  const memberDuration = Math.floor(
    (new Date().getTime() - memberSinceDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      alert(`Xabar yuborildi: ${message}`);
      setMessage("");
      setMessageDialogOpen(false);
    }
  };

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-3 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold">Fermer profili</h2>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-b from-green-50 to-white p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg">
            <ImageWithFallback
              src={farmer.avatar}
              alt={farmer.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{farmer.name}</h1>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-semibold">{farmer.rating}</span>
              <span className="text-sm text-gray-500">({farmer.totalReviews} baho)</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{farmer.location}</span>
            </div>
          </div>
        </div>

        {/* Message Button */}
        <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Xabar yuborish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Fermerga xabar yuborish</DialogTitle>
              <DialogDescription>
                {farmer.name} ga xabar yuboring
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Textarea
                placeholder="Xabaringizni kiriting..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="resize-none"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Yuborish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{farmer.totalSales}</p>
          <p className="text-xs text-gray-500">Jami sotildi</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{memberDuration}</p>
          <p className="text-xs text-gray-500">Oydan beri a'zo</p>
        </div>
      </div>

      {/* About */}
      <div className="p-4">
        <h3 className="font-semibold mb-2">Haqida</h3>
        <p className="text-sm text-gray-600 mb-3">{farmer.bio}</p>
        
        <h4 className="text-sm font-medium text-gray-700 mb-2">Mutaxassislik:</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {farmer.specialization.map((spec, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>
            A'zo bo'lgan sana: {memberSinceDate.toLocaleDateString('uz-UZ')}
          </span>
        </div>
      </div>

      {/* Farmer's Products */}
      <div className="p-4">
        <h3 className="font-semibold mb-4">
          Fermer mahsulotlari ({farmerProducts.length})
        </h3>
        <div className="space-y-4">
          {farmerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="p-4">
        <h3 className="font-semibold mb-4">So'nggi izohlar</h3>
        {farmerReviews.length > 0 ? (
          <div className="space-y-3">
            {farmerReviews.slice(0, 5).map((review) => {
              const product = products.find((p) => p.id === review.productId);
              return (
                <div key={review.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{review.buyerName}</p>
                      <p className="text-xs text-gray-500">{product?.name}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString('uz-UZ')}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            Hali izoh yo'q
          </p>
        )}
      </div>
    </div>
  );
}
