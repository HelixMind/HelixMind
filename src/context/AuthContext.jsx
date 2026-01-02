import { createContext, useContext, useState, useEffect } from "react";
import {signup, login, checkAuth} from "@/api/auth"

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function() {
      try {
        const response = await checkAuth();
        setUser({
          name: `${response.fname} ${response.lname}`,
          email: response.email
        });

        setIsVerified(true);
      } catch (error) {
        setUser(null);
        console.error("Unable to check user state")
      } finally {
        setIsLoading(false);
      }
    })();
    // const storedUser = localStorage.getItem("Investment_user");
    // const storedVerified = localStorage.getItem("verification_badge");

    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // }

    // if (storedVerified === "true") {
    //   setIsVerified(true);
    // }
  }, []);

  const signIn = async (email, password) => {
    setIsLoading(true);

    try {
      console.log({email, password});
      const response = await login({email, password});

      if (response.token.trim().length <= 0) {
        throw new Error("Something went wrong, try again");
      }

      // Log the user in
      localStorage.setItem("Helix_user_token", response.token);
      
      // Do whatever you want to do with the user data
      setUser({
        name: `${response.user.fname} ${response.user.lname}`,
        email: response.user.email
      });

      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : error}
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name, email, password) => {
    setIsLoading(true);
    
    try {
      const [fname, lname] = name.split(" ");
      const response = await signup({
        fname,
        lname,
        email,
        password
      });

      setUser({ name, email });
      
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : error }
    } finally {
      setIsLoading(false);
    }

    // const storedUsers = JSON.parse(
    //   localStorage.getItem("Investment_users") || "[]"
    // );

    // const existingUser = storedUsers.find((u) => u.email === email);

    // if (existingUser) {
    //   return {
    //     success: false,
    //     error: "An account with this email already exists",
    //   };
    // }

    // const newUser = { name, email, password };
    // storedUsers.push(newUser);
    // localStorage.setItem("Investment_users", JSON.stringify(storedUsers));

    // const userData = { name, email };
    // localStorage.setItem("Investment_user", JSON.stringify(userData));
  };

  const upgradeAccount = () => {
    setIsVerified(true);
    localStorage.setItem("verification_badge", "true");
  };

  const signOut = () => {
    setUser(null);
    setIsVerified(false);
    localStorage.removeItem("Helix_user_token");
    // localStorage.removeItem("Investment_user");
    // localStorage.removeItem("verification_badge");
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
