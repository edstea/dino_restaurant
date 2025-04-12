import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReservationForm from "./ReservationForm";
import ReservationInfo from "./ReservationInfo";
import StaffManagement from "./StaffManagement";
import { TimeSlotCapacity } from "./types";

// Mock capacity data - in a real app, this would come from a database
const timeSlotCapacity: TimeSlotCapacity = {
  "17:00": { capacity: 20, booked: 5 },
  "17:30": { capacity: 20, booked: 8 },
  "18:00": { capacity: 20, booked: 15 },
  "18:30": { capacity: 20, booked: 20 }, // This one is full
  "19:00": { capacity: 20, booked: 12 },
  "19:30": { capacity: 20, booked: 10 },
  "20:00": { capacity: 20, booked: 7 },
  "20:30": { capacity: 20, booked: 4 },
  "21:00": { capacity: 20, booked: 2 },
};

const Reservation = () => {
  const [isStaffView, setIsStaffView] = useState(false);

  return (
    <section id="reservations" className="py-20 bg-restaurant-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title text-white">Make a Reservation</h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Reserve your table now for an unforgettable dining experience. We
            look forward to serving you.
          </p>
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              className={`mr-2 ${
                !isStaffView
                  ? "bg-restaurant-gold text-white"
                  : "bg-transparent text-white"
              }`}
              onClick={() => setIsStaffView(false)}
            >
              Customer View
            </Button>
            <Button
              variant="outline"
              className={`ml-2 ${
                isStaffView
                  ? "bg-restaurant-gold text-white"
                  : "bg-transparent text-white"
              }`}
              onClick={() => setIsStaffView(true)}
            >
              Staff View
            </Button>
          </div>
        </div>

        {!isStaffView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-restaurant-brown/20 p-8 rounded-lg">
              <h3 className="font-playfair text-2xl mb-6 text-restaurant-gold">
                Reservation Details
              </h3>
              <ReservationForm timeSlotCapacity={timeSlotCapacity} />
            </div>
            <ReservationInfo />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <StaffManagement timeSlotCapacity={timeSlotCapacity} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Reservation;
