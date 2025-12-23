import { useState } from "react";
import { Link } from "react-router-dom";
import { useInvestments } from "@/context/InvestmentContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Filter, ArrowRight, TrendingUp } from "lucide-react";

const sectorFilters = [
  "All",
  "Technology",
  "Clean Energy",
  "Healthcare",
  "Logistics",
];

const companyImages = {
  1: "https://images.unsplash.com/photo-1652017679773-10ff773653f2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0YXJsaW5rfGVufDB8fDB8fHww",
  2: "https://starlink.com/public-files/home_b_install_m.jpg",
  3: "https://m.media-amazon.com/images/I/516-qbeEo5L._AC_SL1053_.jpg",
  4: "https://images.unsplash.com/photo-1633169747451-24ebe52e39b0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0YXJsaW5rfGVufDB8fDB8fHww",
  5: "https://images.unsplash.com/photo-1652017681821-61cd1a8ad37b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3Rhcmxpbmt8ZW58MHx8MHx8fDA%3D",
};

export default function Marketplace() {
  const { Investments } = useInvestments();
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredInvestments = Investments.filter((Investment) => {
    const matchesSearch =
      Investment.company.toLowerCase().includes(search.toLowerCase()) ||
      Investment.ticker.toLowerCase().includes(search.toLowerCase());
    const matchesSector =
      selectedSector === "All" || Investment.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="status-active text-xs px-2 py-1 rounded-full">
            Open
          </span>
        );
      case "pending":
        return (
          <span className="status-pending text-xs px-2 py-1 rounded-full">
            Upcoming
          </span>
        );
      case "closed":
        return (
          <span className="status-closed text-xs px-2 py-1 rounded-full">
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-card border border-border w-full">
        <div className="absolute inset-0">
          <img
            src="/marketplace_bg.jpg"
            alt="Market Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 p-4 sm:p-6 lg:p-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          <div className="flex-1 space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold">
              Investment Marketplace
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-full lg:max-w-xl">
              Discover and invest in the most promising initial public offerings
              before they go public.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
                <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-success" />
                <span className="font-medium text-xs sm:text-sm text-success">
                  {Investments.filter((i) => i.status === "active").length} Active Investments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="my-8 flex flex-col sm:flex-row gap-6 sm:gap-4">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by company or ticker..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {sectorFilters.map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                selectedSector === sector
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Investment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInvestments.map((Investment) => (
          <Card
            key={Investment.id}
            className="group transition-all duration-300 hover:scale-[1.02] overflow-hidden opacity-100 w-full max-w-sm"
            onMouseEnter={() => setHoveredCard(Investment.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden rounded-t-xl">
              <img
                src={companyImages[Investment.id]}
                alt={Investment.company}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <div className="absolute top-3 right-3">
                {getStatusBadge(Investment.status)}
              </div>
              <div className="absolute bottom-3 left-3">
                <div className="w-12 h-12 rounded-xl bg-card/90 backdrop-blur flex items-center justify-center text-lg font-display font-bold border border-border">
                  {Investment.logo}
                </div>
              </div>
            </div>

            <CardContent className="p-4 sm:p-5 flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-display font-semibold group-hover:text-primary transition-colors truncate">
                {Investment.company}
              </h3>
              <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                <span>{Investment.ticker}</span>
                <span>•</span>
                <span>{Investment.sector}</span>
              </div>

              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price Range</span>
                  <span className="font-medium">{Investment.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min Investment</span>
                  <span className="font-medium">
                    ${Investment.minInvestment.toLocaleString()}
                  </span>
                </div>
              </div>

              {Investment.status === "active" && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Funding Progress</span>
                    <span>68%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full transition-all duration-1000"
                      style={{
                        width: hoveredCard === Investment.id ? "68%" : "0%",
                        transitionDelay: "200ms",
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-border">
                <Link to={`/Investment/${Investment.id}`}>
                  <Button
                    variant={Investment.status === "active" ? "default" : "outline"}
                    className="w-full flex items-center justify-center gap-2"
                    disabled={Investment.status === "closed"}
                  >
                    {Investment.status === "active"
                      ? "View & Invest"
                      : Investment.status === "pending"
                      ? "View Details"
                      : "Closed"}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInvestments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No Investments found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
