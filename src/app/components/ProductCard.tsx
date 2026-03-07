import { useNavigate } from "react-router";
import { Star, Package, TrendingUp, ShoppingCart } from "lucide-react";
import { Product } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import OrderModal from "./OrderModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const availableQuantity = product.quantity - product.sold;
  const soldPercentage = (product.sold / product.quantity) * 100;

  const handleOrder = (quantity: number) => {
    // In real app, this would make an API call
    alert(`Buyurtma qabul qilindi!\n\nMahsulot: ${product.name}\nMiqdor: ${quantity} ${product.unit}\nJami: ${(quantity * product.pricePerUnit).toLocaleString()} so'm\n\nFermer: ${product.farmerName}`);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        {/* Product Image */}
        <div
          onClick={() => navigate(`/product/${product.id}`)}
          className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer"
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                product.category === 'oliy'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {product.category === 'oliy' ? '⭐ Oliy' : 'Oddiy'}
            </span>
          </div>
          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-md">
              {product.type}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Name - Single Line */}
          <h3
            onClick={() => navigate(`/product/${product.id}`)}
            className="text-xl font-bold text-gray-900 mb-3 truncate cursor-pointer hover:text-green-600 transition-colors"
          >
            {product.name}
          </h3>

          {/* Farmer Info */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/farmer/${product.farmerId}`);
            }}
            className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-green-50 hover:to-green-100 transition-colors cursor-pointer"
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {product.farmerName}
              </p>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">{product.farmerRating}</span>
                <span className="text-xs text-gray-500">fermer</span>
              </div>
            </div>
          </div>

          {/* Quantity Info */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  {availableQuantity} {product.unit} mavjud
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <TrendingUp className="w-3 h-3" />
                <span>{product.sold} sotildi</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${100 - soldPercentage}%` }}
              />
            </div>
          </div>

          {/* Price and Order Button */}
          <div className="flex items-center gap-3">
            <div className="flex-1 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
              <p className="text-xs text-gray-600 mb-0.5">Narxi</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-green-600">
                  {product.pricePerUnit.toLocaleString()}
                </span>
                <span className="text-xs text-gray-600">so'm/{product.unit}</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowOrderModal(true);
              }}
              className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-md"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Sotib olish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <OrderModal
          product={product}
          onClose={() => setShowOrderModal(false)}
          onOrder={handleOrder}
        />
      )}
    </>
  );
}