import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShieldCheck, Truck, Lock, ArrowLeft, ArrowRight, CreditCard, MapPin } from "lucide-react";
import useCartStore from "../../store/cartStore";
import useOrderStore from "../../store/orderStore";
import useAuthStore from "../../store/authStore";

const Cart = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalPrice, 
    clearCart,
    activeDiscount,
    applyPromoCode,
    clearPromoCode,
    getDiscountAmount
  } = useCartStore();
  
  const createOrder = useOrderStore((state) => state.createOrder);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Step 0: Review, Step 1: Shipping, Step 2: Payment, Step 3: Confirmation
  const [step, setStep] = useState(0);

  // Promo Code State
  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState({ type: "", text: "" });

  // Shipping Form State
  const [shippingName, setShippingName] = useState(user?.name || "");
  const [shippingStreet, setShippingStreet] = useState(user?.address?.street || "");
  const [shippingCity, setShippingCity] = useState(user?.address?.city || "");
  const [shippingZip, setShippingZip] = useState(user?.address?.zipCode || "");
  const [shippingCountry, setShippingCountry] = useState(user?.address?.country || "");
  const [shippingErrors, setShippingErrors] = useState({});

  // Payment Form State
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [paymentErrors, setPaymentErrors] = useState({});

  // Price Calculations
  const subtotal = getTotalPrice();
  const discountAmount = getDiscountAmount();
  const finalSubtotal = Math.max(0, subtotal - discountAmount);
  // Shipping is $15 if below $150, free if above $150
  const shipping = finalSubtotal >= 150 ? 0 : 15;
  const tax = finalSubtotal * 0.08;
  const total = finalSubtotal + shipping + tax;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoMessage({ type: "", text: "" });
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoMessage({ type: "success", text: res.message });
      setPromoInput("");
    } else {
      setPromoMessage({ type: "error", text: res.message });
    }
  };

  const handleRemovePromo = () => {
    clearPromoCode();
    setPromoMessage({ type: "", text: "" });
  };

  // Shipping Form Validation
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!shippingName.trim()) errors.name = "Full name is required";
    if (!shippingStreet.trim()) errors.street = "Street address is required";
    if (!shippingCity.trim()) errors.city = "City & State is required";
    if (!shippingZip.trim()) errors.zip = "Postal code is required";
    if (!shippingCountry.trim()) errors.country = "Country is required";

    if (Object.keys(errors).length > 0) {
      setShippingErrors(errors);
      return;
    }

    setShippingErrors({});
    setStep(2);
  };

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  // Format Expiration Date (MM/YY)
  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardExpiry(value);
  };

  // Format CVV (max 3 or 4 digits)
  const handleCardCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setCardCvv(value);
  };

  // Payment Form Validation
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (cardNumber.replace(/\s/g, "").length < 16) errors.number = "Enter a valid 16-digit card number";
    if (!cardName.trim()) errors.name = "Cardholder name is required";
    if (cardExpiry.length < 5) errors.expiry = "Enter expiration date (MM/YY)";
    if (cardCvv.length < 3) errors.cvv = "Enter 3-digit CVV";

    if (Object.keys(errors).length > 0) {
      setPaymentErrors(errors);
      return;
    }

    setPaymentErrors({});
    setStep(3);
  };

  // Final Order placement
  const handlePlaceOrder = () => {
    createOrder({ items, subtotal: finalSubtotal, shipping, tax, total });
    clearCart();
    navigate("/order-confirmation");
  };

  const getCardType = (num) => {
    if (num.startsWith("4")) return "Visa";
    if (num.startsWith("5")) return "Mastercard";
    if (num.startsWith("3")) return "Amex";
    return "Credit Card";
  };

  if (items.length === 0 && step === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center dark:bg-slate-950 dark:text-slate-100">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/shop"
          className="bg-blue-700 dark:bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* Checkout Steps Tracker */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
          <button 
            disabled={step === 0}
            onClick={() => setStep(0)}
            className={`flex items-center gap-1.5 ${step >= 0 ? "text-blue-700 dark:text-blue-400 font-bold" : ""}`}
          >
            <span>01</span> Cart Review
          </button>
          <div className={`flex-1 h-px mx-4 bg-gray-250 dark:bg-slate-800 ${step > 0 ? "bg-blue-500" : ""}`} />
          <button 
            disabled={step < 1}
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 ${step >= 1 ? "text-blue-700 dark:text-blue-400 font-bold" : ""}`}
          >
            <span>02</span> Shipping
          </button>
          <div className={`flex-1 h-px mx-4 bg-gray-250 dark:bg-slate-800 ${step > 1 ? "bg-blue-500" : ""}`} />
          <button 
            disabled={step < 2}
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 ${step >= 2 ? "text-blue-700 dark:text-blue-400 font-bold" : ""}`}
          >
            <span>03</span> Payment
          </button>
          <div className={`flex-1 h-px mx-4 bg-gray-250 dark:bg-slate-800 ${step > 2 ? "bg-blue-500" : ""}`} />
          <span className={`flex items-center gap-1.5 ${step === 3 ? "text-blue-700 dark:text-blue-400 font-bold" : ""}`}>
            <span>04</span> Review
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* STEP 0: CART REVIEW */}
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Review Items</h2>
              {items.map((item) => (
                <div key={item.id} className="flex gap-5 pb-6 border-b border-gray-100 dark:border-slate-850">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 truncate">{item.title}</h3>
                        <p className="text-xs text-gray-400 capitalize mb-3">{item.category}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-slate-100">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 dark:border-slate-850 rounded-lg bg-white dark:bg-slate-900">
                        <button
                          onClick={() => item.quantity === 1 ? removeItem(item.id) : updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-55 dark:hover:bg-slate-800"
                        >
                          <Minus className="w-3 h-3 text-gray-500" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-gray-700 dark:text-slate-350">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-55 dark:hover:bg-slate-800"
                        >
                          <Plus className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 1: SHIPPING DETAILS */}
          {step === 1 && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-850">
              <h2 className="text-lg font-bold text-gray-900 dark:text-slate-50 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-700" /> Shipping Details
              </h2>
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    className="w-full text-xs bg-gray-55 dark:bg-slate-800 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100 border-none"
                  />
                  {shippingErrors.name && <p className="text-[10px] text-red-500 mt-1">{shippingErrors.name}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="1280 Boutique Avenue, Suite 402"
                    value={shippingStreet}
                    onChange={(e) => setShippingStreet(e.target.value)}
                    className="w-full text-xs bg-gray-55 dark:bg-slate-800 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100 border-none"
                  />
                  {shippingErrors.street && <p className="text-[10px] text-red-500 mt-1">{shippingErrors.street}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">City & State</label>
                  <input
                    type="text"
                    placeholder="Manhattan, NY"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="w-full text-xs bg-gray-55 dark:bg-slate-800 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100 border-none"
                  />
                  {shippingErrors.city && <p className="text-[10px] text-red-500 mt-1">{shippingErrors.city}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Postal Code</label>
                    <input
                      type="text"
                      placeholder="10012"
                      value={shippingZip}
                      onChange={(e) => setShippingZip(e.target.value)}
                      className="w-full text-xs bg-gray-55 dark:bg-slate-800 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100 border-none"
                    />
                    {shippingErrors.zip && <p className="text-[10px] text-red-500 mt-1">{shippingErrors.zip}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Country</label>
                    <input
                      type="text"
                      placeholder="United States"
                      value={shippingCountry}
                      onChange={(e) => setShippingCountry(e.target.value)}
                      className="w-full text-xs bg-gray-55 dark:bg-slate-800 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100 border-none"
                    />
                    {shippingErrors.country && <p className="text-[10px] text-red-500 mt-1">{shippingErrors.country}</p>}
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-100 dark:border-slate-800 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="flex-1 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 py-3.5 rounded-xl text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-700 dark:bg-blue-600 text-white py-3.5 rounded-xl text-xs font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 flex items-center justify-center gap-1 transition-colors"
                  >
                    Continue to Payment <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: PAYMENT DETAILS */}
          {step === 2 && (
            <div className="space-y-8">
              {/* Credit Card Graphic 3D visualizer */}
              <div className="perspective-1000 w-full max-w-sm mx-auto h-48">
                <div 
                  className="relative w-full h-full rounded-2xl shadow-xl transition-transform duration-700 [transform-style:preserve-3d]"
                  style={{ transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 p-6 flex flex-col justify-between text-white [backface-visibility:hidden]">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-400">LuxeRetail Pay</span>
                      <span className="text-xs font-black italic">{getCardType(cardNumber)}</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 tracking-wider">Card Number</p>
                      <p className="text-xl font-bold tracking-widest mt-1">
                        {cardNumber || "•••• •••• •••• ••••"}
                      </p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Cardholder</p>
                        <p className="text-xs font-semibold truncate max-w-[150px]">{cardName || "JANE DOE"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-slate-400 uppercase">Expires</p>
                        <p className="text-xs font-semibold">{cardExpiry || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 p-6 flex flex-col justify-between text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="w-full h-10 bg-slate-950 absolute left-0 top-6" />
                    <div className="mt-12 flex justify-end">
                      <div className="text-right">
                        <p className="text-[9px] text-slate-400 uppercase">CVV</p>
                        <p className="bg-white text-slate-900 px-3 py-1 rounded font-bold text-xs tracking-wider mt-1 inline-block">
                          {cardCvv || "•••"}
                        </p>
                      </div>
                    </div>
                    <p className="text-[8px] text-slate-500 leading-relaxed">
                      This card is security encrypted and for visual simulation purposes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-855">
                <h2 className="text-lg font-bold text-gray-900 dark:text-slate-50 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-700" /> Payment Details
                </h2>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      onFocus={() => setIsCardFlipped(false)}
                      className="w-full text-xs bg-gray-55 dark:bg-slate-800 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100 border-none"
                    />
                    {paymentErrors.number && <p className="text-[10px] text-red-500 mt-1">{paymentErrors.number}</p>}
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      onFocus={() => setIsCardFlipped(false)}
                      className="w-full text-xs bg-gray-55 dark:bg-slate-800 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100 border-none"
                    />
                    {paymentErrors.name && <p className="text-[10px] text-red-500 mt-1">{paymentErrors.name}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Expiration Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleCardExpiryChange}
                        onFocus={() => setIsCardFlipped(false)}
                        className="w-full text-xs bg-gray-55 dark:bg-slate-800 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100 border-none"
                      />
                      {paymentErrors.expiry && <p className="text-[10px] text-red-500 mt-1">{paymentErrors.expiry}</p>}
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">CVV Security Code</label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={cardCvv}
                        onChange={handleCardCvvChange}
                        onFocus={() => setIsCardFlipped(true)}
                        onBlur={() => setIsCardFlipped(false)}
                        className="w-full text-xs bg-gray-55 dark:bg-slate-800 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100 border-none"
                      />
                      {paymentErrors.cvv && <p className="text-[10px] text-red-500 mt-1">{paymentErrors.cvv}</p>}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-gray-100 dark:border-slate-800 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-350 py-3.5 rounded-xl text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Shipping
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-700 dark:bg-blue-600 text-white py-3.5 rounded-xl text-xs font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 flex items-center justify-center gap-1 transition-colors"
                    >
                      Review Order <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER REVIEW */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Review & Confirm</h2>
              
              {/* Shipping Review card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-850">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Shipping Details</h3>
                <div className="text-xs space-y-1 text-gray-700 dark:text-slate-300">
                  <p className="font-bold text-gray-900 dark:text-slate-50">{shippingName}</p>
                  <p>{shippingStreet}</p>
                  <p>{shippingCity}, {shippingZip}</p>
                  <p>{shippingCountry}</p>
                </div>
              </div>

              {/* Payment Review card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-850">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Payment Details</h3>
                <div className="flex items-center gap-3 text-xs text-gray-700 dark:text-slate-300">
                  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                    <CreditCard className="w-5 h-5 text-gray-650" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-slate-50">{getCardType(cardNumber)}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Ending in {cardNumber.slice(-4)}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-350 py-3.5 rounded-xl text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Payment
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-green-600 dark:bg-green-700 text-white py-3.5 rounded-xl text-xs font-semibold hover:bg-green-700 dark:hover:bg-green-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  Place Order & Pay
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar Column */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-850 rounded-2xl p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-slate-50 mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-slate-100">${subtotal.toFixed(2)}</span>
              </div>
              
              {activeDiscount && (
                <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                  <span>Promo ({activeDiscount.code})</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Estimated Shipping</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Tax</span>
                <span className="font-medium text-gray-900 dark:text-slate-100">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-gray-100 dark:border-slate-800 mb-6">
              <div>
                <p className="font-bold text-gray-900 dark:text-slate-50">Total</p>
                <p className="text-[10px] text-gray-400">Including VAT & Delivery</p>
              </div>
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Step 0 Action button (proceed to step 1) */}
            {step === 0 && (
              <button
                onClick={() => setStep(1)}
                className="w-full bg-blue-700 dark:bg-blue-600 text-white py-4 rounded-xl text-sm font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors mb-4 flex items-center justify-center gap-1.5"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Promo Code Input (Only visible in Cart Review step 0) */}
            {step === 0 && (
              <div className="border-t border-gray-100 dark:border-slate-800 pt-6 mt-6">
                {activeDiscount ? (
                  <div className="flex items-center justify-between border border-green-100 dark:border-green-950/60 bg-green-50/50 dark:bg-green-950/10 rounded-xl p-4">
                    <div className="text-xs">
                      <p className="font-bold text-green-700 dark:text-green-400">Code {activeDiscount.code} Active</p>
                      <p className="text-gray-400 mt-0.5">Applied discount amount: ${discountAmount.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={handleRemovePromo}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo}>
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">Apply Promo Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="LUXE10 or SAVE50"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="flex-1 bg-gray-55 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-blue-700 text-gray-800 dark:text-slate-100 border-none"
                      />
                      <button 
                        type="submit"
                        className="bg-gray-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold px-4 rounded-xl hover:bg-black transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage.text && (
                      <p className={`text-[10px] mt-2 font-medium ${promoMessage.type === "success" ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                        {promoMessage.text}
                      </p>
                    )}
                  </form>
                )}
                <p className="text-[9px] text-gray-400 mt-2">
                  * LUXE15 (10% off), SAVE50 ($50 off for orders over $200).
                </p>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
              {[
                { icon: <ShieldCheck className="w-5 h-5" />, label: "WARRANTY" },
                { icon: <Truck className="w-5 h-5" />, label: "SHIPPING" },
                { icon: <Lock className="w-5 h-5" />, label: "SECURE" },
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 text-center">
                  <div className="text-gray-400">{badge.icon}</div>
                  <span className="text-[9px] text-gray-400">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
