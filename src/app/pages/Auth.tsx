import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock, Phone, Store, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-[#f1f4ee] flex flex-col justify-between animate-fadeIn relative overflow-hidden">
      
      {/* Tepa qism: Logo va Fon */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 pt-10 pb-8 px-6">
        
        {/* LOGO QISMI: public papkasidagi logo.png ni chaqiradi */}
        <img 
          src="/logo.png" 
          alt="Ferdo Logo" 
          className="w-32 h-32 object-contain mb-6 drop-shadow-xl animate-slideUp"
          onError={(e) => {
            // Agar logo fayli topilmasa, ehtiyot shart yashil 'F' harfi chiqib turadi
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        {/* Fallback (Ehtiyot) Logo */}
        <div className="hidden w-28 h-28 bg-gradient-to-br from-[#4a6d3a] to-[#2d5a27] rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-6">
           <span className="text-white font-black text-6xl">F</span>
        </div>

        <h1 className="text-3xl font-black text-[#2d3429] text-center tracking-tight mb-3">
          {isLogin ? "Xush kelibsiz!" : "Yangi hisob"}
        </h1>
        <p className="text-[#6b7a62] font-semibold text-center text-sm px-4 leading-relaxed">
          {isLogin 
            ? "O'z hisobingizga kiring va xaridlarni davom ettiring." 
            : "FERDO platformasiga qo'shiling va eng sara mahsulotlarni xarid qiling."}
        </p>
      </div>

      {/* Forma qismi (Bottom Sheet uslubida) */}
      <div className="bg-white w-full rounded-t-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] px-6 pt-8 pb-12 relative z-20 animate-slideUp">
        
        {/* Tab tugmalari */}
        <div className="flex bg-[#f8f9f5] p-1.5 rounded-3xl mb-8 border border-black/[0.02]">
          <button
            type="button"
            onClick={() => { if (navigator.vibrate) navigator.vibrate(15); setIsLogin(true); }}
            className={`flex-1 py-3.5 rounded-[1.2rem] font-bold text-sm transition-all duration-300 ${
              isLogin ? "bg-white text-[#2d3429] shadow-sm" : "text-[#a3b19b] hover:text-[#6b7a62]"
            }`}
          >
            Kirish
          </button>
          <button
            type="button"
            onClick={() => { if (navigator.vibrate) navigator.vibrate(15); setIsLogin(false); }}
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
              <div className="relative flex items-center bg-[#f8f9f5] rounded-3xl p-2 focus-within:ring-2 focus-within:ring-[#e2f0d9] transition-all border border-black/[0.02]">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6b7a62] shadow-sm shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text" placeholder="Ismingiz" required={!isLogin}
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent px-4 py-3 font-semibold text-[#2d3429] placeholder:text-[#a3b19b] focus:outline-none"
                />
              </div>
              <div className="relative flex items-center bg-[#f8f9f5] rounded-3xl p-2 focus-within:ring-2 focus-within:ring-[#e2f0d9] transition-all border border-black/[0.02]">
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

          <div className="relative flex items-center bg-[#f8f9f5] rounded-3xl p-2 focus-within:ring-2 focus-within:ring-[#e2f0d9] transition-all border border-black/[0.02]">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6b7a62] shadow-sm shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <input
              type="tel" placeholder="+998 90 123 45 67" required
              value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-transparent px-4 py-3 font-semibold text-[#2d3429] placeholder:text-[#a3b19b] focus:outline-none"
            />
          </div>

          <div className="relative flex items-center bg-[#f8f9f5] rounded-3xl p-2 focus-within:ring-2 focus-within:ring-[#e2f0d9] transition-all border border-black/[0.02]">
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
            onClick={() => { if (navigator.vibrate) navigator.vibrate(30); }}
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
