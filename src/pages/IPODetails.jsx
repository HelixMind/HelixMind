import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useInvestments } from "@/context/InvestmentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import {
  ArrowLeft,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Building2,
  DollarSign,
  Play,
  Users,
  Globe,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// since it is not a shared array of object the images here and their id needs to match the one at the marketplace
const companyImages = {
  1: "https://images.unsplash.com/photo-1652017679773-10ff773653f2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0YXJsaW5rfGVufDB8fDB8fHww",
  2: "https://starlink.com/public-files/home_b_install_m.jpg",
  3: "https://m.media-amazon.com/images/I/516-qbeEo5L._AC_SL1053_.jpg",
  4: "https://images.unsplash.com/photo-1633169747451-24ebe52e39b0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0YXJsaW5rfGVufDB8fDB8fHww",
  5: "https://images.unsplash.com/photo-1652017681821-61cd1a8ad37b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3Rhcmxpbmt8ZW58MHx8MHx8fDA%3D",
};

const revenueData = [
  { year: "2021", revenue: 800 },
  { year: "2022", revenue: 1200 },
  { year: "2023", revenue: 1800 },
  { year: "2024", revenue: 2400 },
];

const growthData = [
  { quarter: "Q1", growth: 15 },
  { quarter: "Q2", growth: 22 },
  { quarter: "Q3", growth: 28 },
  { quarter: "Q4", growth: 34 },
];

