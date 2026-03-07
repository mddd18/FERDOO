import { useState } from "react";
import { Sparkles, TrendingDown, Package, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const initialSuggestions = [
  {
    id: 'ai1',
    productName: 'Sarxil Qizil Pomidor',
    farmerName: 'Ahmad aka',
    currentStock: 8,
    unit: 'kg',
    weeklySales: 45,
    suggestedOrder: 40,
    pricePerUnit: 12000,
    totalPrice: 480000,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80",
    reason: "Sizda pomidor 2 kunga yetadi. O'tgan haftadagi kabi 40kg olishni tavsiya qilaman."
  },
  {
    id: 'ai2',
    productName: 'Toza Sigir Suti',
    farmerName: 'Dilshod Karimov',
    currentStock: 5,
    unit: 'litr',
    weeklySales: 35,
    suggestedOrder: 30,
    pricePerUnit: 8000,
    totalPrice: 240000,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80",
    reason: "Sut tez sotilyapti (kuniga 5L). Zaxira tugamoqda."
  },
  {
    id: 'ai3',
    productName: 'Tog\' Asali',
    farmerName: 'Zokir Asalchi',
    currentStock: 2,
    unit: 'kg',
    weeklySales: 8,
    suggestedOrder: 10,
    pricePerUnit: 85000,
    totalPrice: 850000,
    image: "https://images.unsplash.com/photo-1587049352847-4d4b1ed7aca1?w=500&q=80",
    reason: "Asal zaxirasi minimal darajaga tushdi. Talab doimiy barqaror."
  },
  {
    id: 'ai4',
    productName: 'Qishloq Tuxumi',
    farmerName: 'Ahmad aka',
    currentStock: 50,
    unit: 'dona',
    weeklySales: 250,
    suggestedOrder: 300,
    pricePerUnit: 1500,
    totalPrice: 450000,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&q=80",
    reason: "Tuxum har kuni o'rtacha 40 dona sotilyapti. 1 kundan keyin tugaydi."
  }
];

export default function AIAgent() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleConfirmOrder = (item: any) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 50, 30]);
    }
    toast.success("AI buyurtmani joyladi!", {
      description: `${item.suggestedOrder} ${item.unit} ${item.productName} zakaz qilindi. Jami: ${item.totalPrice.toLocaleString()} so'm`,
      icon: <Sparkles className="w-5 h-5 text-yellow-400" />
    });
    setSuggestions(suggestions.filter(s => s.id !== item.id));
  };

  return (
    <div className="pb-10 animate-fadeIn">
      
      {/* AI Header qismi - Endi alohida "Card" ko'rinishida */}
      <div className="bg-[#2d3429] p-6 rounded-3xl relative overflow-hidden shadow-lg mb-6 mt-1">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#4a6d3a] rounded-full mix-blend-screen filter blur-[3rem] opacity-60"></div>
        
        <div className="relative z-10 flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">AI Yordamchi</h1>
            <p className="text-gray-300 text-[11px] font-medium">Omboringiz doim nazorat ostida</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <h3 className="text-white font-bold text-sm mb-1">{suggestions.length} ta mahsulot tugamoqda</h3>
          <p className="text-gray-300 text-[11px] leading-relaxed">
            Savdo tahlillariga ko'ra ba'zi mahsulotlar yaqin orada tugaydi. Avtomatik buyurtmalarni tasdiqlang.
          </p>
        </div>
      </div>

      {/* AI Takliflar Ro'yxati */}
      <div className="space-y-4">
        {suggestions.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 flex flex-col items-center justify-center shadow-sm text-center border border-black/[0.02]">
            <CheckCircle2 className="w-16 h-16 text-[#4a6d3a] mb-4" />
            <h3 className="text-xl font-bold text-[#2d3429] mb-2">Hamma narsa joyida!</h3>
            <p className="text-[#6b7a62] text-sm">Omboringizda yetarlicha zaxira bor. AI tahlilni davom ettirmoqda.</p>
          </div>
        ) : (
          suggestions.map((item) => (
            <div key={item.id} className="bg-white rounded-[1.8rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-black/[0.02]">
              
              {/* Mahsulot va Narx ma'lumoti */}
              <div className="flex gap-4 mb-4 pb-4 border-b border-black/[0.03]">
                <div className="w-16 h-16 rounded-[1.2rem] bg-[#f1f4ee] overflow-hidden shrink-0">
                  <ImageWithFallback src={item.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#2d3429] leading-tight mb-1">{item.productName}</h4>
                  <p className="text-[11px] font-bold text-[#6b7a62] mb-1.5">{item.farmerName}</p>
                  {/* Narx qismi */}
                  <p className="text-xs font-black text-[#4a6d3a]">{item.pricePerUnit.toLocaleString()} so'm <span className="text-[#a3b19b] font-semibold">/ {item.unit}</span></p>
                </div>
              </div>

              {/* AI Tahlili (Stats) */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 bg-red-50 rounded-2xl p-3">
                  <div className="flex items-center gap-1.5 mb-1 text-red-600">
                    <Package className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold uppercase">Omborda</span>
                  </div>
                  <span className="text-base font-black text-red-700">{item.currentStock} <span className="text-[10px]">{item.unit}</span></span>
                </div>
                <div className="flex-1 bg-[#f1f4ee] rounded-2xl p-3">
                  <div className="flex items-center gap-1.5 mb-1 text-[#4a6d3a]">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold uppercase">Sotilishi (Hafta)</span>
                  </div>
                  <span className="text-base font-black text-[#2d3429]">{item.weeklySales} <span className="text-[10px]">{item.unit}</span></span>
                </div>
              </div>

              {/* AI Tavsiyasi */}
              <div className="bg-[#e2f0d9] rounded-2xl p-3 mb-5">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-yellow-600 fill-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#4a6d3a] uppercase block mb-0.5">AI Tavsiyasi</span>
                    <p className="text-xs font-semibold text-[#2d5a27] leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tasdiqlash va Jami summa */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-[#6b7a62] uppercase mb-0.5">Zakaz: {item.suggestedOrder} {item.unit}</p>
                  <p className="text-lg font-black text-[#2d3429]">{item.totalPrice.toLocaleString()} <span className="text-[10px] font-bold text-[#a3b19b]">so'm</span></p>
                </div>
                <button 
                  onClick={() => handleConfirmOrder(item)}
                  className="bg-[#2d3429] hover:bg-black text-white px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 active:scale-95 transition-transform shadow-lg shadow-black/10 shrink-0"
                >
                  Zakaz <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
