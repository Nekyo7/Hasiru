import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useLanguage } from "../contexts/LanguageContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Valid 10-digit phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.phone, // Using phone as a temporary password for this demo
    });

    setIsLoading(false);

    if (error) {
      setErrors({ submit: error.message });
      return;
    }

    navigate("/chc-selection");
  };

  return (
    <div className="min-h-screen pt-16 bg-background flex flex-col items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('auth.welcomeBack')}</h1>
          <p className="text-muted-foreground">
            {t('auth.loginSubtitle')}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('auth.emailAddress')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('auth.phoneNumber')} <span className="text-muted-foreground text-xs">{t('auth.passwordNote')}</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder={t('auth.phonePlaceholder')}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
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
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              <span>{isLoading ? t('auth.signingIn') : t('auth.logIn')}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Info Text */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {t('auth.noAccount')}{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              {t('auth.signUp')}
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{t('auth.whyJoin')}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>{t('auth.benefit1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>{t('auth.benefit2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>{t('auth.benefit3')}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
