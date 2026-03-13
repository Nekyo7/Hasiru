import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Phone, MapPin, User, ArrowRight, Loader2 } from "lucide-react";
import { selectCHC } from "../utils/auth";
import { supabase } from "../../lib/supabase";

const CHC_LOCATIONS = [
  "gkvk",
  "Uddurkaval",
  "Doddaballapura",
  "Dalasanuru"
];

export function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    location: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.location) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setErrors({});

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.phone, // Using phone as a temporary password for simplicity in this demo, real world should have a password field
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
          }
        }
      });

      if (error) {
        setErrors({ submit: error.message });
        setIsLoading(false);
        return;
      }

      // Find an ID for the selected location to map correctly 
      // (a fake auto-increment ID is fine for demo as long as name matches)
      selectCHC({
        id: CHC_LOCATIONS.indexOf(formData.location) + 1,
        name: formData.location
      });
      
      setIsLoading(false);
      // Redirect to CHC home page (DiscoveryPage)
      navigate("/discover");
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Join FarmShare</h1>
            <p className="text-muted-foreground">Start renting equipment from your nearest CHC</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </div>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </div>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Address Field */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </div>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* Location Dropdown */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Nearest CHC Location
                </div>
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              >
                <option value="">Select a CHC location</option>
                {CHC_LOCATIONS.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            {errors.submit && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Already signed up */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
