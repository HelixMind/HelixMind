// react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// react-router-dom 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// context
import { AuthProvider } from "@/context/AuthContext.jsx";

// components
import ScrollToTop from "@/components/ScrollToTop.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";

// ui
import { Toaster } from "@/components/ui/toaster.tsx";
import { Toaster as Sonner } from "@/components/ui/sonner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";

// pages
import Random from "./pages/Random.tsx";

  // auth pages
import SignIn from "@/pages/SignIn.jsx";
import SignUp from "@/pages/SignUp.jsx";

  // layout page
import DashboardLayout from "@/pages/DashboardLayout.jsx";

  // 404 page 
import PageNotFound from "@/pages/PageNotFound.jsx";

  // navTtems pages 
import Overview from "@/pages/Overview.jsx";
import Workspace from "@/pages/Workspace.jsx";
import PilotProgram from "@/pages/PilotProgram.jsx";
import Settings from "@/pages/Settings.jsx";
import ResultsAndOutput from "@/pages/ResultsAndOutput.jsx"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/rand-test" element={<Random />} />
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* page not found */}
              <Route
                path="/page-not-found"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <PageNotFound />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* overview */}
              <Route
                path="/overview"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Overview />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* workspace */}
              <Route
                path="/workspace"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Workspace />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* pilot program */}
              <Route
                path="/pilot-program"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <PilotProgram />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* settings */}
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Settings />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* settings */}
              <Route
                path="/results-and-output"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ResultsAndOutput />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

{/* nested routing example */}
{/*               <Route
                path="/kyc"
                element={
                      <Overview />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

{/* nested routing example */}
{/*               <Route
                path="/kyc"
                element={
                      <PageNotFound />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

{/* nested routing example */}
{/*               <Route
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
              </Route> */}

              <Route path="*" element={<Navigate to="/page-not-found" replace />} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
