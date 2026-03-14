import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, X, MapPin, IndianRupee, Store, CheckCircle2 } from "lucide-react";
import { CHC_CENTERS } from "../utils/auth";
import { saveUserEquipment } from "../utils/equipmentData";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export function ListEquipmentPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const userMeta = user?.user_metadata || {};
  const ownerName: string = userMeta.name || userMeta.full_name || user?.email?.split("@")[0] || "Farmer";
  const ownerEmail: string = user?.email || "";
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    chc: "",
    location: "",
    price: "",
    description: ""
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to local storage
    saveUserEquipment({
      name: formData.name,
      image: images[0] || "https://images.unsplash.com/photo-1592982537447-7440770cbdi?fit=crop&q=80&w=800",
      category: formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
      price: `₹${formData.price}`,
      brand: "User Listed",
      model_number: "N/A",
      type: formData.description.slice(0, 30),
      chc_id: parseInt(formData.chc),
      ownerName,
      ownerEmail,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/discover");
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('listEquipment.title')}</h1>
          <p className="text-lg text-muted-foreground">{t('listEquipment.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Equipment Photos */}
          <div className="bg-card rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">{t('listEquipment.photosTitle')}</h2>
            <p className="text-sm text-muted-foreground mb-4">{t('listEquipment.photosDesc')}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                  <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <label className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">{t('listEquipment.upload')}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Target CHC Section */}
          <div className="bg-card rounded-2xl p-6 space-y-6 border-2 border-primary/20 bg-primary/5">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Store className="w-6 h-6 text-primary" />
              {t('listEquipment.targetChcTitle')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('listEquipment.targetChcDesc')}</p>

            <div>
              <label className="block text-sm font-medium mb-2">{t('listEquipment.selectChcLabel')}</label>
              <select
                required
                value={formData.chc}
                onChange={(e) => setFormData({ ...formData, chc: e.target.value })}
                className="w-full px-4 py-3 bg-input-background rounded-xl border border-primary/30 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">{t('listEquipment.selectCenterOpt')}</option>
                {CHC_CENTERS.map(chc => (
                  <option key={chc.id} value={chc.id}>CHC – {chc.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Equipment Details */}
          <div className="bg-card rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold">{t('listEquipment.equipmentDetailsTitle')}</h2>

            <div>
              <label className="block text-sm font-medium mb-2">{t('listEquipment.equipNameLabel')}</label>
              <input
                type="text"
                required
                placeholder={t('listEquipment.equipNamePlace')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-input-background rounded-xl border-0 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('listEquipment.machineTypeLabel')}</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 bg-input-background rounded-xl border-0 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">{t('listEquipment.selectTypeOpt')}</option>
                <option value="tractor">{t('listEquipment.types.tractor')}</option>
                <option value="harvester">{t('listEquipment.types.harvester')}</option>
                <option value="irrigation">{t('listEquipment.types.irrigation')}</option>
                <option value="seeder">{t('listEquipment.types.seeder')}</option>
                <option value="transport">{t('listEquipment.types.transport')}</option>
                <option value="other">{t('listEquipment.types.other')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('listEquipment.locationLabel')}</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder={t('listEquipment.locationPlace')}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-input-background rounded-xl border-0 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('listEquipment.priceLabel')}</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  required
                  placeholder="550"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-input-background rounded-xl border-0 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('listEquipment.descLabel')}</label>
              <textarea
                rows={4}
                placeholder={t('listEquipment.descPlace')}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-input-background rounded-xl border-0 focus:ring-2 focus:ring-primary outline-none resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>{t('listEquipment.listingBtn')}</>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  {t('listEquipment.listEquipBtn')}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-4 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-colors"
            >
              {t('listEquipment.cancelBtn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
