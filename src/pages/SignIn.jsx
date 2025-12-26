// react
import { useState } from "react";

// react-router-dom
import { Link, useNavigate } from "react-router-dom";

// context
import { useAuth } from "@/context/AuthContext";

// lucide-react
import {
  Eye,
  EyeOff,
  AlertCircle,
  TrendingUp,
  Play,
  ArrowRight,
} from "lucide-react";

// ui
import Logo from "../components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { toast } from "sonner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);

    const result = await signIn(email, password);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message)
      setTimeout(() => { navigate("/"); }, 500)
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-border relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-3 animate-fade-in">
          <Logo />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl font-display font-bold leading-tight animate-fade-in-up">
              Accelerate
              <br />
              <span className="text-muted-foreground">
                biological discovery.
              </span>
            </h1>
            <p
              className="text-muted-foreground text-lg max-w-md animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              Use AI-powered genomic analysis to explore, simulate, and predict
              biological outcomes with confidence.
            </p>
          </div>
        </div>

        <p
          className="relative z-10 text-sm text-muted-foreground animate-fade-in"
          style={{ animationDelay: "500ms" }}
        >
          © 2025 HelixMind. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 bg-transparent animate-fade-in">
          <CardHeader className="space-y-2 text-center lg:text-left">
            <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
              <Logo />
            </div>
            <CardTitle className="text-2xl font-display animate-fade-in-up">
              Welcome back
            </CardTitle>
            <CardDescription
              className="animate-fade-in-up"
              style={{ animationDelay: "50ms" }}
            >
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div
                className="space-y-2 animate-fade-in-up"
                style={{ animationDelay: "100ms" }}
              >
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="transition-all duration-300 focus:scale-[1.01]"
                />
              </div>

              <div
                className="space-y-2 animate-fade-in-up"
                style={{ animationDelay: "150ms" }}
              >
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="pr-10 transition-all duration-300 focus:scale-[1.01]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full group animate-fade-in-up"
                size="lg"
                disabled={isLoading}
                style={{ animationDelay: "200ms" }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              <p
                className="text-center text-sm text-muted-foreground animate-fade-in-up"
                style={{ animationDelay: "250ms" }}
              >
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-foreground hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
