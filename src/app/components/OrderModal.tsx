import { useState } from "react";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
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

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= availableQuantity) {
      setQuantity(value);
    }
  };

  const handleOrder = () => {
    onOrder(quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-t-3xl w-full max-w-md p-6 animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Buyurtma berish</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl">
          <h4 className="font-bold text-lg mb-1">{product.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{product.farmerName}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-600">
              {product.pricePerUnit.toLocaleString()}
            </span>
            <span className="text-sm text-gray-600">so'm / {product.unit}</span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Miqdorini tanlang
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-full flex items-center justify-center transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="text-center text-xl font-bold w-24"
              min={1}
              max={availableQuantity}
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= availableQuantity}
              className="w-12 h-12 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Mavjud: {availableQuantity} {product.unit}
          </p>
        </div>

        {/* Total Price */}
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Miqdor:</span>
            <span className="font-semibold">
              {quantity} {product.unit}
            </span>
          </div>
          <div className="h-px bg-gray-300 my-3" />
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium">Jami:</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-green-600">
                {totalPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600 ml-1">so'm</span>
            </div>
          </div>
        </div>

        {/* Order Button */}
        <Button
          onClick={handleOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold rounded-2xl flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Buyurtma berish
        </Button>
      </div>
    </div>
  );
}
