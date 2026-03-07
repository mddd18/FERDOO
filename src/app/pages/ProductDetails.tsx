import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { products, reviews, farmers } from "../data/mockData";
import { ArrowLeft, Star, Package, Calendar, MessageCircle, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);

  const product = products.find((p) => p.id === id);
  const productReviews = reviews.filter((r) => r.productId === id);
  const farmer = farmers.find((f) => f.id === product?.farmerId);

  if (!product || !farmer) {
    return (
      <div className="p-4">
        <p>Mahsulot topilmadi</p>
      </div>
    );
  }

  const availableQuantity = product.quantity - product.sold;
  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
      : 0;

  const handleOrder = () => {
    setOrderDialogOpen(false);
    alert(`Buyurtma qabul qilindi! ${quantity} ${product.unit} - ${(quantity * product.pricePerUnit).toLocaleString()} so'm`);
    navigate('/orders');
  };

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-3 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold">Mahsulot ma'lumotlari</h2>
      </div>

      {/* Product Image */}
      <div className="relative h-64 bg-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.category === 'oliy'
                ? 'bg-yellow-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            {product.category === 'oliy' ? 'Oliy' : 'Oddiy'}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Product Name - Single Display */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
          <p className="text-sm text-gray-500">{product.type}</p>
        </div>

        {/* Price */}
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Narxi</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-green-600">
              {product.pricePerUnit.toLocaleString()}
            </span>
            <span className="text-gray-600">so'm / {product.unit}</span>
          </div>
        </div>

        {/* Farmer Card */}
        <div
          onClick={() => navigate(`/farmer/${farmer.id}`)}
          className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <ImageWithFallback
                src={farmer.avatar}
                alt={farmer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{farmer.name}</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">
                  {farmer.rating} ({farmer.totalReviews} baho)
                </span>
              </div>
            </div>
            <MessageCircle className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-600">{farmer.location}</p>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Tavsif</h3>
          <p className="text-gray-600 text-sm">{product.description}</p>
        </div>

        {/* Availability */}
        <div className="flex items-start gap-3">
          <Package className="w-5 h-5 text-gray-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Mavjud: {availableQuantity} {product.unit}
            </p>
            <p className="text-xs text-gray-500">
              Jami: {product.quantity} {product.unit} (Sotilgan: {product.sold})
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${((availableQuantity / product.quantity) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Posted Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>E'lon qilingan: {new Date(product.postedDate).toLocaleDateString('uz-UZ')}</span>
        </div>

        {/* Reviews Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Izohlar va baholar</h3>
            {productReviews.length > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">({productReviews.length})</span>
              </div>
            )}
          </div>

          {productReviews.length > 0 ? (
            <div className="space-y-3">
              {productReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{review.buyerName}</p>
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
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              Hali izoh qoldirilmagan
            </p>
          )}
        </div>
      </div>

      {/* Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buyurtma berish
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Buyurtma berish</DialogTitle>
                <DialogDescription>
                  {product.name} - {product.pricePerUnit.toLocaleString()} so'm/{product.unit}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Miqdor ({product.unit})
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max={availableQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(availableQuantity, parseInt(e.target.value) || 1)))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maksimal: {availableQuantity} {product.unit}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Jami narx:</span>
                    <span className="text-xl font-bold text-green-600">
                      {(quantity * product.pricePerUnit).toLocaleString()} so'm
                    </span>
                  </div>
                </div>
                <Button onClick={handleOrder} className="w-full bg-green-600 hover:bg-green-700">
                  Tasdiqlash
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
