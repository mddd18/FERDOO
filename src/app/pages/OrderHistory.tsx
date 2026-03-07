import { useState } from "react";
import { useNavigate } from "react-router";
import { orders } from "../data/mockData";
import { Package, Calendar, CheckCircle, Clock, XCircle, Star, MessageSquare } from "lucide-react";
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

export default function OrderHistory() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  const handleSubmitReview = () => {
    if (rating > 0) {
      alert(`Baho qo'shildi: ${rating} yulduz\nIzoh: ${comment || 'Izoh yo\'q'}`);
      setRating(0);
      setComment("");
      setReviewDialogOpen(false);
      setSelectedOrder(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Yakunlandi';
      case 'pending':
        return 'Kutilmoqda';
      case 'cancelled':
        return 'Bekor qilindi';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Buyurtmalar tarixi</h2>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3
                    onClick={() => navigate(`/product/${order.productId}`)}
                    className="font-semibold text-gray-900 cursor-pointer hover:text-green-600"
                  >
                    {order.productName}
                  </h3>
                  <p
                    onClick={() => navigate(`/farmer/${order.farmerId}`)}
                    className="text-sm text-gray-600 cursor-pointer hover:text-green-600"
                  >
                    {order.farmerName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                </div>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    {order.quantity} birlik
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    {new Date(order.orderDate).toLocaleDateString('uz-UZ')}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-600">Jami summa:</span>
                <span className="text-lg font-bold text-gray-900">
                  {order.totalPrice.toLocaleString()} so'm
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusText(order.status)}
                </span>

                {/* Review Button */}
                {order.status === 'completed' && !order.hasReview && (
                  <Dialog
                    open={reviewDialogOpen && selectedOrder === order.id}
                    onOpenChange={(open) => {
                      setReviewDialogOpen(open);
                      if (open) setSelectedOrder(order.id);
                      else setSelectedOrder(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <Star className="w-4 h-4 mr-1" />
                        Baholash
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Mahsulotni baholang</DialogTitle>
                        <DialogDescription>
                          {order.productName} - {order.farmerName}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        {/* Star Rating */}
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Bahoyingiz
                          </label>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="focus:outline-none transition-transform hover:scale-110"
                              >
                                <Star
                                  className={`w-8 h-8 ${
                                    star <= rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                          {rating > 0 && (
                            <p className="text-sm text-gray-600 mt-2">
                              Siz {rating} yulduz berdingiz
                            </p>
                          )}
                        </div>

                        {/* Comment */}
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Izoh (ixtiyoriy)
                          </label>
                          <Textarea
                            placeholder="Mahsulot haqida fikringizni bildiring..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className="resize-none"
                          />
                        </div>

                        <Button
                          onClick={handleSubmitReview}
                          disabled={rating === 0}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Baho va izoh qo'shish
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {order.status === 'completed' && order.hasReview && (
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Baholangan
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Hali buyurtmalar yo'q</p>
          <Button
            onClick={() => navigate('/')}
            className="bg-green-600 hover:bg-green-700"
          >
            Mahsulotlarni ko'rish
          </Button>
        </div>
      )}
    </div>
  );
}
