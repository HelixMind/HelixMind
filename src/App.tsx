import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { InvestmentProvider } from "@/context/InvestmentContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/pages/DashboardLayout";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import Marketplace from "@/pages/Marketplace";
import IPODetails from "@/pages/IPODetails";
import MyInvestments from "@/pages/MyInvestments";
import Account from "@/pages/Account";
import ScrollToTop from "@/components/ScrollToTop";
import KYC from "@/pages/KYC";
import Capital from "@/pages/Capital";
import CapitalDeposit from "@/pages/CapitalDeposit";
import CapitalWithdraw from "@/pages/CapitalWithdraw";
import KYCIntro from "@/components/KYCIntro";
import KYCDocument from "@/components/KYCDocument";
import KYCSelfie from "@/components/KYCSelfie";
import KYCReview from "@/components/KYCReview";
import KYCSuccess from "@/components/KYCSuccess";
import Random from "./pages/Random";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <InvestmentProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/rand-test" element={<Random />} />
              <Route path="/" element={<Navigate to="/signin" replace />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Dashboard />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/marketplace"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Marketplace />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Investment/:id"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <IPODetails />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/investments"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <MyInvestments />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Account />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* Capital routes */}
              <Route
                path="/capital"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Capital />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/capital/deposit"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <CapitalDeposit />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/capital/withdraw"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <CapitalWithdraw />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/kyc"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <KYC />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              >
                <Route index element={<KYCIntro />} />
                <Route path="document" element={<KYCDocument />} />
                <Route path="selfie" element={<KYCSelfie />} />
                <Route path="review" element={<KYCReview />} />
                <Route path="success" element={<KYCSuccess />} />
              </Route>

              <Route path="*" element={<Navigate to="/signin" replace />} />
            </Routes>
          </BrowserRouter>
        </InvestmentProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
