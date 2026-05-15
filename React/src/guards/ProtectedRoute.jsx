import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth-Context";

export default function ProtectedRoute({ children }) {
  console.log("protectedRoute");
  const { isAuth } = useAuth();
  if (!isAuth) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ message: "You must Login First" }}
      />
    );
  }
  return children;
}