export default function IPODetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Investments, invest } = useInvestments();
  const [investAmount, setInvestAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investError, setInvestError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Investment = Investments.find((i) => i.id === id);

  if (!Investment) {
    return (
      <div className="p-6 lg:p-8 text-center">
        <p className="text-muted-foreground">Investment not found.</p>
        <Link to="/marketplace">
          <Button variant="outline" className="mt-4">
            Back to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  const handleInvestClick = () => {
    setInvestAmount("");
    setInvestError("");
    setIsSuccess(false);
    setIsModalOpen(true);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setInvestAmount(value);
    setInvestError("");
  };

  const validateAmount = () => {
    const amount = parseInt(investAmount);
    if (!investAmount || isNaN(amount)) {
      return "Please enter an investment amount";
    }
    if (amount < Investment.minInvestment) {
      return `Minimum investment is $${Investment.minInvestment.toLocaleString()}`;
    }
    if (amount > Investment.maxInvestment) {
      return `Maximum investment is $${Investment.maxInvestment.toLocaleString()}`;
    }
    return null;
  };

  const handleSubmit = () => {
    const error = validateAmount();
    if (error) {
      setInvestError(error);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = invest(Investment.id, parseInt(investAmount));
      setIsSubmitting(false);

      if (result.success) {
        setIsSuccess(true);
      } else {
        setInvestError(result.error);
      }
    }, 1000);
  };

  const isButtonDisabled = () => {
    const amount = parseInt(investAmount);
    return (
      !investAmount ||
      isNaN(amount) ||
      amount < Investment.minInvestment ||
      amount > Investment.maxInvestment ||
      isSubmitting
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <span className="status-active text-sm px-3 py-1 rounded-full animate-glow">Open for Investment</span>;
      case "pending":
        return <span className="status-pending text-sm px-3 py-1 rounded-full">Upcoming</span>;
      case "closed":
        return <span className="status-closed text-sm px-3 py-1 rounded-full">Closed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/marketplace")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-fade-in"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </button>

      {/* Hero Image */}
      <div className="relative rounded-2xl overflow-hidden h-64 lg:h-80 animate-fade-in">
        <img 
          src={companyImages[Investment.id]}
          alt={Investment.company}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Video Play Button */}
{/*         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
          <div className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center transition-transform group-hover:scale-110 animate-float">
            <Play className="w-8 h-8 text-primary-foreground ml-1" />
          </div>
          <p className="text-center text-sm font-medium mt-3">Watch Pitch Video</p>
        </div> */}

        {/* Company Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-card/90 backdrop-blur flex items-center justify-center text-2xl font-display font-bold border border-border animate-scale-in">
                {Investment.logo}
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold animate-fade-in-up">{Investment.company}</h1>
                <div className="flex items-center gap-2 mt-1 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                  <span className="text-muted-foreground">{Investment.ticker}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{Investment.sector}</span>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              {getStatusBadge(Investment.status)}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Investors", value: "2,340+" },
          { icon: Globe, label: "Countries", value: "40+" },
          { icon: BarChart3, label: "Growth", value: "+34% YoY" },
          { icon: DollarSign, label: "Raised", value: "$180M" },
        ].map((stat, index) => (
          <Card 
            key={index}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${300 + index * 100}ms`, animationFillMode: "forwards" }}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-display font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card className="animate-slide-in-left opacity-0" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Company Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{Investment.description}</p>
              
              {/* Team Image */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="relative rounded-lg overflow-hidden aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                    alt="CEO"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <p className="text-xs font-medium">John Smith</p>
                    <p className="text-xs text-muted-foreground">CEO</p>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                    alt="CFO"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <p className="text-xs font-medium">Sarah Chen</p>
                    <p className="text-xs text-muted-foreground">CFO</p>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                    alt="CTO"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <p className="text-xs font-medium">Mike Johnson</p>
                    <p className="text-xs text-muted-foreground">CTO</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card className="animate-slide-in-left opacity-0" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Revenue Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="year"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                      tickFormatter={(value) => `$${value}M`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`$${value}M`, "Revenue"]}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="hsl(var(--success))" 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Growth Chart */}
          <Card className="animate-slide-in-left opacity-0" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Quarterly Growth (2024)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="quarter"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`${value}%`, "Growth"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="growth"
                      stroke="hsl(var(--info))"
                      fillOpacity={1}
                      fill="url(#colorGrowth)"
                      strokeWidth={2}
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Financial Highlights */}
          <Card className="animate-slide-in-left opacity-0" style={{ animationDelay: "700ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Financial Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Investment.highlights.map((highlight, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <p className="text-sm font-medium">{highlight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Disclaimer */}
          <Card className="border-warning/30 bg-warning/5 animate-fade-in-up opacity-0" style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 animate-pulse-slow" />
                <div>
                  <h3 className="font-display font-semibold text-warning">Investment Risk Disclaimer</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Investing in Investments involves significant risks including potential loss of principal.
                    Past performance is not indicative of future results. This is not investment advice.
                    Please consult with a qualified financial advisor before making investment decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Investment Card */}
        <div className="space-y-6">
          <Card className="sticky top-6 animate-slide-in-right opacity-0" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Investment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price Range</span>
                  <span className="font-medium">{Investment.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min Investment</span>
                  <span className="font-medium">${Investment.minInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Investment</span>
                  <span className="font-medium">${Investment.maxInvestment.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress */}
              {Investment.status === "active" && (
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Funding Progress</span>
                    <span className="font-medium text-success">$12.4M / $18M</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-success rounded-full animate-shimmer"
                      style={{ 
                        width: "68%",
                        backgroundImage: "linear-gradient(90deg, transparent, hsl(var(--success) / 0.5), transparent)",
                        backgroundSize: "200% 100%"
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">68% funded • 847 investors</p>
                </div>
              )}

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  {Investment.timeline}
                </div>

                <Button
                  size="lg"
                  className="w-full group"
                  onClick={handleInvestClick}
                  disabled={Investment.status !== "active"}
                >
                  {Investment.status === "active"
                    ? "Invest Now"
                    : Investment.status === "pending"
                    ? "Coming Soon"
                    : "Investment Closed"}
                </Button>

                {Investment.status !== "active" && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {Investment.status === "pending"
                      ? "This Investment will open for investment soon."
                      : "This Investment is no longer accepting investments."}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Company Video Card */}
{/*           <Card className="overflow-hidden animate-slide-in-right opacity-0" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
            <div className="relative aspect-video cursor-pointer group">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=640&q=80"
                alt="Company Video"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center transition-opacity group-hover:bg-background/40">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
                  <Play className="w-6 h-6 text-primary-foreground ml-1" />
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="font-medium">Company Presentation</p>
              <p className="text-sm text-muted-foreground">Watch the full investor pitch • 8:45</p>
            </CardContent>
          </Card> */}
        </div>
      </div>

      {/* Invest Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="animate-scale-in">
          {!isSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle>Invest in {Investment.company}</DialogTitle>
                <DialogDescription>
                  Enter the amount you wish to invest. Min: ${Investment.minInvestment.toLocaleString()}, Max: ${Investment.maxInvestment.toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Investment Amount (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      type="text"
                      placeholder="0"
                      value={investAmount}
                      onChange={handleAmountChange}
                      className="pl-8 text-lg transition-all focus:scale-[1.01]"
                    />
                  </div>
                  {investError && (
                    <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
                      <AlertTriangle className="w-3 h-3" />
                      {investError}
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isButtonDisabled()} className="group">
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    "Confirm Investment"
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4 animate-scale-in">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <DialogTitle className="mb-2">Investment Submitted!</DialogTitle>
              <DialogDescription>
                Your investment of ${parseInt(investAmount).toLocaleString()} in {Investment.company} ({Investment.ticker}) has been submitted successfully.
              </DialogDescription>
              <div className="mt-6 space-y-2">
                <Button className="w-full" onClick={() => navigate("/investments")}>
                  View My Investments
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
