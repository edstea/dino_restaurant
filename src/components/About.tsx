import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              alt="Restaurant interior"
              className="w-full h-[400px] md:h-[600px] object-cover rounded-lg"
            />
            <div className="hidden md:block absolute -bottom-8 -right-8 w-64 h-64 bg-restaurant-gold/10 rounded-lg -z-10"></div>
          </div>

          <div>
            <h2 className="section-title">About Dina Restaurant</h2>
            <p className="text-restaurant-dark/80 mb-6">
              Welcome to Dina Restaurant, where culinary excellence meets warm
              hospitality. Established in 2010, we have been serving memorable
              dining experiences with a focus on locally-sourced ingredients and
              traditional recipes with a modern twist.
            </p>
            <p className="text-restaurant-dark/80 mb-6">
              Our passionate team of chefs, led by Executive Chef Michael
              Roberts, crafts each dish with meticulous attention to detail,
              ensuring a perfect balance of flavors that will delight your
              palate.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-l-4 border-restaurant-gold pl-4">
                <h3 className="font-playfair text-xl font-bold text-restaurant-dark mb-2">
                  Our Mission
                </h3>
                <p className="text-restaurant-dark/80 text-sm">
                  To create exceptional dining experiences through extraordinary
                  food, genuine hospitality, and attention to detail.
                </p>
              </div>
              <div className="border-l-4 border-restaurant-gold pl-4">
                <h3 className="font-playfair text-xl font-bold text-restaurant-dark mb-2">
                  Our Vision
                </h3>
                <p className="text-restaurant-dark/80 text-sm">
                  To be the most beloved restaurant in the city, recognized for
                  our culinary creativity and unparalleled service.
                </p>
              </div>
            </div>

            <Button className="btn-primary">Discover Our Story</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
