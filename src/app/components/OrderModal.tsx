// ... (importlar o'zgarishsiz qoladi)

export default function OrderModal({ product, onClose, onOrder }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const availableQuantity = product.quantity - product.sold;
  const totalPrice = quantity * product.pricePerUnit;

  return (
    /* z-[120] - Bu savatni ham tepadagi header (z-50), ham pastki menyu (z-50) 
       va hatto chat (z-100) dan ham balandda turishini ta'minlaydi.
    */
    <div className="fixed inset-0 z-[120] bg-[#2d3429]/60 backdrop-blur-md flex items-end justify-center animate-fadeIn">
      
      {/* Fon qatlamiga bosganda yopilish */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* pb-[calc(env(safe-area-inset-bottom,20px)+20px)] - Bu iPhone kabi 
         ekranlarda tasdiqlash tugmasini pastki chiziqdan yuqoriga ko'taradi.
      */
      <div className="relative bg-white rounded-t-[2.5rem] w-full max-w-[430px] p-8 animate-slideUp shadow-2xl pb-[calc(env(safe-area-inset-bottom,20px)+20px)]">
        
        {/* Modal Handle (Chiziqcha) */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 -mt-2" />

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-[#2d3429]">Buyurtma</h3>
          <button onClick={onClose} className="p-2.5 bg-[#f1f4ee] rounded-full active:scale-90 text-[#4a6d3a]">
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Product Info */}
        <div className="mb-6 p-4 bg-gradient-to-r from-[#e2f0d9] to-[#f1f4ee] rounded-[2rem] flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
          </div>
          <div>
            <h4 className="font-bold text-[#2d3429] mb-1">{product.name}</h4>
            <p className="text-sm text-[#4a6d3a] font-bold">{product.pricePerUnit.toLocaleString()} so'm / {product.unit}</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-8 bg-[#f8f9f5] p-6 rounded-[2.5rem] border border-black/[0.02]">
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-14 h-14 bg-white shadow-sm disabled:opacity-30 rounded-2xl flex items-center justify-center active:scale-90 border"
            >
              <Minus className="w-7 h-7 text-[#4a6d3a]" strokeWidth={3} />
            </button>
            
            <span className="text-4xl font-black text-[#2d3429] w-12 text-center">{quantity}</span>

            <button
              onClick={() => setQuantity(Math.min(availableQuantity, quantity + 1))}
              disabled={quantity >= availableQuantity}
              className="w-14 h-14 bg-[#4a6d3a] text-white shadow-lg disabled:opacity-30 rounded-2xl flex items-center justify-center active:scale-90"
            >
              <Plus className="w-7 h-7" strokeWidth={3} />
            </button>
          </div>
          <p className="text-[11px] font-bold text-center text-[#a3b19b] mt-4 uppercase">
            Omborda: {availableQuantity} {product.unit}
          </p>
        </div>

        {/* Footer: Jami va Tasdiqlash */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-[#a3b19b] mb-0.5 uppercase tracking-wider">Jami summa</p>
            <p className="text-2xl font-black text-[#2d3429]">
              {totalPrice.toLocaleString()} <span className="text-xs">so'm</span>
            </p>
          </div>
          <button
            onClick={() => { onOrder(quantity); onClose(); }}
            className="flex-[1.5] py-5 bg-[#4a6d3a] hover:bg-[#2d3429] text-white rounded-[1.8rem] font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-[#4a6d3a]/30 active:scale-95 transition-all"
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );
}
