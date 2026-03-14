import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { MapPin, Star, Shield, Calendar, ArrowLeft, User, Loader2, Building2, Send, CheckCircle, Phone, XCircle, MessageSquare, Star as StarSolid } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { getAllEquipment, saveRentalRequest, getEquipmentReviews, addEquipmentReview, type EquipmentReview } from "../utils/equipmentData";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Review states
  const [reviews, setReviews] = useState<EquipmentReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const userMeta = user?.user_metadata || {};
  const userName: string = userMeta.name || userMeta.full_name || user?.email?.split("@")[0] || "Farmer";
  const userPhone: string = userMeta.phone || "";

  useEffect(() => {
    if (!id) return;
    async function loadData() {
      setIsLoading(true);
      const all = await getAllEquipment();
      const found = all.find(e => e.id === parseInt(id!));
      if (found) {
        setEquipment(found);
        // Load reviews
        const reviewData = await getEquipmentReviews(found.id);
        setReviews(reviewData);
      }
      setIsLoading(false);
      setIsLoadingReviews(false);
    }
    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  const handlePostReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id || !equipment) return;
    
    setIsSubmittingReview(true);
    const { error } = await addEquipmentReview({
      equipmentId: equipment.id,
      userId: user.id,
      userName: userName,
      rating: newReview.rating,
      comment: newReview.comment,
    });

    if (!error) {
      setNewReview({ rating: 5, comment: "" });
      const updatedReviews = await getEquipmentReviews(equipment.id);
      setReviews(updatedReviews);
    } else {
      setSubmitError("Failed to post review: " + error);
    }
    setIsSubmittingReview(false);
  };

  const handleRequestBooking = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!equipment || !user) return;

    setSubmitError(null);
    setIsRequesting(true);

    try {
      const selectedDate = date ? date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "TBD";
      const priceVal = parseInt(equipment.price.replace(/[^\d]/g, "")) || 0;
      const total = `₹${priceVal * hours}`;

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

      if (error) {
        setSubmitError(error);
      } else {
        setRequestSent(true);
      }
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsRequesting(false);
    }
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
                  {equipment.ownerPhone ? (
                    <a
                      href={`tel:${equipment.ownerPhone}`}
                      className="inline-flex items-center gap-2 mt-2 text-sm text-primary hover:underline font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      {equipment.ownerPhone}
                    </a>
                  ) : (
                    <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100 inline-block">
                      Contact info available after booking
                    </div>
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

                {/* Terms and Conditions */}
                <div className={`mb-6 p-4 rounded-xl border-2 transition-all ${acceptedTerms ? "border-green-500/30 bg-green-50/50" : "border-amber-500/30 bg-amber-50/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]"}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-primary/30 text-primary focus:ring-primary cursor-pointer accent-primary"
                    />
                    <label htmlFor="terms" className="text-sm font-medium text-foreground leading-snug cursor-pointer select-none">
                      {t('equipmentDetail.agreeTo')} <button onClick={() => setShowTermsModal(true)} type="button" className="text-primary font-bold hover:underline underline-offset-4 decoration-2">{t('equipmentDetail.termsAndConditions')}</button> {t('equipmentDetail.rentingEquipment')}.
                    </label>
                  </div>
                  {!acceptedTerms && (
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <p className="text-[10px] text-amber-700 uppercase tracking-wider font-extrabold">Requirement: Accept terms to book</p>
                    </div>
                  )}
                </div>

                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl flex items-center gap-2 animate-in slide-in-from-top-1">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {requestSent ? (
                  <div className="w-full bg-green-100 text-green-800 py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {t('equipmentDetail.requestSent')}
                  </div>
                ) : (
                  <button
                    onClick={handleRequestBooking}
                    disabled={isRequesting || !acceptedTerms}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-70 disabled:grayscale flex items-center justify-center gap-2 relative overflow-hidden group"
                  >
                    {isRequesting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> {t('equipmentDetail.sendingRequest')}</>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                        {t('equipmentDetail.requestBooking')}
                      </>
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

        {/* Reviews Section */}
        <div className="mt-12 pt-12 border-t border-border">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
              <p className="text-sm text-muted-foreground">{reviews.length} total reviews</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Review List */}
            <div className="lg:col-span-2 space-y-6">
              {isLoadingReviews ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : reviews.length === 0 ? (
                <div className="bg-muted/30 rounded-2xl p-12 text-center">
                  <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="bg-card rounded-2xl p-6 border border-border/50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold">{review.userName}</h4>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <StarSolid
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating ? "text-amber-400 fill-amber-400" : "text-muted/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Leave a Review Form */}
            <div className="lg:col-span-1">
              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Leave a Review</h3>
                {isAuthenticated ? (
                  <form onSubmit={handlePostReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: num })}
                            className="focus:outline-none transition-transform active:scale-90"
                          >
                            <StarSolid
                              className={`w-8 h-8 ${
                                num <= newReview.rating ? "text-amber-400 fill-amber-400" : "text-muted"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Comment</label>
                      <textarea
                        required
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none resize-none text-sm"
                        placeholder="Share your experience with this equipment..."
                        rows={4}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmittingReview ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post Review"}
                    </button>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">Please log in to leave a review.</p>
                    <Link
                      to="/login"
                      className="inline-block w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-border animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Rental Terms & Conditions</h3>
                <p className="text-sm text-muted-foreground">Please read before booking</p>
              </div>
            </div>
            
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 text-sm text-muted-foreground leading-relaxed custom-scrollbar">
              <div className="space-y-4">
                <p>1. <strong>General:</strong> By requesting to rent equipment through the Smart CHC Network platform, the user agrees to follow all rules and conditions set by the Custom Hiring Center (CHC) and the platform.</p>
                <p>2. <strong>User Information:</strong> The user must provide correct details including name, phone number, email, and address. Providing false information may lead to cancellation of the request.</p>
                <p>3. <strong>Availability of Equipment:</strong> All equipment is subject to availability at the selected CHC. Submitting a request does not guarantee confirmation until the CHC approves the booking.</p>
                <p>4. <strong>Rental Duration:</strong> The user must return the equipment within the approved rental time. Late return may result in extra charges decided by the CHC.</p>
                <p>5. <strong>Usage Responsibility:</strong> The user must use the equipment only for agricultural purposes. Any damage caused due to misuse will be the responsibility of the user.</p>
                <p>6. <strong>Damage and Loss:</strong> If equipment is damaged, lost, or returned in poor condition, the user may be required to pay repair or replacement cost as decided by the CHC operator.</p>
                <p>7. <strong>Payment:</strong> Rental charges will be decided based on machine type, duration, and CHC rules. Payment may be collected at the CHC or during delivery.</p>
                <p>8. <strong>Cancellation:</strong> The CHC has the right to cancel or reschedule the booking if equipment is not available or due to operational reasons.</p>
                <p>9. <strong>Contact with CHC:</strong> The user may contact the selected CHC for help, schedule changes, or support.</p>
                <p>10. <strong>Platform Role:</strong> Smart CHC Network is a digital platform that connects users with Custom Hiring Centers. The platform is not responsible for physical damage, delays, or disputes between user and CHC.</p>
                <p>11. <strong>Acceptance:</strong> By clicking "Agree and Request", the user confirms that they have read and accepted all terms and conditions.</p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => { setAcceptedTerms(true); setShowTermsModal(false); }}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                I Accept These Terms
              </button>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="flex-1 bg-muted text-foreground py-3 rounded-xl font-bold hover:bg-muted/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
