// react-router
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// contextxt
import { useAuth } from "@/context/AuthContext";

// react
import { useLayoutEffect, useRef, useState } from "react";

// ui
import {
  LayoutDashboard,
  PaperclipIcon,
  Briefcase,
  LogOut,
  ChartBarIcon,
  Menu,
  PanelLeftClose,
  SettingsIcon
} from "lucide-react";
import { cn } from "@/lib/utils.js";
import Logo from '../components/ui/Logo.jsx';

const navItems = [
  { to: "/overview", label: "Overview", icon: LayoutDashboard },
  { to: "/workspace", label: "Workspace", icon: Briefcase },
  { to: "/results-and-output", label: "Results and Output", icon: PaperclipIcon },
  { to: "/pilot-program", label: "Pilot Program", icon: ChartBarIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function DashboardLayout({ children }) {
  const { user, signOut, isVerified, upgradeAccount } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const mainRef = useRef(null);

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useLayoutEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [location.pathname]);

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  const [kycVerified] = useState(
    localStorage.getItem("kyc_verified") === "true"
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* ================= DESKTOP SIDEBAR (UNCHANGED) ================= */}
      <aside
        className={cn(
          "hidden lg:flex fixed top-0 left-0 h-screen flex-col border-r border-border bg-sidebar transition-all duration-300 ease-out",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-16 flex items-center gap-3 px-4 border-b border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-sidebar-accent transition"
          >
            {collapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </button>

          {collapsed ? (
            <NavLink to="/dashboard">
              <Logo className="text-[0rem] truncate" />
            </NavLink>
          ) : (
            <NavLink to="/dashboard">
              <Logo className="text-[0.95rem] truncate" />
            </NavLink>
          )}
        </div>

        <nav className="flex-1 px-3 py-6 space-y-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="truncate">{!collapsed && item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-medium truncate flex items-center gap-2">
                  <span className="truncate">{user?.name || "User"}</span>
                  {isVerified && (
                    <img
                      src="./verification_badge.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                  )}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleSignOut}
            className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-sidebar-accent transition"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* ================= MOBILE HEADER ================= */}
      <div className="fixed top-0 left-0 right-0 h-16 flex gap-0.5 items-center px-4 border-b border-border bg-background z-40 lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-sidebar-accent"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Logo />
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />

        <aside
          className={cn(
            "absolute top-0 left-0 h-full w-64 bg-sidebar border-r border-border flex flex-col transform transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
            <Logo />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-sidebar-accent"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-3 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate flex items-center gap-2">
                  <span className="truncate">{user?.name || "User"}</span>
                  {isVerified && (
                    <img
                      src="./verification_badge.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                  )}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                handleSignOut();
                setMobileOpen(false);
              }}
              className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-sidebar-accent"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main
        ref={mainRef}
        className={cn(
          "flex-1 pt-16 lg:pt-0 h-screen overflow-auto transition-all duration-300",
          collapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        <div className="min-h-full pb-24 lg:pb-0">{children}</div>
      </main>
    </div>
  );
}
