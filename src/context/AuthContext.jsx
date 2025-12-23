import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("Investment_user");
    const storedVerified = localStorage.getItem("verification_badge");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedVerified === "true") {
      setIsVerified(true);
    }

    setIsLoading(false);
  }, []);

  const signIn = (email, password) => {
    const storedUsers = JSON.parse(
      localStorage.getItem("Investment_users") || "[]"
    );

    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = { name: foundUser.name, email: foundUser.email };
      setUser(userData);
      localStorage.setItem("Investment_user", JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const signUp = (name, email, password) => {
    const storedUsers = JSON.parse(
      localStorage.getItem("Investment_users") || "[]"
    );

    const existingUser = storedUsers.find((u) => u.email === email);

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    const newUser = { name, email, password };
    storedUsers.push(newUser);
    localStorage.setItem("Investment_users", JSON.stringify(storedUsers));

    const userData = { name, email };
    setUser(userData);
    localStorage.setItem("Investment_user", JSON.stringify(userData));

    return { success: true };
  };

  const upgradeAccount = () => {
    setIsVerified(true);
    localStorage.setItem("verification_badge", "true");
  };

  const signOut = () => {
    setUser(null);
    setIsVerified(false);
    localStorage.removeItem("Investment_user");
    localStorage.removeItem("verification_badge");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isVerified,
        isLoading,
        signIn,
        signUp,
        signOut,
        upgradeAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
