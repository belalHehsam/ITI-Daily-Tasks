import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const login = async (email) => {
    try {
      setUser(email);
      localStorage.setItem("user", JSON.stringify(email));
      toast.success("Login successful");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const SignUp = async (email) => {
    setUser(email);
    localStorage.setItem("user", JSON.stringify(email));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuth = !!user;

  return (
    <>
      <AuthContext.Provider value={{ user, login, SignUp, logout, isAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("you are using the Auth context outside the provider");
  return context;
}
