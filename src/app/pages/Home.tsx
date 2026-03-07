import { useState } from "react";
import { products, farmers } from "../data/mockData";
import { Search, MapPin, Tag, ChevronRight, Zap } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const topCategories = [
    { name: "Sabzavotlar", icon: "🥕" },
    { name: "Mevalar", icon: "🍎" },
    { name: "Sut", icon: "🥛" },
    { name: "Go'sht", icon: "🥩" },
  ];

  const featuredFarmer = farmers[0];

  return (
    <div className="p-6 space-y-10 animate-fadeIn bg-background">
      
      {/* Sarlavha va Qidiruv */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-black text-[#2d3429] tracking-tight">Bugun nima xarid <span className="text-[#4a6d3a]">qilasiz?</span></h2>
          <p className="text-[#6b7a62] font-semibold mt-1">Sizga eng yaqin sarxil mahsulotlar</p>
        </div>
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7a62]" />
          <input 
            type="text" 
            placeholder="Sarxil pomidor, sut, mevalar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-16 bg-white rounded-3xl pl-16 pr-6 font-semibold shadow-sm focus:ring-2 focus:ring-[#e2f0d9]"
          />
        </div>
      </div>

      {/* Tezkor Kategoriyalar */}
      <div className="grid grid-cols-4 gap-4">
        {topCategories.map(cat => (
          <div key={cat.name} className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-[#e2f0d9] rounded-3xl flex items-center justify-center text-3xl shadow-sm cursor-pointer active:scale-95 transition-transform">
              {cat.icon}
            </div>
            <span className="text-sm font-bold text-[#2d3429]">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Kun Fermeri (Banner) */}
      {featuredFarmer && (
        <div className="relative bg-[#4a6d3a] p-8 rounded-[2rem] text-white shadow-[0_15px_40px_rgba(74,109,58,0.3)] overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="uppercase text-sm font-black tracking-wider text-white/90">Haftaning Fermeri</span>
            </div>
            <div className="flex items-center gap-5">
              <img src={featuredFarmer.avatar} alt={featuredFarmer.name} className="w-16 h-16 rounded-full border-4 border-white" />
              <div>
                <h3 className="text-2xl font-black">{featuredFarmer.name}</h3>
                <p className="text-white/80 font-medium">{featuredFarmer.location}</p>
              </div>
            </div>
            <Button variant="outline" className="text-white border-white rounded-2xl">
              Xarid Qilish <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Eng Sara Mahsulotlar */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-[#2d3429]">Sara Mahsulotlar</h3>
          <span className="text-sm font-bold text-[#4a6d3a] cursor-pointer">Hammasini ko'rish</span>
        </div>
        <div className="space-y-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
