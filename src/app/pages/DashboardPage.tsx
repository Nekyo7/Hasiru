import { useState, useEffect } from "react";
import { Calendar, TrendingUp, Clock, CheckCircle, Package, Bell, XCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";
import {
  getEquipmentByOwner,
  getRequestsForOwner,
  updateRequestStatus,
  RentalRequest,
  Equipment
} from "../utils/equipmentData";

export function DashboardPage() {
  const { user } = useAuth();
  const [myEquipment, setMyEquipment] = useState<Equipment[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<RentalRequest[]>([]);

  const userEmail = user?.email || "";

  useEffect(() => {
    if (!userEmail) return;
    setMyEquipment(getEquipmentByOwner(userEmail));
    setReceivedRequests(getRequestsForOwner(userEmail));
  }, [userEmail]);

  const pendingRequests = receivedRequests.filter(r => r.status === "pending");
  const acceptedRequests = receivedRequests.filter(r => r.status === "accepted");

  const handleUpdate = (id: string, status: "accepted" | "declined") => {
    updateRequestStatus(id, status);
    setReceivedRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      declined: "bg-red-100 text-red-800"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${map[status] ?? ""}`}>{status}</span>
    );
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage your equipment and booking requests</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Earnings</p>
            <p className="text-3xl font-bold">
              ₹{acceptedRequests.reduce((sum, r) => sum + parseInt(r.totalPrice.replace(/[^\d]/g, "") || "0"), 0).toLocaleString("en-IN")}
            </p>
            <p className="text-xs opacity-75 mt-2">From accepted requests</p>
          </div>

          <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-6 text-secondary-foreground">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">My Equipment</p>
            <p className="text-3xl font-bold">{myEquipment.length}</p>
            <p className="text-xs opacity-75 mt-2">Listed for rent</p>
          </div>

          <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-6 text-accent-foreground">
            <div className="flex items-center justify-between mb-4">
              <Bell className="w-8 h-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">Pending Requests</p>
            <p className="text-3xl font-bold">{pendingRequests.length}</p>
            <p className="text-xs opacity-75 mt-2">Awaiting your approval</p>
          </div>

          <div className="bg-gradient-to-br from-[#8B9A87] to-[#6b7a67] rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">Accepted Rentals</p>
            <p className="text-3xl font-bold">{acceptedRequests.length}</p>
            <p className="text-xs opacity-75 mt-2">Total confirmed</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Booking Requests */}
            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                Booking Requests
                {pendingRequests.length > 0 && (
                  <span className="bg-primary text-primary-foreground text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center">
                    {pendingRequests.length}
                  </span>
                )}
              </h2>

              {receivedRequests.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <Bell className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p>No booking requests yet. List your equipment to start receiving requests.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {receivedRequests.map(req => (
                    <div key={req.id} className="border border-border rounded-xl p-4 hover:border-primary/40 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{req.equipmentName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Requested by <span className="font-medium text-foreground">{req.requesterName}</span>
                          </p>
                        </div>
                        {statusBadge(req.status)}
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {req.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.hours} hours</span>
                        <span className="font-bold text-foreground">{req.totalPrice}</span>
                      </div>
                      {req.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdate(req.id, "accepted")}
                            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                          >
                            <CheckCircle className="w-4 h-4" /> Accept
                          </button>
                          <button
                            onClick={() => handleUpdate(req.id, "declined")}
                            className="flex-1 flex items-center justify-center gap-2 bg-muted text-foreground py-2 rounded-lg text-sm hover:bg-muted/80 transition-colors"
                          >
                            <XCircle className="w-4 h-4" /> Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Equipment */}
            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-6">My Equipment</h2>
              {myEquipment.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <Package className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p>No equipment listed yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myEquipment.map(equipment => (
                    <div key={equipment.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback src={equipment.image} alt={equipment.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{equipment.name}</h3>
                        <p className="text-sm text-muted-foreground">{equipment.category}</p>
                        <p className="text-sm text-primary font-semibold mt-1">{equipment.price}/hr</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">Available</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6">Quick Stats</h2>
              <div className="space-y-5">
                <div className="border-b border-border pb-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Pending Requests</p>
                  <p className="text-3xl font-bold text-primary">{pendingRequests.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Awaiting your decision</p>
                </div>
                <div className="border-b border-border pb-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Accepted</p>
                  <p className="text-3xl font-bold text-secondary">{acceptedRequests.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Confirmed rentals</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">My Listings</p>
                  <p className="text-3xl font-bold text-accent">{myEquipment.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Equipment available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
