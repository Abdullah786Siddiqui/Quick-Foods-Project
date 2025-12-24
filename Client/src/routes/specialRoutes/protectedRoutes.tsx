// ProtectedAuthRoute.tsx
import { Navigate } from "react-router-dom";
import { type  ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string;
  route?: string;

}

const ProtectedRoute = ({ children , role , route }: ProtectedRouteProps) => {
  const token = localStorage.getItem(`${role}_token`);
  // const location = useLocation();

  // If user is logged in, redirect them to where they came from or home
  if (token) {
    // const from = (location.state)?.from?.pathname || `/${role}`;
    const from = `/${route}`;

    return <Navigate to={from} replace />;
  }

  // Otherwise, render the login/signup layout
  return <>{children}</>;
};

export default ProtectedRoute;
