import { useState } from "react";
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
import ReservationTable from "../ReservationTable";
import { TimeSlotCapacity } from "./types";

interface StaffManagementProps {
  timeSlotCapacity: TimeSlotCapacity;
}

const StaffManagement = ({ timeSlotCapacity }: StaffManagementProps) => {
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

  const [staffPassword, setStaffPassword] = useState("");
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false);
  const [isReportView, setIsReportView] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
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

  if (!isStaffAuthenticated) {
    return (
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
    );
  }

  return (
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
                onValueChange={(value) => handleSelectChange("time", value)}
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
  );
};

export default StaffManagement;
