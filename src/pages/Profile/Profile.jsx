import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, MapPin, Package, Award, Calendar, CheckCircle2, ChevronRight, Edit3 } from "lucide-react";
import useAuthStore from "../../store/authStore";
import useOrderStore from "../../store/orderStore";
import useToastStore from "../../store/toastStore";
import { syncUserToApi, fetchAuthUserByEmail } from "../../api/users";
import { getOrdersForUser } from "../../api/orders";

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const { orders } = useOrderStore();
  const replaceOrders = useOrderStore((state) => state.replaceOrders);
  const showToast = useToastStore((state) => state.showToast);

  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [street, setStreet] = useState(user?.address?.street || "1280 Boutique Avenue, Suite 402");
  const [city, setCity] = useState(user?.address?.city || "Manhattan, NY");
  const [zipCode, setZipCode] = useState(user?.address?.zipCode || "10012");
  const [country, setCountry] = useState(user?.address?.country || "United States");

  useEffect(() => {
    if (!user?.email) return;

    const hydrateFromApi = async () => {
      try {
        const apiUser = await fetchAuthUserByEmail(user.email);
        if (!apiUser) return;

        const needsSync =
          !user.id ||
          (apiUser.address &&
            JSON.stringify(apiUser.address) !== JSON.stringify(user.address));

        if (needsSync) {
          updateUser({ ...user, ...apiUser });
        }
      } catch {
        // keep local session if API is unavailable
      }
    };

    hydrateFromApi();
  }, [user?.email]);

  useEffect(() => {
    if (!user?.email) return;

    const loadOrders = async () => {
      setIsLoadingOrders(true);
      try {
        const apiOrders = await getOrdersForUser(user);
        if (apiOrders.length > 0) {
          replaceOrders(apiOrders);
        }
      } catch {
        // keep orders from localStorage if API fails
      } finally {
        setIsLoadingOrders(false);
      }
    };

    loadOrders();
  }, [user?.email, user?.id]);

  useEffect(() => {
    if (!user?.address) return;
    setStreet(user.address.street || "");
    setCity(user.address.city || "");
    setZipCode(user.address.zipCode || "");
    setCountry(user.address.country || "");
  }, [user?.address]);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    const address = { street, city, zipCode, country };

    setIsSavingAddress(true);
    try {
      updateUser({ address });

      const result = await syncUserToApi(
        { ...user, name: user?.name, email: user?.email },
        { address },
      );

      if (result.user) {
        updateUser(result.user);
      }

      if (result.localOnly) {
        showToast(
          "Could not find your account on the server. Please sign out and sign in again.",
          "error",
        );
        return;
      }

      showToast("Address saved successfully.");
      setIsEditingAddress(false);
    } catch {
      showToast("Could not sync address. Saved locally only.", "error");
      setIsEditingAddress(false);
    } finally {
      setIsSavingAddress(false);
    }
  };

  // Membership calculation
  const totalSpend = orders.reduce((acc, order) => acc + order.total, 0);
  
  let membershipTier = "Bronze Member";
  let tierColor = "text-amber-700 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-500 border-amber-250";
  if (totalSpend >= 1500) {
    membershipTier = "Platinum VIP Member";
    tierColor = "text-purple-700 bg-purple-50 dark:bg-purple-950/20 dark:text-purple-400 border-purple-250";
  } else if (totalSpend >= 500) {
    membershipTier = "Gold Member";
    tierColor = "text-yellow-700 bg-yellow-50 dark:bg-yellow-950/20 dark:text-yellow-400 border-yellow-250";
  } else if (totalSpend >= 100) {
    membershipTier = "Silver Member";
    tierColor = "text-slate-700 bg-slate-50 dark:bg-slate-900/40 dark:text-slate-400 border-slate-350";
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 dark:text-slate-100 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Profile Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-850 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <div className="w-20 h-20 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center border border-blue-100 dark:border-slate-700">
              <User className="w-10 h-10 text-blue-700 dark:text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-50">{user?.name || "Premium Member"}</h1>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{user?.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tierColor}`}>
                  {membershipTier}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-8 border-t md:border-t-0 md:border-l border-gray-100 dark:border-slate-800 pt-6 md:pt-0 md:pl-12 w-full md:w-auto justify-around md:justify-start">
            <div className="text-center md:text-left">
              <p className="text-[10px] uppercase font-semibold tracking-widest text-gray-400">Total Orders</p>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-slate-50 mt-1">{orders.length}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] uppercase font-semibold tracking-widest text-gray-400">Total Spend</p>
              <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-500 mt-1">${totalSpend.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left panel: Info & Address */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-850 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <h2 className="text-sm font-bold text-gray-950 dark:text-slate-100 uppercase tracking-wider">Shipping Address</h2>
                </div>
                {!isEditingAddress && (
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="text-xs text-blue-700 dark:text-blue-400 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                )}
              </div>

              {isEditingAddress ? (
                <form onSubmit={handleSaveAddress} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-semibold text-gray-400 uppercase">Street Address</label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full text-xs bg-gray-50 dark:bg-slate-800 rounded-lg px-3 py-2 border-none outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-gray-400 uppercase">City & State</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs bg-gray-50 dark:bg-slate-800 rounded-lg px-3 py-2 border-none outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-semibold text-gray-400 uppercase">Postal Code</label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full text-xs bg-gray-50 dark:bg-slate-800 rounded-lg px-3 py-2 border-none outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-gray-400 uppercase">Country</label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full text-xs bg-gray-50 dark:bg-slate-800 rounded-lg px-3 py-2 border-none outline-none focus:ring-1 focus:ring-blue-700 mt-1 text-gray-800 dark:text-slate-100"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={isSavingAddress}
                      className="flex-1 bg-blue-700 dark:bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-blue-800 disabled:opacity-60"
                    >
                      {isSavingAddress ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(false)}
                      className="flex-1 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 text-xs font-semibold py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  <p className="font-bold text-gray-800 dark:text-slate-200">{user?.name}</p>
                  <p>{street}</p>
                  <p>{city}, {zipCode}</p>
                  <p>{country}</p>
                </div>
              )}
            </div>

            {/* Premium Rewards Card */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 dark:from-slate-900 dark:to-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award className="w-32 h-32" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400">Luxe Membership</h3>
              <p className="text-2xl font-extrabold mt-3">{membershipTier}</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Enjoy early access to drops, complimentary express shipping, and exclusive member-only pricing campaigns.
              </p>
              <div className="border-t border-slate-800/80 mt-6 pt-4 flex justify-between items-center text-xs">
                <span className="text-slate-400">Spend more to unlock Gold tier:</span>
                <span className="font-bold text-blue-400">${Math.max(0, 500 - totalSpend)} remaining</span>
              </div>
            </div>
          </div>

          {/* Right panel: Order History */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-850 shadow-xs">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
                <Package className="w-4 h-4 text-gray-400" />
                <h2 className="text-sm font-bold text-gray-950 dark:text-slate-100 uppercase tracking-wider">Order History</h2>
              </div>

              {isLoadingOrders ? (
                <div className="text-center py-16">
                  <p className="text-sm text-gray-400 dark:text-slate-500">
                    Loading your orders...
                  </p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-12 h-12 bg-gray-55 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-gray-300 dark:text-slate-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-slate-100">No orders placed yet</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-550 mt-1 max-w-[220px] mx-auto leading-relaxed">
                    Check out our new Arrivals and place your first order.
                  </p>
                  <Link
                    to="/shop"
                    className="inline-block mt-4 bg-blue-700 dark:bg-blue-600 text-white text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Browse Shop
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div 
                      key={order.orderNumber}
                      className="border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs hover:border-gray-200 dark:hover:border-slate-750 transition-colors"
                    >
                      {/* Order Header info */}
                      <div className="bg-gray-50 dark:bg-slate-900/60 px-5 py-4 border-b border-gray-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-2">
                        <div className="flex items-center gap-4 text-xs">
                          <div>
                            <p className="text-[10px] text-gray-450 dark:text-gray-500 uppercase font-semibold">Order Number</p>
                            <p className="font-bold text-blue-750 dark:text-blue-400 mt-0.5">{order.orderNumber}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-450 dark:text-gray-500 uppercase font-semibold">Date Placed</p>
                            <p className="font-semibold text-gray-800 dark:text-slate-350 mt-0.5">{formatDate(order.createdAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-950/20 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            {order.status}
                          </span>
                          <span className="text-sm font-bold text-gray-900 dark:text-slate-50">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Items loop */}
                      <div className="px-5 py-4 divide-y divide-gray-100 dark:divide-slate-800/50">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-md overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0 text-xs">
                              <h4 className="font-semibold text-gray-900 dark:text-slate-100 truncate">{item.title}</h4>
                              <p className="text-[10px] text-gray-400 mt-0.5">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right flex-shrink-0 text-xs font-semibold text-gray-900 dark:text-slate-100">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
