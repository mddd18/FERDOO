import { useState } from "react";
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
  const availableQuantity = product.quantity - product.sold;
  const totalPrice = quantity * product.pricePerUnit;

  // Miqdorni tekshirish va o'zgartirish funksiyasi
  const handleQuantityChange = (val: number) => {
    if (isNaN(val) || val < 1) {
      setQuantity(1);
    } else if (val > availableQuantity) {
      setQuantity(availableQuantity);
    } else {
      setQuantity(val);
    }
  };

  return (
    /* z-[110] - Header (z-50) va Footer (z-50) dan balandroq bo'lishi uchun */
    <div className="fixed inset-0 bg-[#2d3429]/60 backdrop-blur-md flex items-end justify-center z-[110] animate-fadeIn">
      {/* Tashqi tomonga bosganda yopilish uchun fon qatlami */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative bg-white rounded-t-[2.5rem] w-full max-w-[430px] p-8 animate-slideUp shadow-2xl pb-[calc(env(safe-area-inset-bottom,20px)+20px)]">
        
        {/* Modalni yopish chizig'i (Handle) - Realistik mobil ko'rinish uchun */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 -mt-2" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-[#2d3429] tracking-tight">Buyurtma berish</h3>
          <button 
            onClick={onClose} 
            className="p-2.5 bg-[#f1f4ee] hover:bg-[#e2f0d9] rounded-full transition-all active:scale-90 text-[#4a6d3a]"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Product Card Inside Modal */}
        <div className="mb-6 p-4 bg-gradient-to-r from-[#e2f0d9] to-[#f1f4ee] rounded-[2rem] flex items-center gap-4 border border-[#4a6d3a]/5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[#2d3429] leading-tight mb-1">{product.name}</h4>
            <p className="text-sm text-[#4a6d3a] font-bold">
              {product.pricePerUnit.toLocaleString()} <span className="text-[10px] uppercase">so'm / {product.unit}</span>
            </p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-8 bg-[#f8f9f5] p-6 rounded-[2.5rem] border border-black/[0.02]">
          <label className="text-[10px] font-black text-[#6b7a62] mb-4 block text-center uppercase tracking-[0.2em]">
            Miqdorni belgilang
          </label>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(15);
                handleQuantityChange(quantity - 1);
              }}
              disabled={quantity <= 1}
              className="w-14 h-14 bg-white shadow-sm hover:shadow-md disabled:opacity-30 text-[#4a6d3a] rounded-2xl flex items-center justify-center transition-all active:scale-90 border border-black/[0.03]"
            >
              <Minus className="w-7 h-7" strokeWidth={3} />
            </button>
            
            <div className="relative">
              <Input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                className="text-center text-4xl font-black w-24 bg-transparent border-none focus-visible:ring-0 h-auto p-0"
                min={1}
                max={availableQuantity}
              />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#a3b19b] uppercase">
                {product.unit}
              </span>
            </div>

            <button
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(15);
                handleQuantityChange(quantity + 1);
              }}
              disabled={quantity >= availableQuantity}
              className="w-14 h-14 bg-[#4a6d3a] hover:bg-[#3d5a30] text-white shadow-lg shadow-[#4a6d3a]/20 disabled:opacity-30 rounded-2xl flex items-center justify-center transition-all active:scale-90"
            >
              <Plus className="w-7 h-7" strokeWidth={3} />
            </button>
          </div>
          
          <div className="mt-8 flex justify-center">
            <span className="px-4 py-1.5 bg-white rounded-full text-[11px] font-bold text-[#6b7a62] shadow-sm border border-black/[0.02]">
              Omborda qoldi: <span className="text-[#4a6d3a]">{availableQuantity} {product.unit}</span>
            </span>
          </div>
        </div>

        {/* Footer: Jami va Tasdiqlash */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-[#a3b19b] uppercase mb-0.5 tracking-wider">Jami summa</p>
            <p className="text-2xl font-black text-[#2d3429] leading-none">
              {totalPrice.toLocaleString()} <span className="text-xs font-bold text-[#6b7a62]">so'm</span>
            </p>
          </div>
          <button
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
              onOrder(quantity);
            }}
            className="flex-[1.5] py-5 bg-[#4a6d3a] hover:bg-[#2d3429] text-white rounded-[1.8rem] font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-[#4a6d3a]/30 active:scale-95 transition-all"
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );
}
