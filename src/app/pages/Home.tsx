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
    <div className="p-4 space-y-6">
      {/* Filters */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-700" />
          <span className="font-semibold text-gray-900">Filtrlash</span>
        </div>
        
        {/* Category Filter */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-600 mb-2 block uppercase tracking-wide">
            Kategoriya
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-green-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hammasi
            </button>
            <button
              onClick={() => setSelectedCategory('oliy')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'oliy'
                  ? 'bg-yellow-500 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⭐ Oliy
            </button>
            <button
              onClick={() => setSelectedCategory('oddiy')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'oddiy'
                  ? 'bg-blue-500 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Oddiy
            </button>
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block uppercase tracking-wide">
            Mahsulot turi
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedType === 'all'
                  ? 'bg-green-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hammasi
            </button>
            <button
              onClick={() => setSelectedType('Sabzavot')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedType === 'Sabzavot'
                  ? 'bg-green-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🥕 Sabzavot
            </button>
            <button
              onClick={() => setSelectedType('Sut mahsuloti')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedType === 'Sut mahsuloti'
                  ? 'bg-green-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🥛 Sut
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-lg">
            Mavjud mahsulotlar
          </h3>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
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