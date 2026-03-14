import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router";
import { User, Phone, MapPin, Building2, Star, Package, Clock, CheckCircle, XCircle, ArrowRight, Tractor } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { getSelectedCHC } from "../utils/auth";
import {
  getEquipmentByOwner,
  getRequestsByRequester,
  getRequestsForOwner,
  updateRequestStatus,
  RentalRequest,
  Equipment
} from "../utils/equipmentData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [myEquipment, setMyEquipment] = useState<Equipment[]>([]);
  const [sentRequests, setSentRequests] = useState<RentalRequest[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<RentalRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"equipment" | "sent" | "received">("equipment");
  const [selectedCHC, setSelectedCHC] = useState<string>("–");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const userMeta = user?.user_metadata || {};
  const userName: string = userMeta.name || userMeta.full_name || user?.email?.split("@")[0] || t('equipmentDetail.farmer');
  const userEmail: string = user?.email || "";
  const userPhone: string = userMeta.phone || "–";
  const userAddress: string = userMeta.address || "–";

  const initials = userName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    if (!userEmail) return;
    async function load() {
      const [equip, sent, received] = await Promise.all([
        getEquipmentByOwner(userEmail),
        getRequestsByRequester(userEmail),
        getRequestsForOwner(userEmail),
      ]);
      setMyEquipment(equip);
      setSentRequests(sent);
      setReceivedRequests(received);
    }
    load();
    const chc = getSelectedCHC();
    if (chc) setSelectedCHC(chc.name);
    
    setEditForm({
      name: userMeta.name || userMeta.full_name || "",
      phone: userMeta.phone || "",
      address: userMeta.address || ""
    });
  }, [userEmail, userMeta.name, userMeta.full_name, userMeta.phone, userMeta.address]);

  const handleSaveProfile = async () => {
    const { error } = await supabase.auth.updateUser({
      data: {
        name: editForm.name,
        phone: editForm.phone,
        address: editForm.address
      }
    });
    if (!error) setIsEditing(false);
  };

  const handleUpdateStatus = (id: string, status: "accepted" | "declined") => {
    updateRequestStatus(id, status);
    setReceivedRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      declined: "bg-red-100 text-red-800"
    };
    
    // Translate status labels
    const statusLabel = t(`dashboard.status.${status}`);

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${map[status] ?? ""}`}>
        {statusLabel}
      </span>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t('profile.pleaseLogin')}</h2>
          <Link to="/login" className="text-primary hover:underline">{t('profile.signinToView')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-primary to-primary/70 rounded-3xl p-8 mb-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <Tractor className="w-64 h-64 -mr-16 -mt-16" />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-bold text-white">{initials}</span>
            </div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    className="text-3xl font-bold bg-white/10 border-none rounded-lg px-2 w-full text-white placeholder:text-white/30"
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      className="bg-white/10 border-none rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30"
                      placeholder={t('auth.phoneNumber')}
                      value={editForm.phone}
                      onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                    <input
                      className="bg-white/10 border-none rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30"
                      placeholder={t('auth.address')}
                      value={editForm.address}
                      onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleSaveProfile} className="bg-white text-primary px-4 py-2 rounded-xl text-sm font-bold">{t('profile.saveChanges')}</button>
                    <button onClick={() => setIsEditing(false)} className="bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold">{t('profile.cancel')}</button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold mb-1">{userName}</h1>
                  <p className="text-white/80 text-sm mb-4">{userEmail}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
                      <Phone className="w-4 h-4" />
                      <span>{userPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{userAddress || "–"}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
                      <Building2 className="w-4 h-4" />
                      <span>{t('chccenters.cardPrefix')}{selectedCHC}</span>
                    </div>
                  </div>
                  <button onClick={() => setIsEditing(true)} className="mt-4 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
                    {t('profile.editContact')}
                  </button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="flex sm:flex-col gap-4 sm:gap-2 sm:items-end">
              <div className="text-center sm:text-right">
                <p className="text-3xl font-bold">{myEquipment.length}</p>
                <p className="text-xs text-white/70">{t('profile.listed')}</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-3xl font-bold">{receivedRequests.filter(r => r.status === "pending").length}</p>
                <p className="text-xs text-white/70">{t('profile.pending')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-card rounded-2xl p-1.5 border border-border">
          {[
            { key: "equipment", label: t('profile.myEquipment'), icon: Package, count: myEquipment.length },
            { key: "received", label: t('profile.requestsReceived'), icon: Star, count: receivedRequests.filter(r => r.status === "pending").length },
            { key: "sent", label: t('profile.requestsSent'), icon: Clock, count: sentRequests.length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count > 0 && (
                <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                  activeTab === tab.key ? "bg-white/20" : "bg-primary/10 text-primary"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab: My Equipment */}
        {activeTab === "equipment" && (
          <div>
            {myEquipment.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('profile.noEquipListed')}</h3>
                <p className="text-muted-foreground mb-6">{t('profile.shareMachinery')}</p>
                <Link
                  to="/list-equipment"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  {t('profile.listFirstMachine')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myEquipment.map(eq => (
                  <div key={eq.id} className="bg-card rounded-2xl overflow-hidden border border-border flex">
                    <div className="w-1/3 aspect-square overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={eq.image}
                        alt={eq.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t(`discovery.types.${eq.category?.toLowerCase()}`) || eq.category}</span>
                      <h3 className="font-semibold mt-1 mb-1">{eq.name}</h3>
                      <p className="text-sm font-bold text-primary">{eq.price}<span className="text-muted-foreground font-normal">/{t('dashboard.hr')}</span></p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" /> {t('profile.available')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Requests Received */}
        {activeTab === "received" && (
          <div className="space-y-4">
            {receivedRequests.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <Star className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('profile.noRequestsYet')}</h3>
                <p className="text-muted-foreground">{t('profile.farmersWillSend')}</p>
              </div>
            ) : (
              receivedRequests.map(req => (
                <div key={req.id} className="bg-card rounded-2xl p-5 border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{req.equipmentName}</h3>
                      <p className="text-sm text-muted-foreground">{t('profile.requestedBy')} <span className="font-medium text-foreground">{req.requesterName}</span></p>
                      {req.requesterPhone && (
                        <a
                          href={`tel:${req.requesterPhone}`}
                          className="inline-flex items-center gap-1.5 mt-1 text-sm text-primary hover:underline font-medium"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {req.requesterPhone}
                        </a>
                      )}
                    </div>
                    {statusBadge(req.status)}
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.date}</span>
                    <span>{req.hours} {t('dashboard.hours')}</span>
                    <span className="font-semibold text-foreground">{req.totalPrice}</span>
                  </div>
                  {req.status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdateStatus(req.id, "accepted")}
                        className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                      >
                        <CheckCircle className="w-4 h-4" /> {t('profile.accept')}
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(req.id, "declined")}
                        className="flex-1 flex items-center justify-center gap-2 bg-muted text-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors"
                      >
                        <XCircle className="w-4 h-4" /> {t('profile.decline')}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab: Requests Sent */}
        {activeTab === "sent" && (
          <div className="space-y-4">
            {sentRequests.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <Clock className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('profile.noRequestsSent')}</h3>
                <p className="text-muted-foreground mb-6">{t('profile.browseAndSend')}</p>
                <Link
                  to="/discover"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  {t('profile.browseEquipment')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              sentRequests.map(req => (
                <div key={req.id} className="bg-card rounded-2xl p-5 border border-border flex gap-4 items-start">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={req.equipmentImage}
                      alt={req.equipmentName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{req.equipmentName}</h3>
                      {statusBadge(req.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{t('profile.owner')}: <span className="font-medium text-foreground">{req.ownerName}</span></p>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.date}</span>
                      <span>{req.hours} {t('dashboard.hours')}</span>
                      <span className="font-bold text-foreground">{req.totalPrice}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
