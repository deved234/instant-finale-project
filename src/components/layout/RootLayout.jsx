import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "../ui/Toast";
import CartDrawer from "../ui/CartDrawer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toast />
      <CartDrawer />
    </div>
  );
};

export default RootLayout;
