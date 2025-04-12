import React from "react";

const ReservationInfo = () => {
  return (
    <div className="flex flex-col justify-center">
      <h3 className="font-playfair text-2xl mb-6 text-restaurant-gold">
        Opening Hours
      </h3>

      <div className="space-y-6">
        <div className="flex justify-between pb-4 border-b border-restaurant-gold/30">
          <span className="font-medium">Monday - Thursday</span>
          <span>11:00 AM - 10:00 PM</span>
        </div>
        <div className="flex justify-between pb-4 border-b border-restaurant-gold/30">
          <span className="font-medium">Friday - Saturday</span>
          <span>11:00 AM - 11:00 PM</span>
        </div>
        <div className="flex justify-between pb-4 border-b border-restaurant-gold/30">
          <span className="font-medium">Sunday</span>
          <span>12:00 PM - 9:00 PM</span>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-restaurant-gold font-medium mb-3">
          Reservation Policy
        </p>
        <ul className="list-disc list-inside text-white/80 space-y-2">
          <li>Reservations recommended for dinner service</li>
          <li>For parties of 6 or more, please call directly</li>
          <li>Please notify us of any dietary restrictions</li>
          <li>Children welcome with supervision</li>
          <li>Smart casual dress code, no sportswear</li>
          <li>Only staff can modify or cancel reservations</li>
        </ul>
      </div>

      <div className="mt-10">
        <p className="text-white/80">
          For large parties, private events, special occasions, or reservation
          changes, please contact us directly at{" "}
          <span className="text-restaurant-gold">+1 (555) 123-4567</span>
        </p>
      </div>
    </div>
  );
};

export default ReservationInfo;
