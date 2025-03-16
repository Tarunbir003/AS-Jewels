import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Products from "./components/App/Products";
import Cart from "./components/App/Cart";
import Homepage from "./components/App/Homepage";
import Footer from "./components/App/Footer";
import Header from "./components/App/Header";
import AboutJewelryMaster from "./components/App/About";
import AdminRegister from "./components/Auth/AdminReg";
import UserProfile from "./components/App/Profile";
import CheckoutForm from "./components/App/CheckoutForm";
import ThankYou from "./components/App/ThankYou";
import JewelryCustomization from "./components/App/JewelleryCustomization";
import Admin from "./components/Admin/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatBot from "./components/Chatbot/ChatBot";
import MetalPrices from "./components/App/MetalInvestPage";
import ProductPage from "./components/App/ProductPage";
import PaymentSuccess from "./components/App/PaymentSuccess";
import PaymentCancel from "./components/App/PaymentCancel";

function AppLayout() {
  const location = useLocation();

  // Hide Header, Footer, and ChatBot on specific routes
  const hideHeaderFooter = ["/login", "/register", "/adminreg"].includes(location.pathname);

  return (
    <>
      {/* Render Header only if not on login/register/adminreg pages */}
      {!hideHeaderFooter && <Header />}

      <div>
        {/* Render ChatBot only if not on login/register/adminreg pages */}
        {!hideHeaderFooter && <ChatBot />}

        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminreg" element={<AdminRegister />} />

          {/* Main Pages */}
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutJewelryMaster />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/jewellery-customization" element={<JewelryCustomization />} />
          <Route path="/metal-prices" element={<MetalPrices />} />

          {/* Product Details Route */}
          <Route path="/product/:id" element={<ProductPage />} />

          {/* Admin Route (Protected) */}
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
        </Routes>
      </div>

      {/* Render Footer only if not on login/register/adminreg pages */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

// Wrap AppLayout with Router to provide routing context
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
