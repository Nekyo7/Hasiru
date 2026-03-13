import { Link } from "react-router";
import { Tractor, Wheat, Droplet, Sprout, Truck, ArrowRight, MapPin, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const categories = [
  {
    icon: Tractor,
    name: "Tractors",
    image: "https://images.unsplash.com/photo-1758636528604-a8b3d3824157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB0cmFjdG9yJTIwd29ya2luZ3xlbnwxfHx8fDE3NzMzODkzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "240+ available"
  },
  {
    icon: Wheat,
    name: "Harvesters",
    image: "https://images.unsplash.com/photo-1742579373744-c9eb35987324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21iaW5lJTIwaGFydmVzdGVyJTIwZmllbGR8ZW58MXx8fHwxNzczMzg5MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "85+ available"
  },
  {
    icon: Droplet,
    name: "Irrigation Systems",
    image: "https://images.unsplash.com/photo-1598370025936-0856434d26e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcnJpZ2F0aW9uJTIwc3lzdGVtJTIwZmFybXxlbnwxfHx8fDE3NzMzODkwNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "120+ available"
  },
  {
    icon: Sprout,
    name: "Seeders",
    image: "https://images.unsplash.com/photo-1764277434161-23d72931335f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkaW5nJTIwZXF1aXBtZW50JTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzczMzg5MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "95+ available"
  },
  {
    icon: Truck,
    name: "Transport Equipment",
    image: "https://images.unsplash.com/photo-1760765622766-0338e7c65d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwdHJhbnNwb3J0JTIwdHJ1Y2t8ZW58MXx8fHwxNzczMzg5MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "60+ available"
  }
];

const featuredListings = [
  {
    id: 1,
    name: "Mahindra 475 DI Tractor",
    distance: "3 km away",
    price: "₹550",
    available: true,
    image: "https://images.unsplash.com/photo-1739066483931-b9d218fe50b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWhpbmRyYSUyMHRyYWN0b3IlMjBpbmRpYXxlbnwxfHx8fDE3NzMzODkzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    name: "John Deere 5055E",
    distance: "5.2 km away",
    price: "₹750",
    available: true,
    image: "https://images.unsplash.com/photo-1685335686020-e0b487f7f426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2huJTIwZGVlcmUlMjB0cmFjdG9yfGVufDF8fHx8MTc3MzM4OTM0MHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: "Combine Harvester",
    distance: "8 km away",
    price: "₹2,500",
    available: false,
    image: "https://images.unsplash.com/photo-1655818805647-585cb9c9b02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwbWFjaGluZXJ5JTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MzMwODE0Nnww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1673200692829-fcdb7e267fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFjdG9yJTIwZmFybWxhbmQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzczMzg5MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Farm landscape with tractors"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Share Equipment.<br />Grow Together.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            A local marketplace where farmers can rent tractors, harvesters, and agricultural tools from nearby owners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/discover"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg hover:scale-105 transition-transform shadow-lg"
            >
              <span>Find Equipment</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/list-equipment"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl text-lg hover:scale-105 transition-transform shadow-lg"
            >
              <span>List Your Machine</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">Browse Equipment</h2>
          <p className="text-lg text-muted-foreground">Find the right machinery for your farm</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/discover"
              className="group relative overflow-hidden rounded-2xl bg-card shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">{category.name}</h3>
                </div>
                <p className="text-white/90">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">Available Nearby</h2>
            <p className="text-lg text-muted-foreground">Equipment ready to rent in your area</p>
          </div>
          <Link
            to="/discover"
            className="text-primary hover:text-primary/80 flex items-center gap-2"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <Link
              key={listing.id}
              to={`/equipment/${listing.id}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <ImageWithFallback
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {listing.available && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Available today
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-foreground mb-3">{listing.name}</h3>
                <div className="flex items-center gap-4 text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{listing.distance}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground">{listing.price}</span>
                    <span className="text-muted-foreground">/hour</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary rounded-2xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Tractor className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">600+ Machines</h3>
              <p className="text-muted-foreground">Available across regions</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary rounded-2xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">50+ Districts</h3>
              <p className="text-muted-foreground">Growing community network</p>
            </div>
            <div className="text-center">
              <div className="bg-accent rounded-2xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">For farmers, by farmers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
