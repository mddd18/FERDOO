import { useState } from "react";
import { products, farmers } from "../data/mockData";
import { Search, ChevronRight, Zap } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const topCategories = [
    { name: "Sabzavot", icon: "🥕" },
    { name: "Mevalar", icon: "🍎" },
    { name: "Asal", icon: "🍯" },
    { name: "Sut", icon: "🥛" },
  ];

  const featuredFarmer = farmers[0];

  return (
    <div className="p-6 space-y-8 animate-fadeIn">
      
      {/* Sarlavha va Qidiruv - Yozuvlar ingichkaroq qilindi */}
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-[#2d3429] tracking-tight">Bugun nima xarid <span className="text-[#4a6d3a]">qilasiz?</span></h2>
          <p className="text-[#6b7a62] text-sm font-medium mt-1">Sizga eng yaqin sarxil mahsulotlar</p>
        </div>
        <div className="relative shadow-sm rounded-full overflow-hidden">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7a62]" />
          <input 
            type="text" 
            placeholder="Sarxil pomidor, sut, asal..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 bg-white pl-14 pr-6 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#e2f0d9]"
          />
        </div>
      </div>

      {/* Tezkor Kategoriyalar */}
      <div className="grid grid-cols-4 gap-3">
        {topCategories.map(cat => (
          <div key={cat.name} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm cursor-pointer active:scale-95 transition-transform border border-white/60">
              {cat.icon}
            </div>
            <span className="text-xs font-semibold text-[#6b7a62]">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Kun Fermeri (Banner) */}
      {featuredFarmer && (
        <div className="relative bg-[#4a6d3a] p-6 rounded-[2rem] text-white shadow-md overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="uppercase text-[10px] font-bold tracking-wider text-white/90">Haftaning Fermeri</span>
            </div>
            <div className="flex items-center gap-4">
              <img src={featuredFarmer.avatar} alt={featuredFarmer.name} className="w-14 h-14 rounded-full border-[3px] border-white/20" />
              <div>
                <h3 className="text-xl font-bold">{featuredFarmer.name}</h3>
                <p className="text-white/80 text-xs font-medium">{featuredFarmer.location}</p>
              </div>
            </div>
            <Button variant="outline" className="text-[#4a6d3a] bg-white border-none rounded-full h-10 w-full font-bold shadow-sm hover:bg-white/90">
              Profilga o'tish <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Eng Sara Mahsulotlar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-bold text-[#2d3429]">Sara Mahsulotlar</h3>
          <span className="text-xs font-bold text-[#4a6d3a] cursor-pointer bg-[#e2f0d9] px-3 py-1.5 rounded-full">Barchasi</span>
        </div>
        <div className="space-y-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
