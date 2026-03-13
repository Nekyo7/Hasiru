import { Calendar, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const myEquipment = [
  {
    id: 1,
    name: "Mahindra 475 DI",
    image: "https://images.unsplash.com/photo-1739066483931-b9d218fe50b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWhpbmRyYSUyMHRyYWN0b3IlMjBpbmRpYXxlbnwxfHx8fDE3NzMzODkzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    bookings: 12,
    earnings: "₹6,600"
  },
  {
    id: 2,
    name: "Seed Drill Planter",
    image: "https://images.unsplash.com/photo-1764277434161-23d72931335f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkaW5nJTIwZXF1aXBtZW50JTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzczMzg5MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    bookings: 8,
    earnings: "₹3,600"
  }
];

const upcomingRentals = [
  {
    id: 1,
    equipment: "Mahindra 475 DI",
    renter: "Amit Singh",
    date: "March 15, 2026",
    duration: "4 hours",
    amount: "₹2,200"
  },
  {
    id: 2,
    equipment: "Seed Drill Planter",
    renter: "Priya Sharma",
    date: "March 17, 2026",
    duration: "6 hours",
    amount: "₹2,700"
  }
];

const bookingRequests = [
  {
    id: 1,
    equipment: "Mahindra 475 DI",
    requester: "Rahul Verma",
    date: "March 20, 2026",
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1719154718540-8ef3d94e7712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdCUyMHNtaWxpbmd8ZW58MXx8fHwxNzczMzA5MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function DashboardPage() {
  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage your equipment and bookings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Earnings</p>
            <p className="text-3xl font-bold">₹10,200</p>
            <p className="text-xs opacity-75 mt-2">+15% from last month</p>
          </div>

          <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-6 text-secondary-foreground">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Bookings</p>
            <p className="text-3xl font-bold">20</p>
            <p className="text-xs opacity-75 mt-2">This month</p>
          </div>

          <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-6 text-accent-foreground">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">Active Rentals</p>
            <p className="text-3xl font-bold">2</p>
            <p className="text-xs opacity-75 mt-2">Currently rented</p>
          </div>

          <div className="bg-gradient-to-br from-[#8B9A87] to-[#6b7a67] rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">Equipment Listed</p>
            <p className="text-3xl font-bold">2</p>
            <p className="text-xs opacity-75 mt-2">Available for rent</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Equipment */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-6">My Equipment</h2>
              <div className="space-y-4">
                {myEquipment.map((equipment) => (
                  <div key={equipment.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={equipment.image}
                        alt={equipment.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{equipment.name}</h3>
                      <p className="text-sm text-muted-foreground">Booked {equipment.bookings} times this month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{equipment.earnings}</p>
                      <p className="text-xs text-muted-foreground">earned</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-6">Upcoming Rentals</h2>
              <div className="space-y-3">
                {upcomingRentals.map((rental) => (
                  <div key={rental.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary transition-colors">
                    <div>
                      <h3 className="font-semibold">{rental.equipment}</h3>
                      <p className="text-sm text-muted-foreground">Rented to {rental.renter}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {rental.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rental.duration}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{rental.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Requests */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6">Booking Requests</h2>
              <div className="space-y-4">
                {bookingRequests.map((request) => (
                  <div key={request.id} className="border border-border rounded-xl p-4 hover:border-secondary transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={request.image}
                          alt={request.requester}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{request.requester}</h3>
                        <p className="text-xs text-muted-foreground">wants to rent</p>
                      </div>
                    </div>
                    <p className="font-medium text-sm mb-1">{request.equipment}</p>
                    <div className="text-xs text-muted-foreground mb-4">
                      <p>{request.date}</p>
                      <p>{request.duration}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
                        Accept
                      </button>
                      <button className="flex-1 bg-muted text-foreground py-2 rounded-lg text-sm hover:bg-muted/80 transition-colors">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
