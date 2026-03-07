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

  const handleQuantityChange = (val: number) => {
    const clampedVal = Math.min(availableQuantity, Math.max(1, isNaN(val) ? 1 : val));
    setQuantity(clampedVal);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center animate-fadeIn">
      {/* Fon: Bosilganda yopiladi */}
      <div className="absolute inset-0 bg-[#2d3429]/60 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal: z-index va silliq ko'tarilish */}
      <div className="relative bg-white rounded-t-[2.5rem] w-full max-w-[430px] p-8 shadow-2xl animate-slideUp pb-[calc(env(safe-area-inset-bottom,20px)+20px)] border-t border-black/[0.03]">
        
        {/* Modal Handle */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 -mt-2" />

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-[#2d3429] tracking-tight">Buyurtma</h3>
          <button 
            onClick={onClose} 
            className="p-2.5 bg-[#f1f4ee] hover:bg-[#e2f0d9] rounded-full active:scale-90 text-[#4a6d3a] transition-all"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Product Info */}
        <div className="mb-6 p-4 bg-gradient-to-r from-[#e2f0d9] to-[#f1f4ee] rounded-[2rem] flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[#2d3429] leading-tight mb-1">{product.name}</h4>
            <p className="text-sm text-[#4a6d3a] font-bold">
              {product.pricePerUnit.toLocaleString()} so'm / {product.unit}
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
              onClick={() => { if (navigator.vibrate) navigator.vibrate(15); handleQuantityChange(quantity - 1); }}
              disabled={quantity <= 1}
              className="w-14 h-14 bg-white shadow-sm disabled:opacity-30 text-[#4a6d3a] rounded-2xl flex items-center justify-center active:scale-90 border"
            >
              <Minus className="w-7 h-7" strokeWidth={3} />
            </button>
            
            <div className="flex flex-col items-center">
              <Input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                className="text-center text-4xl font-black w-20 bg-transparent border-none focus-visible:ring-0 p-0"
              />
              <span className="text-[10px] font-bold text-[#a3b19b] uppercase">{product.unit}</span>
            </div>

            <button
              onClick={() => { if (navigator.vibrate) navigator.vibrate(15); handleQuantityChange(quantity + 1); }}
              disabled={quantity >= availableQuantity}
              className="w-14 h-14 bg-[#4a6d3a] text-white shadow-lg disabled:opacity-30 rounded-2xl flex items-center justify-center active:scale-90"
            >
              <Plus className="w-7 h-7" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-[#a3b19b] mb-1 uppercase tracking-wider">Jami summa</p>
            <p className="text-2xl font-black text-[#2d3429] leading-none">
              {totalPrice.toLocaleString()} <span className="text-xs">so'm</span>
            </p>
          </div>
          <button
            onClick={() => { 
               if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
               onOrder(quantity); 
               onClose(); 
            }}
            className="flex-[1.5] py-5 bg-[#4a6d3a] hover:bg-[#2d3429] text-white rounded-[1.8rem] font-bold text-lg flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );
}
