import { useNavigate } from "react-router";
import { Star, TrendingUp, ShoppingCart } from "lucide-react";
import { Product } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import OrderModal from "./OrderModal";
import { toast } from "sonner"; // Toast import qildik

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleOrderConfirm = (quantity: number) => {
    setShowOrderModal(false);
    
    // Muvaffaqiyatli xarid titrashi (Ketma-ket 2 marta mayin titrash)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 50, 30]); 
    }

    // Zamonaviy Toast xabar! (Eski alert o'rniga)
    toast.success("Muvaffaqiyatli xarid!", {
      description: `${quantity} ${product.unit} ${product.name} savatga tushdi.`,
    });
  };

  return (
    <>
      <div className="bg-white rounded-[1.8rem] shadow-sm border border-black/[0.03] overflow-hidden hover:shadow-md transition-all duration-300">
        <div onClick={() => navigate(`/product/${product.id}`)} className="relative h-48 bg-[#f8f9f5] cursor-pointer p-2">
          <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover rounded-[1.3rem]" />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm backdrop-blur-md ${product.category === 'oliy' ? 'bg-yellow-400/95 text-[#2d3429]' : 'bg-blue-400/95 text-white'}`}>
              {product.category === 'oliy' ? '⭐ OLIY' : 'ODDIY'}
            </span>
          </div>
        </div>

        <div className="p-5 pt-3">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 onClick={() => navigate(`/product/${product.id}`)} className="text-lg font-bold text-[#2d3429] cursor-pointer hover:text-[#4a6d3a] leading-tight mb-1">{product.name}</h3>
              <p onClick={() => navigate(`/farmer/${product.farmerId}`)} className="text-xs text-[#6b7a62] font-semibold cursor-pointer">{product.farmerName}</p>
            </div>
            <div className="bg-[#f1f4ee] px-3 py-1.5 rounded-xl text-right">
              <span className="text-base font-bold text-[#2d5a27] block">{product.pricePerUnit.toLocaleString()}</span>
              <span className="text-[9px] text-[#4a6d3a] uppercase font-bold">so'm / {product.unit}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span className="text-[11px] font-bold text-yellow-700">{product.farmerRating}</span>
            </div>
            <div className="flex items-center gap-1 text-[#6b7a62] bg-gray-50 px-2 py-1 rounded-lg">
              <TrendingUp className="w-3 h-3" />
              <span className="text-[11px] font-semibold">{product.sold} ta sotildi</span>
            </div>
          </div>

          <button 
            onClick={(e) => { 
              e.stopPropagation();
              if (navigator.vibrate) navigator.vibrate(20); // Tugma bosilganda yengil titrash
              setShowOrderModal(true); 
            }} 
            className="w-full py-3.5 bg-[#4a6d3a] hover:bg-[#3d5a30] text-white rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Xarid qilish</span>
          </button>
        </div>
      </div>
      
      {showOrderModal && (
        <OrderModal 
          product={product} 
          onClose={() => setShowOrderModal(false)} 
          onOrder={handleOrderConfirm} // Xarid tasdiqlandi
        />
      )}
    </>
  );
}
