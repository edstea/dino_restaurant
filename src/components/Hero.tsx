import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80")',
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-restaurant-gold uppercase tracking-widest mb-4 animate-fade-in">
          Welcome to Dino Restaurant
        </p>
        <h1
          className="font-playfair text-5xl md:text-7xl font-bold mb-6 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Fine Dining Experience
        </h1>
        <p
          className="max-w-2xl mx-auto text-lg mb-8 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Indulge in a culinary journey with our exquisite menu crafted with the
          finest ingredients
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            className="btn-primary px-8 py-3"
            onClick={() =>
              document
                .getElementById("menu")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Our Menu
          </Button>
          <Button
            variant="outline"
            className="border-2 border-white text-restaurant-gold hover:bg-white hover:text-restaurant-dark px-8 py-3 transition-colors duration-300"
            onClick={() =>
              document
                .getElementById("reservations")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Make a Reservation
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-center">
        <a
          href="#about"
          className="text-white/80 hover:text-white flex flex-col items-center"
        >
          <span className="mb-2">Scroll Down</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
