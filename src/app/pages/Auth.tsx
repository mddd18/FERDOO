import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock, Phone, Store, Leaf, ArrowRight } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", phone: "", password: "", shopName: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", formData.name || "Do'kon egasi");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 animate-fadeIn">
      
      {/* Tepa qism: Logo va Salomlashish */}
      <div className="flex-1 flex flex-col justify-center mt-10 mb-8">
        <div className="w-16 h-16 bg-[#e2f0d9] rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm rotate-3">
          <Leaf className="w-8 h-8 text-[#4a6d3a]" />
        </div>
        <h1 className="text-4xl font-black text-[#2d3429] tracking-tight mb-2">
          {isLogin ? "Xush kelibsiz! 👋" : "Yangi hisob 🚀"}
        </h1>
        <p className="text-[#6b7a62] font-medium text-base leading-relaxed pr-4">
          {isLogin 
            ? "Platformaga kirish uchun telefon raqamingiz va parolingizni kiriting." 
            : "FERDO oilasiga qo'shilish uchun ma'lumotlaringizni to'ldiring."}
        </p>
      </div>

      {/* Forma qismi */}
      <div className="w-full max-w-md pb-8">
        {/* Tab tugmalari (Juda silliq va zamonaviy switch) */}
        <div className="flex bg-[#f4f6f1] p-1.5 rounded-3xl mb-8">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3.5 rounded-[1.2rem] font-bold text-sm transition-all duration-300 ${
              isLogin ? "bg-white text-[#2d3429] shadow-sm" : "text-[#a3b19b] hover:text-[#6b7a62]"
            }`}
          >
            Kirish
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3.5 rounded-[1.2rem] font-bold text-sm transition-all duration-300 ${
              !isLogin ? "bg-white text-[#2d3429] shadow-sm" : "text-[#a3b19b] hover:text-[#6b7a62]"
            }`}
          >
            Ro'yxatdan o'tish
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="relative flex items-center bg-[#f4f6f1] rounded-3xl p-2 focus-within:ring-2 focus-within:ring-[#e2f0d9] transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6b7a62] shadow-sm shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text" placeholder="Ismingiz" required={!isLogin}
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent px-4 py-3 font-semibold text-[#2d3429] placeholder:text-[#a3b19b] focus:outline-none"
                />
              </div>
              <div className="relative flex items-center bg-[#f4f6f1] rounded-3xl p-2 focus-within:ring-2 focus-within:ring-[#e2f0d9] transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6b7a62] shadow-sm shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <input
                  type="text" placeholder="Do'kon nomi" required={!isLogin}
                  value={formData.shopName} onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  className="w-full bg-transparent px-4 py-3 font-semibold text-[#2d3429] placeholder:text-[#a3b19b] focus:outline-none"
                />
              </div>
            </>
          )}

          <div className="relative flex items-center bg-[#f4f6f1] rounded-3xl p-2 focus-within:ring-2 focus-within:ring-[#e2f0d9] transition-all">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6b7a62] shadow-sm shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <input
              type="tel" placeholder="+998 90 123 45 67" required
              value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-transparent px-4 py-3 font-semibold text-[#2d3429] placeholder:text-[#a3b19b] focus:outline-none"
            />
          </div>

          <div className="relative flex items-center bg-[#f4f6f1] rounded-3xl p-2 focus-within:ring-2 focus-within:ring-[#e2f0d9] transition-all">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6b7a62] shadow-sm shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type="password" placeholder="Parolingiz" required
              value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-transparent px-4 py-3 font-semibold text-[#2d3429] placeholder:text-[#a3b19b] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            onClick={() => { if (navigator.vibrate) navigator.vibrate(20); }}
            className="w-full h-16 mt-6 bg-[#4a6d3a] hover:bg-[#3d5a30] text-white rounded-3xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(74,109,58,0.3)] active:scale-95 transition-all"
          >
            {isLogin ? "Tizimga kirish" : "Boshladik"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
