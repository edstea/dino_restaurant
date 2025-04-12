import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
  status: "confirmed" | "pending" | "cancelled";
}

// Mock data for demonstration
const mockReservations: Reservation[] = [
  {
    id: "RES-001",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-123-4567",
    date: "2025-04-10",
    time: "19:00",
    guests: "2",
    message: "Anniversary dinner",
    status: "confirmed",
  },
  {
    id: "RES-002",
    name: "Emily Johnson",
    email: "emily@example.com",
    phone: "555-987-6543",
    date: "2025-04-10",
    time: "20:00",
    guests: "4",
    message: "Birthday celebration",
    status: "pending",
  },
  {
    id: "RES-003",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "555-456-7890",
    date: "2025-04-11",
    time: "18:30",
    guests: "6",
    message: "Business dinner",
    status: "confirmed",
  },
  {
    id: "RES-004",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "555-222-3333",
    date: "2025-04-12",
    time: "19:30",
    guests: "2",
    message: "",
    status: "cancelled",
  },
  {
    id: "RES-005",
    name: "David Lee",
    email: "david@example.com",
    phone: "555-888-9999",
    date: "2025-04-15",
    time: "20:30",
    guests: "3",
    message: "Requesting window seat",
    status: "confirmed",
  },
];

const ReservationTable = () => {
  const [reservations, setReservations] =
    useState<Reservation[]>(mockReservations);
  const [dateFilter, setDateFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showPermissionAlert, setShowPermissionAlert] = useState(false);

  const filteredReservations = reservations.filter((res) => {
    const matchesDate = dateFilter ? res.date === dateFilter : true;
    const matchesTime = timeFilter ? res.time === timeFilter : true;
    return matchesDate && matchesTime;
  });

  const handleClearFilters = () => {
    setDateFilter("");
    setTimeFilter("");
  };

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setNotificationsEnabled(true);
      setShowPermissionAlert(false);
      // Show a test notification
      new Notification("Dino Restaurant Staff Portal", {
        body: "You will now receive notifications for new reservations",
        icon: "/favicon.ico",
      });
    } else {
      setShowPermissionAlert(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="space-y-2 flex-1">
          <label
            htmlFor="dateFilter"
            className="text-sm font-medium text-white"
          >
            Filter by Date
          </label>
          <Input
            id="dateFilter"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white"
          />
        </div>
        <div className="space-y-2 flex-1">
          <label
            htmlFor="timeFilter"
            className="text-sm font-medium text-white"
          >
            Filter by Time
          </label>
          <Input
            id="timeFilter"
            type="time"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-white/10 border-restaurant-gold/30 focus:border-restaurant-gold text-white"
          />
        </div>
        <Button
          onClick={handleClearFilters}
          variant="outline"
          className="border-restaurant-gold/50 text-restaurant-gold hover:bg-restaurant-gold/20"
        >
          Clear Filters
        </Button>
      </div>

      {showPermissionAlert && (
        <Alert className="bg-amber-900/30 border-amber-600 text-white">
          <AlertTitle>Notification Permission Required</AlertTitle>
          <AlertDescription>
            Please enable notifications in your browser to receive reservation
            alerts.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-restaurant-gold">
          Reservation Report
        </h3>
        <Button
          onClick={requestNotificationPermission}
          variant="outline"
          className={`${
            notificationsEnabled
              ? "bg-green-700/30 border-green-600"
              : "border-restaurant-gold/50"
          } text-white`}
        >
          {notificationsEnabled
            ? "Notifications Enabled"
            : "Enable Notifications"}
        </Button>
      </div>

      <div className="bg-restaurant-brown/20 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-restaurant-brown/40">
            <TableRow>
              <TableHead className="text-restaurant-gold">ID</TableHead>
              <TableHead className="text-restaurant-gold">Name</TableHead>
              <TableHead className="text-restaurant-gold">Date</TableHead>
              <TableHead className="text-restaurant-gold">Time</TableHead>
              <TableHead className="text-restaurant-gold">Guests</TableHead>
              <TableHead className="text-restaurant-gold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.length > 0 ? (
              filteredReservations.map((reservation) => (
                <TableRow
                  key={reservation.id}
                  className="border-b border-restaurant-gold/10"
                >
                  <TableCell className="text-white">{reservation.id}</TableCell>
                  <TableCell className="text-white">
                    {reservation.name}
                  </TableCell>
                  <TableCell className="text-white">
                    {reservation.date}
                  </TableCell>
                  <TableCell className="text-white">
                    {reservation.time}
                  </TableCell>
                  <TableCell className="text-white">
                    {reservation.guests}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        reservation.status === "confirmed"
                          ? "bg-green-900/50 text-green-300"
                          : reservation.status === "pending"
                          ? "bg-yellow-900/50 text-yellow-300"
                          : "bg-red-900/50 text-red-300"
                      }`}
                    >
                      {reservation.status.charAt(0).toUpperCase() +
                        reservation.status.slice(1)}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-white/60 py-8"
                >
                  No reservations match the selected filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-white/70 text-sm">
        <p>Total Reservations: {filteredReservations.length}</p>
        <p>
          Note: In a production environment, this data would be fetched from
          your restaurant's database
        </p>
      </div>
    </div>
  );
};

export default ReservationTable;
