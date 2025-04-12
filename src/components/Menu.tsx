import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
  popular?: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    id: "starters",
    name: "Starters",
    items: [
      {
        name: "Bruschetta",
        description:
          "Grilled bread rubbed with garlic and topped with olive oil, salt, tomato, and basil",
        price: "$9.95",
        image:
          "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        popular: true,
      },
      {
        name: "Calamari Fritti",
        description: "Crispy fried calamari served with a zesty marinara sauce",
        price: "$12.95",
      },
      {
        name: "Caprese Salad",
        description:
          "Fresh mozzarella, tomatoes, and basil drizzled with olive oil and balsamic glaze",
        price: "$11.95",
      },
      {
        name: "Mushroom Arancini",
        description:
          "Crispy fried risotto balls with wild mushrooms and truffle oil",
        price: "$10.95",
      },
    ],
  },
  {
    id: "mains",
    name: "Main Courses",
    items: [
      {
        name: "Filet Mignon",
        description:
          "8oz prime beef tenderloin with red wine reduction, served with garlic mashed potatoes",
        price: "$34.95",
        image:
          "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
        popular: true,
      },
      {
        name: "Herb Crusted Salmon",
        description:
          "Atlantic salmon with a herb crust, lemon butter sauce, and seasonal vegetables",
        price: "$29.95",
      },
      {
        name: "Wild Mushroom Risotto",
        description:
          "Creamy arborio rice with wild mushrooms, truffle oil, and parmesan",
        price: "$24.95",
        popular: true,
      },
      {
        name: "Chicken Marsala",
        description:
          "Pan-seared chicken breast with marsala wine sauce, mushrooms, and roasted potatoes",
        price: "$26.95",
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      {
        name: "Tiramisu",
        description:
          "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
        price: "$9.95",
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
        popular: true,
      },
      {
        name: "Chocolate Fondant",
        description:
          "Warm chocolate cake with a molten center, served with vanilla ice cream",
        price: "$10.95",
      },
      {
        name: "Crème Brûlée",
        description: "Classic French dessert with a caramelized sugar crust",
        price: "$8.95",
      },
      {
        name: "Apple Tart",
        description:
          "Warm apple tart with cinnamon and caramel, served with ice cream",
        price: "$9.95",
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    items: [
      {
        name: "Signature Cocktails",
        description: "Ask your server about our seasonal signature cocktails",
        price: "from $12.95",
        image:
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      },
      {
        name: "Wine Selection",
        description:
          "Extensive wine list featuring local and international selections",
        price: "from $9.95/glass",
      },
      {
        name: "Craft Beers",
        description: "Rotating selection of local and imported craft beers",
        price: "from $7.95",
      },
      {
        name: "Premium Spirits",
        description: "Wide range of premium spirits and liqueurs",
        price: "from $10.95",
      },
    ],
  },
];

const Menu = () => {
  const [_activeCategory, setActiveCategory] = useState(menuCategories[0].id);

  return (
    <section id="menu" className="py-20 bg-restaurant-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Menu</h2>
          <p className="text-restaurant-dark/80 max-w-3xl mx-auto">
            Explore our carefully crafted menu featuring the finest ingredients
            and traditional recipes with a modern twist.
          </p>
        </div>

        <Tabs
          defaultValue={menuCategories[0].id}
          className="w-full max-w-5xl mx-auto"
        >
          <TabsList className="flex justify-center mb-12 bg-transparent">
            {menuCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-6 py-3 text-lg data-[state=active]:bg-restaurant-gold data-[state=active]:text-white"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.items
                  .filter((_item, index) => index % 2 === 0)
                  .map((item, idx) => (
                    <div
                      key={`${category.id}-left-${idx}`}
                      className="menu-item flex"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-full mr-4"
                        />
                      )}
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-playfair text-xl font-bold text-restaurant-dark">
                            {item.name}
                            {item.popular && (
                              <span className="ml-2 text-xs uppercase bg-restaurant-gold text-white px-2 py-0.5 rounded-full">
                                Popular
                              </span>
                            )}
                          </h3>
                          <span className="font-playfair text-xl font-bold text-restaurant-gold">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-restaurant-dark/70 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.items
                  .filter((_item, index) => index % 2 === 1)
                  .map((item, idx) => (
                    <div
                      key={`${category.id}-right-${idx}`}
                      className="menu-item flex"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-full mr-4"
                        />
                      )}
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-playfair text-xl font-bold text-restaurant-dark">
                            {item.name}
                            {item.popular && (
                              <span className="ml-2 text-xs uppercase bg-restaurant-gold text-white px-2 py-0.5 rounded-full">
                                Popular
                              </span>
                            )}
                          </h3>
                          <span className="font-playfair text-xl font-bold text-restaurant-gold">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-restaurant-dark/70 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <Button className="btn-primary px-8 py-3">Download Full Menu</Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
