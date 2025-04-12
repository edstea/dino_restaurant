import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { TimeSlotCapacity } from "./types";

interface ReservationFormProps {
  timeSlotCapacity: TimeSlotCapacity;
}

const ReservationForm = ({ timeSlotCapacity }: ReservationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  });

  const [isCapacityWarning, setIsCapacityWarning] = useState(false);

  useEffect(() => {
    // Reset capacity warning if time changes
    setIsCapacityWarning(false);
  }, [formData.time]);

  // Check if the selected time slot is at or near capacity
  const checkTimeSlotCapacity = (time: string) => {
    if (!time || !timeSlotCapacity[time])
      return { isAvailable: true, remainingSeats: 0 };

    const slot = timeSlotCapacity[time];
    const requestedGuests = parseInt(formData.guests) || 1;
    const remainingSeats = slot.capacity - slot.booked;

    return {
      isAvailable: remainingSeats >= requestedGuests,
      remainingSeats,
    };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });

    // Check capacity when time or guests change
    if (name === "time" || name === "guests") {
      const { isAvailable, remainingSeats } = checkTimeSlotCapacity(
        formData.time
      );

      if (formData.time && !isAvailable) {
        setIsCapacityWarning(true);
        toast.warning(
          `Limited availability! Only ${remainingSeats} seats left for this time.`,
          {
            duration: 5000,
          }
        );
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final capacity check before submission
    const { isAvailable, remainingSeats } = checkTimeSlotCapacity(
      formData.time
    );

    if (!isAvailable) {
      toast.error(
        `We're sorry, but this time slot is at capacity. Please select another time or contact us directly.`,
        {
          duration: 7000,
        }
      );
      return;
    }

    // In a real app, this would send the data to a server
    console.log("Reservation data:", formData);

    // Show notification to staff (if enabled)
    if (window.Notification && Notification.permission === "granted") {
      new Notification("New Reservation Request", {
        body: `${formData.name} - ${formData.date} at ${formData.time} - ${formData.guests} guests`,
        icon: "/favicon.ico",
      });
    }

    toast.success(
      "Reservation request submitted! We will contact you shortly to confirm.",
      {
        duration: 5000,
      }
    );

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="guests" className="text-white">
            Number of Guests
          </Label>
          <Select
            onValueChange={(value) => handleSelectChange("guests", value)}
            value={formData.guests}
          >
            <SelectTrigger className="bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Person</SelectItem>
              <SelectItem value="2">2 People</SelectItem>
              <SelectItem value="3">3 People</SelectItem>
              <SelectItem value="4">4 People</SelectItem>
              <SelectItem value="5">5 People</SelectItem>
              <SelectItem value="6">6 People</SelectItem>
              <SelectItem value="7+">7+ People</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-white">
            Date
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time" className="text-white">
            Time
          </Label>
          <Select
            onValueChange={(value) => handleSelectChange("time", value)}
            value={formData.time}
          >
            <SelectTrigger
              className={`bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white ${
                isCapacityWarning ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(timeSlotCapacity).map(
                ([time, { capacity, booked }]) => {
                  const isFullyBooked = capacity <= booked;
                  const almostFull = capacity - booked <= 3 && !isFullyBooked;
                  let displayTime = "";

                  // Convert 24h to 12h format
                  const [hour, minute] = time.split(":");
                  const hourNum = parseInt(hour);
                  displayTime = `${
                    hourNum > 12 ? hourNum - 12 : hourNum
                  }:${minute} ${hourNum >= 12 ? "PM" : "AM"}`;

                  if (isFullyBooked) {
                    displayTime += " (Fully Booked)";
                  } else if (almostFull) {
                    displayTime += ` (${capacity - booked} left)`;
                  }

                  return (
                    <SelectItem
                      key={time}
                      value={time}
                      disabled={isFullyBooked}
                      className={
                        isFullyBooked
                          ? "text-gray-400"
                          : almostFull
                          ? "text-amber-500"
                          : ""
                      }
                    >
                      {displayTime}
                    </SelectItem>
                  );
                }
              )}
            </SelectContent>
          </Select>
          {isCapacityWarning && (
            <p className="text-red-400 text-xs mt-1">
              This time slot has limited availability. Please select another
              time or call us directly.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white">
          Special Requests
        </Label>
        <textarea
          id="message"
          name="message"
          placeholder="Any special requests or dietary requirements?"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-white/10 border border-restaurant-gold/30 focus:border-restaurant-gold rounded-md p-2 text-white"
        />
      </div>

      <div className="pt-4 text-white/80 text-sm">
        <p>
          Note: Reservations can only be modified or cancelled by restaurant
          staff. Please contact us directly for any changes.
        </p>
      </div>

      <Button type="submit" className="w-full btn-primary py-3">
        Request Reservation
      </Button>
    </form>
  );
};

export default ReservationForm;
