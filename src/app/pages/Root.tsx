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
    alert(`Buyurtma qabul qilindi!\n\nMahsulot: ${product.name}\nMiqdor: ${quantity} ${product.unit}\nJami: ${(quantity * product.pricePerUnit).toLocaleString()} so'm\n\nFermer: ${product.farmerName}`);
  };

  return (
    <>
      {/* Kartochka: Border olib tashlandi, shadow yumshoq qilindi va radius oshirildi */}
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-lg transition-all duration-300 mb-6">
        {/* Product Image: Balandligi biroz kamaytirildi va rasm burchaklari kartaga moslandi */}
        <div
          onClick={() => navigate(`/product/${product.id}`)}
          className="relative h-52 bg-[#f8f9f5] cursor-pointer p-2"
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-[1.5rem]"
          />
          {/* Badge-lar: Glassmorphism uslubida */}
          <div className="absolute top-5 right-5">
            <span
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold shadow-sm backdrop-blur-md ${
                product.category === 'oliy'
                  ? 'bg-yellow-400/90 text-white'
                  : 'bg-blue-400/90 text-white'
              }`}
            >
              {product.category === 'oliy' ? '⭐ OLIY' : 'ODDIY'}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 pt-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3
                onClick={() => navigate(`/product/${product.id}`)}
                className="text-xl font-extrabold text-[#2d3429] cursor-pointer hover:text-[#4a6d3a] transition-colors"
              >
                {product.name}
              </h3>
              <p 
                onClick={() => navigate(`/farmer/${product.farmerId}`)}
                className="text-sm text-[#6b7a62] font-medium cursor-pointer"
              >
                {product.farmerName}
              </p>
            </div>
            {/* Narx rasmga mos pastel yashil fonda */}
            <div className="bg-[#e2f0d9] px-4 py-2 rounded-2xl">
              <span className="text-lg font-black text-[#2d5a27]">
                {product.pricePerUnit.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#2d5a27] ml-1 uppercase font-bold">
                {product.unit}
              </span>
            </div>
          </div>

          {/* Reyting va Sotuv ma'lumoti */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-[#2d3429]">{product.farmerRating}</span>
            </div>
            <div className="flex items-center gap-1 text-[#6b7a62]">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-medium">{product.sold} sotildi</span>
            </div>
          </div>

          {/* Sotib olish tugmasi: To'liq yumaloq (Pill shape) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowOrderModal(true);
            }}
            className="w-full py-4 bg-[#4a6d3a] hover:bg-[#3d5a30] text-white rounded-full font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md shadow-green-900/10"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Sotib olish</span>
          </button>
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
