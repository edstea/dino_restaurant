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
import ReservationTable from "./ReservationTable";

// Mock capacity data - in a real app, this would come from a database
const timeSlotCapacity: Record<string, { capacity: number; booked: number }> = {
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    message: "",
    reservationCode: "",
  });

  const [isStaffView, setIsStaffView] = useState(false);
  const [staffPassword, setStaffPassword] = useState("");
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false);
  const [isCapacityWarning, setIsCapacityWarning] = useState(false);
  const [isReportView, setIsReportView] = useState(false);

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
      reservationCode: "",
    });
  };

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is just for demonstration - in a real app, you'd verify this securely on a server
    if (staffPassword === "restaurant123") {
      setIsStaffAuthenticated(true);
      toast.success("Staff authenticated successfully!", {
        duration: 3000,
      });
    } else {
      toast.error("Invalid staff password", {
        duration: 3000,
      });
    }
  };

  const handleReservationChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Modifying reservation:", formData.reservationCode);
    toast.success("Reservation updated successfully!", {
      duration: 5000,
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      message: "",
      reservationCode: "",
    });
  };

  const handleReservationCancel = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cancelling reservation:", formData.reservationCode);
    toast.success("Reservation cancelled successfully!", {
      duration: 5000,
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      message: "",
      reservationCode: "",
    });
  };

  const toggleReportView = () => {
    setIsReportView(!isReportView);
  };

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
                      onValueChange={(value) =>
                        handleSelectChange("guests", value)
                      }
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
                      onValueChange={(value) =>
                        handleSelectChange("time", value)
                      }
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
                            const almostFull =
                              capacity - booked <= 3 && !isFullyBooked;
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
                        This time slot has limited availability. Please select
                        another time or call us directly.
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
                    Note: Reservations can only be modified or cancelled by
                    restaurant staff. Please contact us directly for any
                    changes.
                  </p>
                </div>

                <Button type="submit" className="w-full btn-primary py-3">
                  Request Reservation
                </Button>
              </form>
            </div>

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
                  For large parties, private events, special occasions, or
                  reservation changes, please contact us directly at{" "}
                  <span className="text-restaurant-gold">
                    +1 (555) 123-4567
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {!isStaffAuthenticated ? (
              <div className="bg-restaurant-brown/20 p-8 rounded-lg">
                <h3 className="font-playfair text-2xl mb-6 text-restaurant-gold">
                  Staff Authentication
                </h3>
                <form onSubmit={handleStaffLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="staffPassword" className="text-white">
                      Staff Password
                    </Label>
                    <Input
                      id="staffPassword"
                      type="password"
                      placeholder="Enter staff password"
                      value={staffPassword}
                      onChange={(e) => setStaffPassword(e.target.value)}
                      required
                      className="bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white"
                    />
                    <p className="text-xs text-white/60 italic">
                      For demo purposes, use: restaurant123
                    </p>
                  </div>
                  <Button type="submit" className="w-full btn-primary py-3">
                    Login
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <Button
                    variant="outline"
                    className={`${
                      !isReportView
                        ? "bg-restaurant-gold text-white"
                        : "bg-transparent text-white"
                    }`}
                    onClick={() => setIsReportView(false)}
                  >
                    Manage Reservations
                  </Button>
                  <Button
                    variant="outline"
                    className={`${
                      isReportView
                        ? "bg-restaurant-gold text-white"
                        : "bg-transparent text-white"
                    }`}
                    onClick={() => setIsReportView(true)}
                  >
                    Reservation Report
                  </Button>
                </div>

                {isReportView ? (
                  <ReservationTable />
                ) : (
                  <div className="bg-restaurant-brown/20 p-8 rounded-lg">
                    <h3 className="font-playfair text-2xl mb-6 text-restaurant-gold">
                      Reservation Management
                    </h3>
                    <p className="mb-4 text-white/80">
                      As staff, you can modify or cancel existing reservations.
                    </p>

                    <div className="mb-6">
                      <Label htmlFor="reservationCode" className="text-white">
                        Reservation Code
                      </Label>
                      <Input
                        id="reservationCode"
                        name="reservationCode"
                        placeholder="Enter reservation code"
                        value={formData.reservationCode}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-white">
                          New Date (Optional)
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-white">
                          New Time (Optional)
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleSelectChange("time", value)
                          }
                          value={formData.time}
                        >
                          <SelectTrigger className="bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(timeSlotCapacity).map(
                              ([time, { capacity, booked }]) => {
                                const isFullyBooked = capacity <= booked;
                                const almostFull =
                                  capacity - booked <= 3 && !isFullyBooked;
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
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <Label htmlFor="guests" className="text-white">
                        New Guest Count (Optional)
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("guests", value)
                        }
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

                    <div className="flex justify-between">
                      <Button
                        onClick={handleReservationChange}
                        className="btn-primary py-3 px-6"
                        disabled={!formData.reservationCode}
                      >
                        Update Reservation
                      </Button>
                      <Button
                        onClick={handleReservationCancel}
                        variant="destructive"
                        className="py-3 px-6"
                        disabled={!formData.reservationCode}
                      >
                        Cancel Reservation
                      </Button>
                    </div>

                    <Button
                      className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white"
                      onClick={() => {
                        setIsStaffAuthenticated(false);
                        setStaffPassword("");
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Reservation;
