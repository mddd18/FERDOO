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
      // Login logic
      if (formData.phone && formData.password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", formData.name || "Do'kon egasi");
        localStorage.setItem("shopName", formData.shopName);
        navigate("/");
      }
    } else {
      // Register logic
      if (formData.name && formData.phone && formData.password && formData.shopName) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", formData.name);
        localStorage.setItem("shopName", formData.shopName);
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl mb-4 shadow-lg">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">FERDO</h1>
          <p className="text-gray-600">Do'kon egalari uchun platforma</p>
          <p className="text-sm text-gray-500 mt-2">Fermerlardan to'g'ridan-to'g'ri xarid qiling</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Toggle Login/Register */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-2xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                isLogin
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Kirish
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                !isLogin
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          {/* User Type Badge */}
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
            <div className="flex items-center justify-center gap-3">
              <Store className="w-6 h-6 text-green-600" />
              <p className="text-lg font-bold text-green-700">Do'kon egasi</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Ism Familiya
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Ismingizni kiriting"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Do'kon nomi
                </label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Do'koningiz nomini kiriting"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Telefon raqam
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Parol
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Parolingizni kiriting"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
            </Button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {isLogin ? "Akkauntingiz yo'qmi? " : "Akkauntingiz bormi? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-600 font-semibold hover:text-green-700"
              >
                {isLogin ? "Ro'yxatdan o'ting" : "Kirish"}
              </button>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md">
            <div className="text-2xl mb-2">🌾</div>
            <p className="text-xs text-gray-600 font-medium">Yangi mahsulotlar</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md">
            <div className="text-2xl mb-2">💰</div>
            <p className="text-xs text-gray-600 font-medium">20-30% tejash</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md">
            <div className="text-2xl mb-2">🚚</div>
            <p className="text-xs text-gray-600 font-medium">Tez yetkazish</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Fermerlar uchun alohida platforma tez orada
          </p>
        </div>
      </div>
    </div>
  );
}