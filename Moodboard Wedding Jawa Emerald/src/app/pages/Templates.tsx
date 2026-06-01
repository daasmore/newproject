import { useState } from "react";
import { Check, Search, Filter } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const TEMPLATES = [
  {
    id: 1,
    name: "Modern Minimalist",
    category: "Modern",
    image: "https://images.unsplash.com/photo-1732649124686-3bab54f79aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3ODAzMDA2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "Emerald",
    premium: false,
  },
  {
    id: 2,
    name: "Classic Floral",
    category: "Floral",
    image: "https://images.unsplash.com/photo-1632610992723-82d7c212f6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbiUyMGZsb3JhbHxlbnwxfHx8fDE3ODAzMDA2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "Blush Pink",
    premium: true,
  },
  {
    id: 3,
    name: "Javanese Heritage",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1632610992723-82d7c212f6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbiUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc4MDMwMDY2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "Dark Green & Gold",
    premium: true,
  },
  {
    id: 4,
    name: "Pure Aesthetic",
    category: "Minimalist",
    image: "https://images.unsplash.com/photo-1737749685390-0959c05aecbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbiUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzgwMzAwNjYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "Monochrome",
    premium: false,
  }
];

export default function Templates() {
  const [activeTemplate, setActiveTemplate] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Modern", "Floral", "Traditional", "Minimalist"];

  const filteredTemplates = activeCategory === "All" 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === activeCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pilih Tema Undangan</h1>
          <p className="text-gray-500 text-sm mt-1">Pilih desain yang paling sesuai dengan gaya pernikahan Anda.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari tema..." 
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-64"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${activeCategory === cat 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <div 
            key={template.id} 
            className={`
              bg-white rounded-xl overflow-hidden border-2 transition-all cursor-pointer group
              ${activeTemplate === template.id ? 'border-emerald-500 shadow-md ring-4 ring-emerald-50' : 'border-transparent border-gray-200 shadow-sm hover:shadow-md'}
            `}
            onClick={() => setActiveTemplate(template.id)}
          >
            <div className="relative h-64 overflow-hidden">
              <ImageWithFallback 
                src={template.image} 
                alt={template.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {template.premium && (
                <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                  PRO
                </div>
              )}
              {activeTemplate === template.id && (
                <div className="absolute inset-0 bg-emerald-600/20 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white text-emerald-600 p-2 rounded-full shadow-lg">
                    <Check className="w-6 h-6" />
                  </div>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-2">
                <Link to={`/preview/${template.id}`} className="bg-white text-gray-900 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-100">
                  Preview
                </Link>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-xs text-gray-500">{template.color}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}