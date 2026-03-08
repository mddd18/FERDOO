import { useState } from "react";
import { Sparkles, TrendingDown, Package, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const initialSuggestions = [
  {
    // ... boshqa ma'lumotlar
    weeklySales: 45, // Haftalik o'rtacha sotuv
    currentStock: 8,  // Hozirgi qoldiq
    reason: "Sizda pomidor 2 kunga yetadi. O'tgan haftadagi kabi 40kg olishni tavsiya qilaman."
  },
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
    reason: "Sut tez sotilyapti (kuniga 5L). Zaxira bugun tushlikda tugaydi."
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
    reason: "Asal zaxirasi minimal darajaga tushdi. Doimiy talab yuqori."
  },
  {
    id: 'ai4',
    productName: 'Qishloq Tuxumi',
    farmerName: 'Akmal Rahimov',
    currentStock: 50,
    unit: 'dona',
    weeklySales: 280,
    suggestedOrder: 300,
    pricePerUnit: 1500,
    totalPrice: 450000,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&q=80",
    reason: "Sotilish tezligi kutilmaganda oshdi. Zaxirani yangilash lozim."
  }
];

export default function AIAgent() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleConfirmOrder = (item: any) => {
    if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
    toast.success("AI Buyurtma joylandi!", {
      description: `${item.suggestedOrder} ${item.unit} ${item.productName} zakaz qilindi.`,
      icon: <Sparkles className="w-5 h-5 text-yellow-400" />
    });
    setSuggestions(suggestions.filter(s => s.id !== item.id));
  };

  return (
    <div className="pb-10 animate-fadeIn">
      {/* AI Stats Header */}
      <div className="bg-[#2d3429] p-6 rounded-3xl relative overflow-hidden shadow-lg mb-8">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#4a6d3a] rounded-full mix-blend-screen filter blur-[3rem] opacity-60"></div>
        <div className="relative z-10 flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">AI Agent</h1>
            <p className="text-gray-300 text-[10px] font-bold">Avtomatik ombor tahlili</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <h3 className="text-white font-bold text-sm mb-1">{suggestions.length} ta tugayotgan mahsulot</h3>
          <p className="text-gray-300 text-[11px]">Tahlillar bo'yicha zaxirani to'ldirish tavsiya etiladi.</p>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-10 flex flex-col items-center justify-center text-center shadow-sm border border-black/[0.02]">
            <CheckCircle2 className="w-16 h-16 text-[#4a6d3a] mb-4" />
            <h3 className="text-xl font-bold text-[#2d3429]">Zaxira butun</h3>
            <p className="text-[#6b7a62] text-sm mt-1">AI tahlilni davom ettirmoqda.</p>
          </div>
        ) : (
          suggestions.map((item) => (
            <div key={item.id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-black/[0.02]">
              <div className="flex gap-4 mb-4 pb-4 border-b border-black/[0.03]">
                <div className="w-16 h-16 rounded-[1.2rem] overflow-hidden shrink-0 bg-gray-50">
                  <ImageWithFallback src={item.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#2d3429] text-sm mb-0.5">{item.productName}</h4>
                  <p className="text-[10px] font-bold text-[#6b7a62] mb-1">{item.farmerName}</p>
                  <p className="text-xs font-black text-[#4a6d3a]">{item.pricePerUnit.toLocaleString()} so'm / {item.unit}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-red-50 p-3 rounded-2xl border border-red-100">
                  <p className="text-[9px] font-bold text-red-600 uppercase mb-1 flex items-center gap-1"><Package className="w-3 h-3" /> Omborda</p>
                  <p className="text-base font-black text-red-700">{item.currentStock} {item.unit}</p>
                </div>
                <div className="bg-[#f1f4ee] p-3 rounded-2xl border border-[#4a6d3a]/5">
                  <p className="text-[9px] font-bold text-[#4a6d3a] uppercase mb-1 flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Sotuv hajmi</p>
                  <p className="text-base font-black text-[#2d3429]">{item.weeklySales} {item.unit}</p>
                </div>
              </div>

              <div className="bg-[#e2f0d9] p-3 rounded-2xl flex gap-2 mb-5">
                <Zap className="w-4 h-4 text-yellow-600 fill-yellow-600 shrink-0 mt-0.5" />
                <p className="text-[11px] font-semibold text-[#2d5a27] leading-relaxed">{item.reason}</p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <div>
                  <p className="text-[10px] font-bold text-[#a3b19b] mb-0.5 uppercase tracking-wider">Taklif etilgan buyurtma</p>
                  <p className="text-lg font-black text-[#2d3429] leading-tight">
                    {item.totalPrice.toLocaleString()} <span className="text-[10px] text-[#6b7a62]">so'm</span>
                  </p>
                </div>
                <button 
                  onClick={() => handleConfirmOrder(item)}
                  className="bg-[#2d3429] hover:bg-black text-white px-6 py-4 rounded-2xl font-bold text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg shadow-black/10"
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
