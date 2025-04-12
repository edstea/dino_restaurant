import {
  Phone,
  Clock,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-restaurant-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Contact Us</h2>
          <p className="text-restaurant-dark/80 max-w-3xl mx-auto">
            We'd love to hear from you. Reach out with any questions or
            feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="font-playfair text-2xl mb-6 text-restaurant-dark">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-restaurant-gold rounded-full p-2 text-white">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-restaurant-dark">
                      Location
                    </h4>
                    <p className="text-restaurant-dark/70">
                      123 Culinary Street, Gourmet City, GC 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-restaurant-gold rounded-full p-2 text-white">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-restaurant-dark">Phone</h4>
                    <p className="text-restaurant-dark/70">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-restaurant-gold rounded-full p-2 text-white">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-restaurant-dark">Email</h4>
                    <p className="text-restaurant-dark/70">
                      info@dinarestaurant.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-restaurant-gold rounded-full p-2 text-white">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-restaurant-dark">Hours</h4>
                    <p className="text-restaurant-dark/70">
                      Mon-Thu: 11AM-10PM
                      <br />
                      Fri-Sat: 11AM-11PM
                      <br />
                      Sun: 12PM-9PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-restaurant-dark mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-restaurant-gold hover:bg-restaurant-brown text-white rounded-full p-3 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-restaurant-gold hover:bg-restaurant-brown text-white rounded-full p-3 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-restaurant-gold hover:bg-restaurant-brown text-white rounded-full p-3 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="h-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15831228695!2d-74.11976389828738!3d40.697403441789756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1618354929535!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen={false}
                loading="lazy"
                title="Restaurant location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
