import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const InvestmentContext = createContext(null);

const initialInvestments = [
  {
    id: "1",
    company: "Nexus Technologies",
    ticker: "NXUS",
    sector: "Technology",
    priceRange: "$18 - $22",
    minInvestment: 500,
    maxInvestment: 50000,
    status: "active",
    description: "Leading provider of enterprise cloud infrastructure solutions with operations across 40 countries.",
    highlights: [
      "Revenue: $2.4B (FY2024)",
      "YoY Growth: 34%",
      "Gross Margin: 72%",
      "Net Income: $180M"
    ],
    timeline: "Dec 20, 2025 - Jan 10, 2026",
    logo: "N"
  },
  {
    id: "2",
    company: "Verde Energy Corp",
    ticker: "VRDE",
    sector: "Clean Energy",
    priceRange: "$24 - $28",
    minInvestment: 1000,
    maxInvestment: 100000,
    status: "active",
    description: "Renewable energy company specializing in solar and wind power generation across North America.",
    highlights: [
      "Revenue: $890M (FY2024)",
      "YoY Growth: 56%",
      "Gross Margin: 45%",
      "EBITDA: $120M"
    ],
    timeline: "Jan 5, 2026 - Jan 25, 2026",
    logo: "V"
  },
  {
    id: "3",
    company: "MedCore Diagnostics",
    ticker: "MDCR",
    sector: "Healthcare",
    priceRange: "$32 - $38",
    minInvestment: 2000,
    maxInvestment: 75000,
    status: "pending",
    description: "AI-powered diagnostic platform revolutionizing early disease detection and personalized medicine.",
    highlights: [
      "Revenue: $560M (FY2024)",
      "YoY Growth: 89%",
      "Gross Margin: 68%",
      "R&D Investment: $85M"
    ],
    timeline: "Feb 1, 2026 - Feb 20, 2026",
    logo: "M"
  },
  {
    id: "4",
    company: "Quantum Systems Inc",
    ticker: "QSYS",
    sector: "Technology",
    priceRange: "$45 - $52",
    minInvestment: 5000,
    maxInvestment: 200000,
    status: "pending",
    description: "Pioneer in quantum computing hardware and software solutions for enterprise applications.",
    highlights: [
      "Revenue: $320M (FY2024)",
      "YoY Growth: 125%",
      "Gross Margin: 58%",
      "Patent Portfolio: 450+"
    ],
    timeline: "Feb 15, 2026 - Mar 5, 2026",
    logo: "Q"
  },
  {
    id: "5",
    company: "Atlas Logistics",
    ticker: "ATLS",
    sector: "Logistics",
    priceRange: "$14 - $17",
    minInvestment: 250,
    maxInvestment: 25000,
    status: "closed",
    description: "Next-generation supply chain and logistics platform powered by AI and autonomous vehicles.",
    highlights: [
      "Revenue: $1.8B (FY2024)",
      "YoY Growth: 28%",
      "Gross Margin: 32%",
      "Fleet Size: 15,000+"
    ],
    timeline: "Closed Nov 30, 2025",
    logo: "A"
  }
];

export function InvestmentProvider({ children }) {
  const { user } = useAuth();
  const [Investments] = useState(initialInvestments);
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`investments_${user.email}`);
      if (stored) {
        setInvestments(JSON.parse(stored));
      } else {
        setInvestments([]);
      }
    } else {
      setInvestments([]);
    }
  }, [user]);

  const invest = (InvestmentId, amount) => {
    const Investment = Investments.find((i) => i.id === InvestmentId);
    if (!Investment || Investment.status !== "active") {
      return { success: false, error: "This Investment is not available for investment" };
    }

    if (amount < Investment.minInvestment) {
      return { success: false, error: `Minimum investment is $${Investment.minInvestment.toLocaleString()}` };
    }

    if (amount > Investment.maxInvestment) {
      return { success: false, error: `Maximum investment is $${Investment.maxInvestment.toLocaleString()}` };
    }

    const newInvestment = {
      id: Date.now().toString(),
      InvestmentId,
      company: Investment.company,
      ticker: Investment.ticker,
      amount,
      date: new Date().toISOString(),
      status: "pending"
    };

    const updated = [...investments, newInvestment];
    setInvestments(updated);
    localStorage.setItem(`investments_${user.email}`, JSON.stringify(updated));
    return { success: true };
  };

  const getTotalInvested = () => {
    return investments.reduce((sum, inv) => sum + inv.amount, 0);
  };

  const getActiveInvestmentsCount = () => {
    return Investments.filter((i) => i.status === "active").length;
  };

  const getPendingInvestments = () => {
    return investments.filter((i) => i.status === "pending").length;
  };

  return (
    <InvestmentContext.Provider
      value={{
        Investments,
        investments,
        invest,
        getTotalInvested,
        getActiveInvestmentsCount,
        getPendingInvestments
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
}

export function useInvestments() {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error("useInvestments must be used within an InvestmentProvider");
  }
  return context;
}
