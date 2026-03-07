import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock, Phone, Store, Leaf } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    shopName: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      if (formData.phone && formData.password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", formData.name || "Do'kon egasi");
        localStorage.setItem("shopName", formData.shopName);
        navigate("/");
      }
    } else {
      if (formData.name && formData.phone && formData.password && formData.shopName) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", formData.name);
        localStorage.setItem("shopName", formData.shopName);
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f4ee] relative flex items-center justify-center p-4 overflow-hidden">
      
      {/* Orqa fondagi dekorativ "blur" dog'lar */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#dce7d3] rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#e2f0d9] rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        
        {/* Logo va Sarlavha */}
        <div className="text-center mb-10">
          <div className="mx-auto w-24 h-24 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-[#e2f0d9] rounded-full flex items-center justify-center">
              <Leaf className="w-10 h-10 text-[#4a6d3a]" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-[#2d3429] mb-2 tracking-tight">FERDO</h1>
          <p className="text-[#6b7a62] font-semibold">Do'kon egalari uchun platforma</p>
        </div>

        {/* Asosiy Forma Kartasi (Glassmorphism) */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 border border-white/50">
          
          {/* Tab tugmalari (Login / Register) */}
          <div className="flex bg-[#f8f9f5] p-1.5 rounded-full mb-8 shadow-inner">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3.5 rounded-full font-bold transition-all duration-300 ${
                isLogin
                  ? "bg-[#4a6d3a] text-white shadow-md scale-100"
                  : "text-[#6b7a62] hover:text-[#2d3429]"
              }`}
            >
              Kirish
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3.5 rounded-full font-bold transition-all duration-300 ${
                !isLogin
                  ? "bg-[#4a6d3a] text-white shadow-md scale-100"
                  : "text-[#6b7a62] hover:text-[#2d3429]"
              }`}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-[#6b7a62] mb-2 block ml-2">
                    Ism Familiya
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b7a62]" />
                    <Input
                      type="text"
                      placeholder="Ismingizni kiriting"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#f8f9f5] border-none rounded-full h-14 pl-12 pr-4 text-[#2d3429] font-bold focus-visible:ring-2 focus-visible:ring-[#4a6d3a]/20 shadow-inner placeholder:font-medium"
                      required={!isLogin}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-[#6b7a62] mb-2 block ml-2">
                    Do'kon nomi
                  </label>
                  <div className="relative">
                    <Store className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b7a62]" />
                    <Input
                      type="text"
                      placeholder="Do'kon nomini kiriting"
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      className="w-full bg-[#f8f9f5] border-none rounded-full h-14 pl-12 pr-4 text-[#2d3429] font-bold focus-visible:ring-2 focus-visible:ring-[#4a6d3a]/20 shadow-inner placeholder:font-medium"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-bold text-[#6b7a62] mb-2 block ml-2">
                Telefon raqam
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b7a62]" />
                <Input
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#f8f9f5] border-none rounded-full h-14 pl-12 pr-4 text-[#2d3429] font-bold focus-visible:ring-2 focus-visible:ring-[#4a6d3a]/20 shadow-inner placeholder:font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-[#6b7a62] mb-2 block ml-2">
                Parol
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b7a62]" />
                <Input
                  type="password"
                  placeholder="Parolingizni kiriting"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#f8f9f5] border-none rounded-full h-14 pl-12 pr-4 text-[#2d3429] font-bold focus-visible:ring-2 focus-visible:ring-[#4a6d3a]/20 shadow-inner placeholder:font-medium"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#4a6d3a] hover:bg-[#3d5a30] text-white h-14 text-lg font-black rounded-full shadow-[0_10px_20px_rgba(74,109,58,0.2)] active:scale-95 transition-all mt-6"
            >
              {isLogin ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
            </Button>
          </form>
        </div>

        {/* Afzalliklar Kartalari */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white/60 backdrop-blur-md p-4 rounded-[2rem] shadow-sm flex flex-col items-center justify-center border border-white/40">
            <div className="text-2xl mb-1 drop-shadow-sm">🌾</div>
            <p className="text-[10px] text-[#4a6d3a] font-black uppercase tracking-wider text-center">Yangi</p>
          </div>
          <div className="bg-white/60 backdrop-blur-md p-4 rounded-[2rem] shadow-sm flex flex-col items-center justify-center border border-white/40">
            <div className="text-2xl mb-1 drop-shadow-sm">💰</div>
            <p className="text-[10px] text-[#4a6d3a] font-black uppercase tracking-wider text-center">Arzon</p>
          </div>
          <div className="bg-white/60 backdrop-blur-md p-4 rounded-[2rem] shadow-sm flex flex-col items-center justify-center border border-white/40">
            <div className="text-2xl mb-1 drop-shadow-sm">🚚</div>
            <p className="text-[10px] text-[#4a6d3a] font-black uppercase tracking-wider text-center">Tez</p>
          </div>
        </div>

      </div>
    </div>
  );
}
