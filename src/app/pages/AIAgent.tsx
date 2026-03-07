import { useState } from "react";
import { Sparkles, TrendingDown, Package, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Sun'iy intellekt tahlili asosida shakllangan soxta ma'lumotlar (Mock Data)
const initialSuggestions = [
  {
    id: 'ai1',
    productName: 'Sarxil Qizil Pomidor',
    farmerName: 'Ahmad aka',
    currentStock: 8,
    unit: 'kg',
    weeklySales: 45,
    suggestedOrder: 40,
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
    totalPrice: 240000,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80",
    reason: "Sut tez sotilyapti (kuniga 5L). Zaxira tugamoqda."
  }
];

export default function AIAgent() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleConfirmOrder = (item: any) => {
    // 1. Telefonni titratish (Haptic)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 50, 30]);
    }

    // 2. Chiroyli Toast xabar
    toast.success("AI buyurtmani joyladi!", {
      description: `${item.farmerName}ga ${item.suggestedOrder} ${item.unit} ${item.productName} zakaz qilindi.`,
      icon: <Sparkles className="w-5 h-5 text-yellow-400" />
    });

    // 3. Tasdiqlangan narsani ro'yxatdan olib tashlash
    setSuggestions(suggestions.filter(s => s.id !== item.id));
  };

  return (
    <div className="min-h-screen bg-[#f8f9f5] pb-32 animate-fadeIn">
      
      {/* AI Header qismi */}
      <div className="bg-[#2d3429] pt-12 pb-24 px-6 rounded-b-[3rem] relative overflow-hidden shadow-lg">
        {/* Dekorativ elementlar */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#4a6d3a] rounded-full mix-blend-screen filter blur-[3rem] opacity-60"></div>
        
        <div className="relative z-10 flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">AI Yordamchi</h1>
            <p className="text-gray-300 text-sm font-medium">Omboringiz nazorat ostida</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-5 border border-white/10">
          <h3 className="text-white font-bold text-lg mb-1">2 ta mahsulot tugamoqda</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Savdo tahlillariga ko'ra ba'zi mahsulotlar 2 kunda tugaydi. Avtomatik buyurtmalarni tasdiqlang.
          </p>
        </div>
      </div>

      {/* AI Takliflar Ro'yxati */}
      <div className="px-4 -mt-14 space-y-4 relative z-20">
        {suggestions.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-10 flex flex-col items-center justify-center shadow-sm text-center border border-black/[0.02]">
            <CheckCircle2 className="w-16 h-16 text-[#4a6d3a] mb-4" />
            <h3 className="text-xl font-bold text-[#2d3429] mb-2">Hamma narsa joyida!</h3>
            <p className="text-[#6b7a62] text-sm">Omboringizda yetarlicha zaxira bor. AI tahlilni davom ettirmoqda.</p>
          </div>
        ) : (
          suggestions.map((item) => (
            <div key={item.id} className="bg-white rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-black/[0.02]">
              
              {/* Mahsulot qisqacha ma'lumoti */}
              <div className="flex gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="w-16 h-16 rounded-[1.2rem] bg-[#f1f4ee] overflow-hidden shrink-0">
                  <ImageWithFallback src={item.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#2d3429] leading-tight mb-1">{item.productName}</h4>
                  <p className="text-[11px] font-bold text-[#6b7a62]">{item.farmerName}</p>
                </div>
              </div>

              {/* AI Tahlili (Stats) */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 bg-red-50 rounded-2xl p-3">
                  <div className="flex items-center gap-1.5 mb-1 text-red-600">
                    <Package className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase">Omborda</span>
                  </div>
                  <span className="text-lg font-black text-red-700">{item.currentStock} {item.unit}</span>
                </div>
                <div className="flex-1 bg-[#f1f4ee] rounded-2xl p-3">
                  <div className="flex items-center gap-1.5 mb-1 text-[#4a6d3a]">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase">Sotilishi (Hafta)</span>
                  </div>
                  <span className="text-lg font-black text-[#2d3429]">{item.weeklySales} {item.unit}</span>
                </div>
              </div>

              {/* AI Tavsiyasi */}
              <div className="bg-[#e2f0d9] rounded-2xl p-4 mb-5">
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-yellow-600 fill-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#4a6d3a] uppercase block mb-0.5">AI Tavsiyasi</span>
                    <p className="text-[13px] font-medium text-[#2d5a27] leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold text-[#6b7a62] uppercase mb-0.5">Buyurtma hajmi</p>
                  <p className="text-xl font-black text-[#2d3429]">{item.suggestedOrder} <span className="text-sm">{item.unit}</span></p>
                </div>
                <button 
                  onClick={() => handleConfirmOrder(item)}
                  className="bg-[#2d3429] hover:bg-black text-white px-6 py-4 rounded-[1.5rem] font-bold text-sm flex items-center gap-2 active:scale-95 transition-transform shadow-lg shadow-black/10"
                >
                  Tasdiqlash <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
