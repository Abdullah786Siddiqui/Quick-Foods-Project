import { Navigate } from "react-router-dom";
import { type  ReactNode  } from "react";

interface LocationGuardProps {
  children: ReactNode;
  reverse?: boolean; // default false
}

const LocationGuard = ({ children, reverse = false }: LocationGuardProps) => {
  const userLocation = localStorage.getItem("userLocation");

  // reverse=false → normal page → require location
  if (!reverse && !userLocation) {
    return <Navigate to="/location" replace />;
  }

  // reverse=true → location page → block if location exists
  if (reverse && userLocation) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default LocationGuard;
