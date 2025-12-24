import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  route: string;
  role?: string; // optional
}

const PrivateRoute = ({ route, role }: PrivateRouteProps) => {
  const token = localStorage.getItem(`${role}_token`);
  const user = localStorage.getItem(`${role}_auth`);

  // 🔴 Not authenticated
  if (!token) {
    return <Navigate to={`${route}/login`} replace />;
  }

  // 🟡 Role based check (optional)
  if (role && user) {
    const parsedUser = JSON.parse(user);

    if (parsedUser.role !== role) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // 🟢 Authenticated
  return <Outlet />;
};

export default PrivateRoute;
