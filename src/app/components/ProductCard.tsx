import { useNavigate } from "react-router";
import { Star, TrendingUp, ShoppingCart } from "lucide-react";
import { Product } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import OrderModal from "./OrderModal";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleOrderConfirm = (quantity: number) => {
    setShowOrderModal(false);
    
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 50, 30]); 
    }

    toast.success("Muvaffaqiyatli xarid!", {
      description: `${quantity} ${product.unit} ${product.name} savatga tushdi.`,
    });
  };

  return (
    <>
      {/* Karta konteyneri: relative va z-0 orqali uni oddiy holatda saqlaymiz.
         Bu modalning global fixed holatiga xalaqit bermasligi kerak.
      */}
      <div className="bg-white rounded-[1.8rem] shadow-sm border border-black/[0.03] overflow-hidden hover:shadow-md transition-all duration-300 group">
        <div 
          onClick={() => navigate(`/product/${product.id}`)} 
          className="relative h-48 bg-[#f8f9f5] cursor-pointer p-2 overflow-hidden"
        >
          <ImageWithFallback 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-[1.3rem] group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm backdrop-blur-md ${product.category === 'oliy' ? 'bg-yellow-400/95 text-[#2d3429]' : 'bg-blue-400/95 text-white'}`}>
              {product.category === 'oliy' ? '⭐ OLIY' : 'ODDIY'}
            </span>
          </div>
        </div>

        <div className="p-5 pt-3">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 onClick={() => navigate(`/product/${product.id}`)} className="text-lg font-bold text-[#2d3429] cursor-pointer hover:text-[#4a6d3a] leading-tight mb-1 line-clamp-1">{product.name}</h3>
              <p onClick={() => navigate(`/farmer/${product.farmerId}`)} className="text-xs text-[#6b7a62] font-semibold cursor-pointer">{product.farmerName}</p>
            </div>
            <div className="bg-[#f1f4ee] px-3 py-1.5 rounded-xl text-right shrink-0">
              <span className="text-base font-bold text-[#2d5a27] block leading-none mb-1">{product.pricePerUnit.toLocaleString()}</span>
              <span className="text-[9px] text-[#4a6d3a] uppercase font-black tracking-tighter">so'm / {product.unit}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-lg">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span className="text-[11px] font-bold text-yellow-700">{product.farmerRating}</span>
            </div>
            <div className="flex items-center gap-1 text-[#6b7a62] bg-gray-50 px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-3 h-3" />
              <span className="text-[11px] font-semibold">{product.sold} ta sotildi</span>
            </div>
          </div>

          <button 
            onClick={(e) => { 
              e.stopPropagation();
              if (navigator.vibrate) navigator.vibrate(25);
              setShowOrderModal(true); 
            }} 
            className="w-full py-4 bg-[#4a6d3a] hover:bg-[#2d3429] text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#4a6d3a]/10"
          >
            <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
            <span>Xarid qilish</span>
          </button>
        </div>
      </div>
      
      {/* MODAL CHAQIRUVI: 
         Buni faqat kerak bo'lganda (showOrderModal true bo'lsa) render qilamiz.
         Modal ichida z-[9999] ishlatilgani uchun u har doim tepadagi va 
         pastdagi menyulardan ustun turadi.
      */}
      {showOrderModal && (
        <OrderModal 
          product={product} 
          onClose={() => setShowOrderModal(false)} 
          onOrder={handleOrderConfirm} 
        />
      )}
    </>
  );
}
