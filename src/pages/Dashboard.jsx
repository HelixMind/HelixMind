import { useInvestments } from "@/context/InvestmentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  DollarSign,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useState, useEffect } from "react";

const portfolioData = [
  { month: "Jul", value: 0, growth: 0 },
  { month: "Aug", value: 2500, growth: 100 },
  { month: "Sep", value: 4200, growth: 68 },
  { month: "Oct", value: 3800, growth: -9 },
  { month: "Nov", value: 5600, growth: 47 },
  { month: "Dec", value: 7200, growth: 29 },
];

const sectorData = [
  { name: "Technology", value: 45, color: "hsl(var(--success))" },
  { name: "Healthcare", value: 25, color: "hsl(var(--info))" },
  { name: "Energy", value: 20, color: "hsl(var(--warning))" },
  { name: "Logistics", value: 10, color: "hsl(var(--muted-foreground))" },
];

const monthlyInvestments = [
  { month: "Jul", amount: 0 },
  { month: "Aug", amount: 2500 },
  { month: "Sep", amount: 1700 },
  { month: "Oct", amount: 0 },
  { month: "Nov", amount: 1800 },
  { month: "Dec", amount: 1600 },
];

const marketTrends = [
  { day: "Mon", Investment: 12, market: 15 },
  { day: "Tue", Investment: 19, market: 18 },
  { day: "Wed", Investment: 15, market: 12 },
  { day: "Thu", Investment: 22, market: 20 },
  { day: "Fri", Investment: 28, market: 25 },
];

