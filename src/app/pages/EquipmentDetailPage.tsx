import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { MapPin, Star, Shield, Calendar, ArrowLeft, User, Loader2, Building2, Send, CheckCircle, Phone } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { getAllEquipment, saveRentalRequest } from "../utils/equipmentData";
import { useAuth } from "../contexts/AuthContext";

import { useLanguage } from "../contexts/LanguageContext";

export function EquipmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hours, setHours] = useState(4);
  const [equipment, setEquipment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const userMeta = user?.user_metadata || {};
  const userName: string = userMeta.name || userMeta.full_name || user?.email?.split("@")[0] || "Farmer";
  const userPhone: string = userMeta.phone || "";

  useEffect(() => {
    if (!id) return;
    async function load() {
      const all = await getAllEquipment();
      const found = all.find(e => e.id === parseInt(id!));
      if (found) setEquipment(found);
    }
    load();
  }, [id]);

  const handleRequestBooking = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!equipment || !user) return;

    setIsRequesting(true);

    const selectedDate = date ? date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "TBD";
    const priceNum = parseInt(equipment.price.replace(/[^\d]/g, "")) || 0;
    const total = `₹${priceNum * hours}`;

    const { error } = await saveRentalRequest({
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      equipmentImage: equipment.image,
      requesterEmail: user.email || "",
      requesterName: userName,
      requesterPhone: userPhone,
      ownerEmail: equipment.ownerEmail || "admin@hasiru.in",
      ownerName: equipment.ownerName || "CHC Admin",
      date: selectedDate,
      hours,
      totalPrice: total,
    }, user.id);

    setIsRequesting(false);
    if (!error) setRequestSent(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 bg-background">
        <h2 className="text-2xl font-bold mb-4">{t('equipmentDetail.notFound')}</h2>
        <Link to="/discover" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> {t('equipmentDetail.backToListings')}
        </Link>
      </div>
    );
  }

  const details = {
    rating: 4.8,
    reviews: 24,
    images: [
      equipment.image || "https://images.unsplash.com/photo-1739066483931-b9d218fe50b8?fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1758636528604-a8b3d3824157?fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1685335686020-e0b487f7f426?fit=crop&w=1080&q=80"
    ],
    description: `Well-maintained ${equipment.name}, perfect for plowing, tilling, and general farm work. Regularly serviced and in excellent working condition. Comes with standard attachments.`,
    specifications: {
      [t('equipmentDetail.enginePower')]: "42 HP",
      [t('equipmentDetail.fuelType')]: "Diesel",
      [t('equipmentDetail.year')]: "2021",
      [t('equipmentDetail.condition')]: "Excellent",
      [t('equipmentDetail.hoursUsed')]: "850 hours",
      [t('equipmentDetail.transmission')]: "8 Forward + 2 Reverse"
    },
  };

  const priceNum = parseInt(equipment.price.replace(/[^\d]/g, "")) || 0;
  const totalPrice = `₹${priceNum * hours}`;

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/discover" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('equipmentDetail.backToListings')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                <ImageWithFallback src={details.images[selectedImage]} alt={equipment.name} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {details.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-[4/3] rounded-xl overflow-hidden ${selectedImage === index ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"} transition-all`}
                  >
                    <ImageWithFallback src={image} alt={`${equipment.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">{t('equipmentDetail.aboutEquipment')}</h2>
              <p className="text-muted-foreground leading-relaxed">{details.description}</p>
            </div>

            {/* Specifications */}
            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">{t('equipmentDetail.specifications')}</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(details.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-border pb-3">
                    <p className="text-sm text-muted-foreground mb-1">{key}</p>
                    <p className="font-medium text-foreground">{value as string}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">{t('equipmentDetail.ownerTitle')}</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">
                    {(equipment.ownerName || "C")[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{equipment.ownerName || "CHC Admin"}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      <span>4.9</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span>{t('equipmentDetail.chcCenter')}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <User className="w-3 h-3" /> {t('equipmentDetail.verifiedOwner')}
                  </p>
                  {equipment.ownerPhone && (
                    <a
                      href={`tel:${equipment.ownerPhone}`}
                      className="inline-flex items-center gap-2 mt-2 text-sm text-primary hover:underline font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      {equipment.ownerPhone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column – Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-card rounded-2xl p-6 shadow-lg">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-foreground">{equipment.price}</span>
                  <span className="text-muted-foreground">{t('discovery.perHour')}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="font-medium">{details.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({details.reviews} {t('equipmentDetail.reviews')})</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-4 h-4" />
                  <span>{equipment.distance}</span>
                </div>

                {/* Hours selector */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground block mb-2">{t('equipmentDetail.durationHours')}</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setHours(h => Math.max(1, h - 1))}
                      className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 font-bold text-lg flex items-center justify-center"
                    >–</button>
                    <span className="text-2xl font-bold w-8 text-center">{hours}</span>
                    <button
                      onClick={() => setHours(h => Math.min(24, h + 1))}
                      className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 font-bold text-lg flex items-center justify-center"
                    >+</button>
                    <span className="text-muted-foreground text-sm ml-1">= <span className="font-bold text-foreground">{totalPrice}</span></span>
                  </div>
                </div>
                {/* Calendar */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {t('equipmentDetail.selectDate')}
                  </h3>
                  <div className="bg-background rounded-xl p-2 border border-border/50">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md"
                    />
                  </div>
                </div>

                <div className="mb-6 flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                    {t('equipmentDetail.agreeTo')} <button type="button" className="text-primary hover:underline">{t('equipmentDetail.termsAndConditions')}</button> {t('equipmentDetail.rentingEquipment')}.
                  </label>
                </div>

                {requestSent ? (
                  <div className="w-full bg-green-100 text-green-800 py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {t('equipmentDetail.requestSent')}
                  </div>
                ) : (
                  <button
                    onClick={handleRequestBooking}
                    disabled={isRequesting || !acceptedTerms}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-70 disabled:grayscale flex items-center justify-center gap-2"
                  >
                    {isRequesting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> {t('equipmentDetail.sendingRequest')}</>
                    ) : (
                      <><Send className="w-5 h-5" /> {t('equipmentDetail.requestBooking')}</>
                    )}
                  </button>
                )}

                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>{t('equipmentDetail.insured')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{t('equipmentDetail.verifiedOwner')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
