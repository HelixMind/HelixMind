import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowDownCircle, ArrowUpCircle, BarChart2, Layers } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Capital() {
  const navigate = useNavigate();
  const { isVerified } = useAuth();
  const [balance, setBalance] = useState(5000);

  // Example investment usage
  const invested = 2500; // mock data
  const available = balance - invested;

  // Dark-themed profit/loss data
  const profitData = [
    { date: 'Jan', value: 4000 },
    { date: 'Feb', value: 4200 },
    { date: 'Mar', value: 3800 },
    { date: 'Apr', value: 4500 },
    { date: 'May', value: 4700 },
    { date: 'Jun', value: 5000 },
  ];

  // Custom dark tooltip for chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 rounded shadow-lg text-sm">
          <p>{label}</p>
          <p>${payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 fade-in max-w-full text-gray-100 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold">Capital</h1>
        <p className="text-gray-400 mt-1">
          Manage your capital and investments.
        </p>
      </div>

      {/* Total Capital Card */}
      <Card className="border border-bordershadow-md rounded-xl w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <BarChart2 className="w-5 h-5" />
            Total Capital
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <h2 className="text-4xl font-bold text-green-400">${balance.toLocaleString()}</h2>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 text-gray-300">
            <span>Available: ${available.toLocaleString()}</span>
            <span>Invested: ${invested.toLocaleString()}</span>
          </div>
          {!isVerified && (
            <p className="text-yellow-400 mt-2">
              Account verification required to withdraw capital.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="border border-gray-700shadow-md rounded-xl w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6">
          <Button
            onClick={() => navigate("/capital/deposit")}
            className="w-full flex items-center justify-start gap-2"
          >
            <ArrowDownCircle className="w-5 h-5 text-green-400" />
            Deposit Capital
          </Button>
          <Button
            onClick={() => navigate("/capital/withdraw")}
            className="w-full flex items-center justify-start gap-2"
          >
            <ArrowUpCircle className="w-5 h-5 text-red-400" />
            Withdraw Capital
          </Button>
        </CardContent>
      </Card>

            {/* Profit/Loss Graph */}
      <Card className="border border-bordershadow-md rounded-xl w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Profit / Loss Over Time
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitData}>
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={3} dot={{ fill: '#22c55e' }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
