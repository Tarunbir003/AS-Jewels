import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok, FaShoppingBag, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#770523] text-[#F4E3C3] py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
        
        {/* Left Section - Branding */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-[#E1B879]">AS Jewelers</h2>
          <p className="italic text-[#F4E3C3] mt-2">Elegance in Every Detail.</p>
          <div className="mt-5 flex space-x-4">
            <a href="#" className="text-[#F4E3C3] hover:text-[#E1B879] transition"><FaFacebookF size={22} /></a>
            <a href="#" className="text-[#F4E3C3] hover:text-[#E1B879] transition"><FaInstagram size={22} /></a>
            <a href="#" className="text-[#F4E3C3] hover:text-[#E1B879] transition"><FaTwitter size={22} /></a>
            <a href="#" className="text-[#F4E3C3] hover:text-[#E1B879] transition"><FaTiktok size={22} /></a>
          </div>
        </div>

        {/* Center Section - Quick Links & Support */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E1B879]">Quick Links</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <FaShoppingBag className="text-[#E1B879]" />
                <a href="/shop" className="hover:text-[#E1B879] transition">Shop</a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[#E1B879]" />
                <a href="/about" className="hover:text-[#E1B879] transition">About Us</a>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-[#E1B879]" />
                <a href="/contact" className="hover:text-[#E1B879] transition">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E1B879]">Customer Support</h3>
            <ul className="space-y-3">
              <li><a href="/shipping" className="hover:text-[#E1B879] transition">Shipping & Returns</a></li>
              <li><a href="/privacy" className="hover:text-[#E1B879] transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[#E1B879] transition">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>

        
    
    </footer>
  );
};

export default Footer;
