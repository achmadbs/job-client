import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to='/' />;
  }
  return children;
};
