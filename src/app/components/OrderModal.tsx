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

  return (
    <div className="fixed inset-0 bg-[#2d3429]/40 backdrop-blur-sm flex items-end justify-center z-[100] animate-fadeIn">
      <div className="bg-white rounded-t-[2.5rem] w-full max-w-md p-8 animate-slideUp shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-[#2d3429]">Buyurtma</h3>
          <button onClick={onClose} className="p-2 bg-[#f1f4ee] hover:bg-[#e2f0d9] rounded-full transition-colors text-[#4a6d3a]">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Product Info */}
        <div className="mb-8 p-5 bg-[#e2f0d9] rounded-[2rem] flex items-center justify-between">
          <div>
            <h4 className="font-bold text-lg text-[#2d3429] mb-1">{product.name}</h4>
            <p className="text-sm text-[#4a6d3a] font-medium">{product.pricePerUnit.toLocaleString()} so'm / {product.unit}</p>
          </div>
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
            <img src={product.image} alt="" className="w-full h-full object-cover"/>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-8 bg-[#f8f9f5] p-6 rounded-[2rem]">
          <label className="text-sm font-bold text-[#6b7a62] mb-4 block text-center uppercase tracking-wider">
            Miqdorni tanlang
          </label>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-14 h-14 bg-white shadow-sm hover:shadow-md disabled:opacity-50 text-[#4a6d3a] rounded-full flex items-center justify-center transition-all active:scale-95"
            >
              <Minus className="w-6 h-6" />
            </button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(availableQuantity, Math.max(1, parseInt(e.target.value) || 1)))}
              className="text-center text-3xl font-black w-24 bg-transparent border-none focus-visible:ring-0"
              min={1}
              max={availableQuantity}
            />
            <button
              onClick={() => setQuantity(Math.min(availableQuantity, quantity + 1))}
              disabled={quantity >= availableQuantity}
              className="w-14 h-14 bg-[#4a6d3a] hover:bg-[#3d5a30] text-white shadow-md disabled:opacity-50 rounded-full flex items-center justify-center transition-all active:scale-95"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm font-bold text-[#6b7a62] mt-4 text-center">
            Omborda: <span className="text-[#4a6d3a]">{availableQuantity} {product.unit}</span>
          </p>
        </div>

        {/* Total & Action */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-bold text-[#6b7a62] mb-1">Jami summa</p>
            <p className="text-2xl font-black text-[#2d3429]">
              {totalPrice.toLocaleString()} <span className="text-sm font-bold text-[#6b7a62]">so'm</span>
            </p>
          </div>
          <button
            onClick={() => { onOrder(quantity); onClose(); }}
            className="flex-1 py-5 bg-[#4a6d3a] hover:bg-[#3d5a30] text-white rounded-[2rem] font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-green-900/20 active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-5 h-5" />
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );
}
