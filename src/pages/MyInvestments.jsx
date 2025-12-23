import { useInvestments } from "@/context/InvestmentContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight, Calendar, DollarSign } from "lucide-react";

export default function MyInvestments() {
  const { investments, Investments } = useInvestments();

  const getIPODetails = (InvestmentId) => {
    return Investments.find((i) => i.id === InvestmentId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold">My Investments</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage your Investment investments.
        </p>
      </div>

      {/* Investments List */}
      {investments.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-display font-semibold mb-2">No Investments Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't made any investments yet. Explore the marketplace to find exciting Investment opportunities.
            </p>
            <Link to="/marketplace">
              <Button>
                Explore Marketplace
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {investments.map((investment) => {
            const Investment = getIPODetails(investment.InvestmentId);
            return (
              <Card key={investment.id} className="hover:border-muted-foreground/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-lg font-display font-bold">
                        {Investment?.logo || investment.company.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-semibold">{investment.company}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>{investment.ticker}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(investment.date)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="text-lg font-display font-semibold flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {investment.amount.toLocaleString()}
                        </p>
                      </div>

                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          investment.status === "pending"
                            ? "status-pending"
                            : investment.status === "confirmed"
                            ? "status-active"
                            : "status-closed"
                        }`}
                      >
                        {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Summary */}
      {investments.length > 0 && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-display font-bold">
                  ${investments.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Investments</p>
                <p className="text-2xl font-display font-bold">{investments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
