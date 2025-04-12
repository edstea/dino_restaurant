import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    alt: "Restaurant interior",
    category: "interior",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    alt: "Fine dining setup",
    category: "interior",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    alt: "Signature dish",
    category: "food",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1560053608-13721e0d69e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    alt: "Chef preparing dish",
    category: "chef",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    alt: "Restaurant bar",
    category: "interior",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    alt: "Dessert plate",
    category: "food",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1574936145840-28808d77a0b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    alt: "Cocktail preparation",
    category: "drinks",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    alt: "Restaurant patio",
    category: "interior",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Gallery</h2>
          <p className="text-restaurant-dark/80 max-w-3xl mx-auto">
            Take a visual journey through our elegant space, exquisite dishes,
            and memorable moments.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-4 mb-10">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={`${
              filter === "all"
                ? "bg-restaurant-gold hover:bg-restaurant-gold/90 text-white"
                : "border-restaurant-gold text-restaurant-gold hover:bg-restaurant-gold/10"
            }`}
          >
            All
          </Button>
          <Button
            variant={filter === "interior" ? "default" : "outline"}
            onClick={() => setFilter("interior")}
            className={`${
              filter === "interior"
                ? "bg-restaurant-gold hover:bg-restaurant-gold/90 text-white"
                : "border-restaurant-gold text-restaurant-gold hover:bg-restaurant-gold/10"
            }`}
          >
            Interior
          </Button>
          <Button
            variant={filter === "food" ? "default" : "outline"}
            onClick={() => setFilter("food")}
            className={`${
              filter === "food"
                ? "bg-restaurant-gold hover:bg-restaurant-gold/90 text-white"
                : "border-restaurant-gold text-restaurant-gold hover:bg-restaurant-gold/10"
            }`}
          >
            Food
          </Button>
          <Button
            variant={filter === "chef" ? "default" : "outline"}
            onClick={() => setFilter("chef")}
            className={`${
              filter === "chef"
                ? "bg-restaurant-gold hover:bg-restaurant-gold/90 text-white"
                : "border-restaurant-gold text-restaurant-gold hover:bg-restaurant-gold/10"
            }`}
          >
            Chef
          </Button>
          <Button
            variant={filter === "drinks" ? "default" : "outline"}
            onClick={() => setFilter("drinks")}
            className={`${
              filter === "drinks"
                ? "bg-restaurant-gold hover:bg-restaurant-gold/90 text-white"
                : "border-restaurant-gold text-restaurant-gold hover:bg-restaurant-gold/10"
            }`}
          >
            Drinks
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg group cursor-pointer hover:shadow-xl transition duration-300"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white font-playfair text-lg">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl bg-transparent border-0 shadow-none">
          <img
            src={selectedImage || ""}
            alt="Gallery view"
            className="w-full h-auto object-contain"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