export default function Dashboard() {
  const {
    getTotalInvested,
    getActiveInvestmentsCount,
    getPendingInvestments,
    investments,
  } = useInvestments();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    performance: 0,
  });

  const totalInvested = getTotalInvested();
  const activeInvestments = getActiveInvestmentsCount();
  const pendingCount = getPendingInvestments();

  // Animate numbers on mount
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        total: Math.floor(totalInvested * easeOut),
        active: Math.floor(activeInvestments * easeOut),
        pending: Math.floor(pendingCount * easeOut),
        performance: Math.floor(8.3 * easeOut * 10) / 10,
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [totalInvested, activeInvestments, pendingCount]);

  const stats = [
    {
      title: "Total Invested",
      value: `$${animatedStats.total.toLocaleString()}`,
      icon: DollarSign,
      change: totalInvested > 0 ? "+12.5%" : "—",
      positive: true,
      delay: "0ms",
    },
    {
      title: "Active Investments",
      value: animatedStats.active.toString(),
      icon: TrendingUp,
      change: "2 new this week",
      positive: true,
      delay: "100ms",
    },
    {
      title: "Pending Investments",
      value: animatedStats.pending.toString(),
      icon: Clock,
      change: pendingCount > 0 ? "Awaiting confirmation" : "None",
      positive: null,
      delay: "200ms",
    },
    {
      title: "Portfolio Performance",
      value: totalInvested > 0 ? `+${animatedStats.performance}%` : "—",
      icon: BarChart3,
      change: "vs. last month",
      positive: true,
      delay: "300ms",
    },
  ];

  return (
    <div className="container mx-auto max-w-[1400px] p-6 lg:p-8 space-y-8">
      {/* Hero Section with Video */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-card border border-border animate-fade-in">
        <div className="absolute inset-0 bg-[url('/hero_bg.jpg')] bg-cover bg-[position:50%_30%] opacity-20" />
        <div className="relative z-10 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <h1 className="text-3xl lg:text-4xl font-display font-bold animate-fade-in-up">
                Welcome back
              </h1>
              <p
                className="text-muted-foreground text-lg animate-fade-in-up"
                style={{ animationDelay: "100ms" }}
              >
                Your portfolio is performing well. Track your investments and
                discover new opportunities.
              </p>
              <div
                className="flex gap-3 animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                <Link to="/marketplace">
                  <Button size="lg" className="group">
                    Explore Investments
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Video Preview Card */}
            {/*             <div 
              className="relative w-full lg:w-80 aspect-video rounded-xl overflow-hidden border border-border bg-card cursor-pointer group animate-scale-in"
              style={{ animationDelay: "300ms" }}
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            >
              <img 
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=640&q=80" 
                alt="Market Overview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center transition-opacity group-hover:bg-background/40">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110 animate-glow">
                  {isVideoPlaying ? (
                    <Pause className="w-6 h-6 text-primary-foreground" />
                  ) : (
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  )}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-medium">Market Overview Q4 2025</p>
                <p className="text-xs text-muted-foreground">3:24</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="w-full sm:w-auto transition-transform duration-200 hover:shadow-lg hover:scale-[1.02]"
          >
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                {/* Stat Info */}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-2xl sm:text-3xl font-display font-semibold mt-1">
                    {stat.value}
                  </p>

                  {stat.change && (
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      {stat.positive !== null &&
                        (stat.positive ? (
                          <ArrowUpRight className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-destructive" />
                        ))}
                      <span
                        className={`${
                          stat.positive
                            ? "text-success"
                            : stat.positive === false
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  )}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Chart */}
        <Card
          className="lg:col-span-2 animate-slide-in-left opacity-0"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Portfolio Value</CardTitle>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-success flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                +28.5%
              </span>
              <span className="text-muted-foreground">this quarter</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--success))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--success))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Value",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--success))"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    strokeWidth={2}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sector Allocation Pie Chart */}
        <Card
          className="animate-slide-in-right opacity-0"
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          <CardHeader>
            <CardTitle className="text-lg">Sector Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Allocation"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {sectorData.map((sector, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: sector.color }}
                  />
                  <span className="text-muted-foreground">{sector.name}</span>
                  <span className="ml-auto font-medium">{sector.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Investments Bar Chart */}
        <Card
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          <CardHeader>
            <CardTitle className="text-lg">Monthly Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyInvestments}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Invested",
                    ]}
                  />
                  <Bar
                    dataKey="amount"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Market Trends Line Chart */}
        <Card
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
        >
          <CardHeader>
            <CardTitle className="text-lg">
              Market vs Investment Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketTrends}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="day"
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Investment"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
                    name="Investment Index"
                    animationDuration={1500}
                  />
                  <Line
                    type="monotone"
                    dataKey="market"
                    stroke="hsl(var(--info))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--info))", strokeWidth: 2 }}
                    name="Market Index"
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Investment Index</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-info" />
                <span className="text-muted-foreground">Market Index</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Featured Image */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
        >
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {investments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No activity yet. Start by exploring the marketplace.
              </p>
            ) : (
              investments
                .slice(-3)
                .reverse()
                .map((inv, index) => (
                  <div
                    key={inv.id}
                    className="flex items-start gap-3 animate-slide-in-left opacity-0"
                    style={{
                      animationDelay: `${900 + index * 100}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        Invested in {inv.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${inv.amount.toLocaleString()} •{" "}
                        {new Date(inv.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        inv.status === "pending"
                          ? "status-pending"
                          : "status-active"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                ))
            )}
            {investments.length === 0 && null}
          </CardContent>
        </Card>

        {/* Featured Investment Opportunity */}
        <Card
          className="lg:col-span-2 overflow-hidden animate-fade-in-up opacity-0"
          style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
        >
          <div className="relative h-full min-h-[280px]">
            <img
              src="https://starlink.com/public-files/home_b_install_m.jpg"
              alt="Featured Investment"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="status-active text-xs px-2 py-1 rounded-full mb-3 inline-block">
                Featured
              </span>
              <h3 className="text-2xl font-display font-bold mb-2">
                Nexus Technologies Investment
              </h3>
              <p className="text-muted-foreground mb-4 max-w-lg">
                Leading cloud infrastructure provider going public. Don't miss
                this opportunity to invest in the future of enterprise
                technology.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/Investment/1">
                  <Button className="group">
                    View Details
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
                <div className="text-sm">
                  <span className="text-muted-foreground">Price Range: </span>
                  <span className="font-semibold">$18 - $22</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
