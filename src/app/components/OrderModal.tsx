import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { Input } from "./ui/input";
import { Product } from "../data/mockData";

interface OrderModalProps {
  product: Product;
  onClose: () => void;
  onOrder: (quantity: number) => void;
}

export default function OrderModal({ product, onClose, onOrder }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  const availableQuantity = product.quantity - product.sold;
  const totalPrice = quantity * product.pricePerUnit;

  // Modal faqat klient tomonida (brauzerda) render bo'lishini ta'minlash
  useEffect(() => {
    setMounted(true);
    // Modal ochilganda orqa fonga scroll bo'lishini taqiqlash
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleQuantityChange = (val: number) => {
    const clampedVal = Math.min(availableQuantity, Math.max(1, isNaN(val) ? 1 : val));
    setQuantity(clampedVal);
  };

  const modalContent = (
    /* z-[9999] endi mutlaq ishlaydi chunki u bevosita body ichida render bo'lyapti */
    <div className="fixed inset-0 z-[9999] flex items-end justify-center pointer-events-auto">
      
      {/* Orqa fon (Overlay) */}
      <div 
        className="absolute inset-0 bg-[#2d3429]/60 backdrop-blur-sm animate-fadeIn" 
        onClick={onClose} 
      />
      
      {/* Modal oynasi */}
      <div className="relative bg-white rounded-t-[2.5rem] w-full max-w-[430px] p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] animate-slideUp pb-[calc(env(safe-area-inset-bottom,20px)+20px)] border-t border-black/[0.03] will-change-transform">
        
        {/* Tortish chizig'i */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 -mt-2" />

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-[#2d3429] tracking-tight">Xarid</h3>
          <button 
            onClick={onClose} 
            className="p-2.5 bg-[#f1f4ee] rounded-full active:scale-90 text-[#4a6d3a]"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Mahsulot kartasi */}
        <div className="mb-6 p-4 bg-gradient-to-r from-[#e2f0d9] to-[#f1f4ee] rounded-[2rem] flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm shrink-0 bg-white">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[#2d3429] leading-tight mb-1">{product.name}</h4>
            <p className="text-sm text-[#4a6d3a] font-bold">
              {product.pricePerUnit.toLocaleString()} so'm / {product.unit}
            </p>
          </div>
        </div>

        {/* Miqdor tanlagich */}
        <div className="mb-8 bg-[#f8f9f5] p-6 rounded-[2.5rem] border border-black/[0.02]">
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => { if (navigator.vibrate) navigator.vibrate(20); handleQuantityChange(quantity - 1); }}
              disabled={quantity <= 1}
              className="w-14 h-14 bg-white shadow-sm disabled:opacity-30 text-[#4a6d3a] rounded-2xl flex items-center justify-center active:scale-90 border border-black/[0.03]"
            >
              <Minus className="w-7 h-7" strokeWidth={3} />
            </button>
            
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-[#2d3429]">{quantity}</span>
              <span className="text-[10px] font-bold text-[#a3b19b] uppercase tracking-wider mt-1">{product.unit}</span>
            </div>

            <button
              onClick={() => { if (navigator.vibrate) navigator.vibrate(20); handleQuantityChange(quantity + 1); }}
              disabled={quantity >= availableQuantity}
              className="w-14 h-14 bg-[#4a6d3a] text-white shadow-lg disabled:opacity-30 rounded-2xl flex items-center justify-center active:scale-90"
            >
              <Plus className="w-7 h-7" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-left">
            <p className="text-[10px] font-bold text-[#a3b19b] mb-1 uppercase tracking-wider">Jami summa</p>
            <p className="text-2xl font-black text-[#2d3429] leading-none">
              {totalPrice.toLocaleString()} <span className="text-xs">so'm</span>
            </p>
          </div>
          <button
            onClick={() => { 
               if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
               onOrder(quantity); 
               // onClose bu yerda chaqirilmaydi, onOrder bajarilgach ProductCard o'zi yopadi.
            }}
            className="flex-[1.5] py-5 bg-[#4a6d3a] text-white rounded-[1.8rem] font-bold text-lg flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );

  // Komponent render bo'lmaguncha (hydration) hech narsa qaytarmaydi
  if (!mounted) return null;

  // Modalni to'g'ridan-to'g'ri document.body ichiga chizish
  return createPortal(modalContent, document.body);
}
