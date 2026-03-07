import { useState } from "react";
import { products } from "../data/mockData";
import ProductCard from "../components/ProductCard";
import { Filter } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'oliy' | 'oddiy'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'Sabzavot' | 'Sut mahsuloti'>('all');

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const typeMatch = selectedType === 'all' || product.type === selectedType;
    return categoryMatch && typeMatch;
  });

  return (
    <div className="p-6 space-y-8 animate-fadeIn">
      {/* Header Qismi */}
      <div>
        <h2 className="text-3xl font-black text-[#2d3429] mb-2">Xush kelibsiz!</h2>
        <p className="text-[#6b7a62] font-medium">Eng sara qishloq xo'jaligi mahsulotlari</p>
      </div>

      {/* Filtrlar */}
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#e2f0d9] rounded-xl text-[#4a6d3a]">
            <Filter className="w-5 h-5" />
          </div>
          <span className="font-bold text-[#2d3429] text-lg">Filtrlash</span>
        </div>
        
        {/* Category Filter */}
        <div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'all', label: 'Hammasi' },
              { id: 'oliy', label: '⭐ Oliy nav' },
              { id: 'oddiy', label: 'Oddiy' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                  selectedCategory === cat.id
                    ? 'bg-[#4a6d3a] text-white shadow-md scale-105 transform'
                    : 'bg-white text-[#6b7a62] hover:bg-[#e2f0d9] hover:text-[#4a6d3a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'all', label: 'Barchasi', icon: '🍽️' },
              { id: 'Sabzavot', label: 'Sabzavotlar', icon: '🥕' },
              { id: 'Sut mahsuloti', label: 'Sut mahsulotlari', icon: '🥛' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as any)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm flex items-center gap-2 ${
                  selectedType === type.id
                    ? 'bg-[#e2f0d9] text-[#2d5a27] shadow-md scale-105 transform border border-[#4a6d3a]/20'
                    : 'bg-white text-[#6b7a62] hover:bg-[#f1f4ee]'
                }`}
              >
                <span>{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-[#2d3429] text-xl">
            Mavjud mahsulotlar
          </h3>
          <span className="bg-[#e2f0d9] text-[#4a6d3a] px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
            {filteredProducts.length} ta
          </span>
        </div>
        
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
