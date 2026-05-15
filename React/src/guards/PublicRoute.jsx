import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth-Context";
export default function PublicRoute({ children }) {
  const { isAuth } = useAuth();
  if (isAuth) {
    return <Navigate to="/home" replace />;
  }
  return children;
}
