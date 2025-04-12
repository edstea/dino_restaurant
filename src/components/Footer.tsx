import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-restaurant-dark text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-playfair font-bold text-restaurant-gold mb-6">
              Dino Restaurant
            </h3>
            <p className="text-white/70 mb-6">
              Experience the finest culinary journey with our exquisite dishes
              prepared by our talented chefs. Visit us today for an
              unforgettable dining experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-restaurant-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-restaurant-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-restaurant-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-playfair font-bold mb-6">
              Contact Info
            </h3>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-restaurant-gold" />
                <span>123 Culinary Street, Gourmet City, GC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-restaurant-gold" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-restaurant-gold" />
                <span>info@dinorestaurant.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-playfair font-bold mb-6">
              Opening Hours
            </h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex justify-between">
                <span>Monday - Thursday</span>
                <span>11:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>Friday - Saturday</span>
                <span>11:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 - 21:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-playfair font-bold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <a
                  href="#home"
                  className="hover:text-restaurant-gold transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-restaurant-gold transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="hover:text-restaurant-gold transition-colors"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-restaurant-gold transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#reservations"
                  className="hover:text-restaurant-gold transition-colors"
                >
                  Reservations
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-restaurant-gold transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">
            &copy; {currentYear} Dino Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
