import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Navigate to={"/auth/login"} />;
  }

  const { user, loading } = authContext;

  const location = useLocation();

  if (loading) {
    return (
      <span>
        <span className="loading loading-bars loading-lg"></span>
      </span>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/auth/login"} />;
};

export default PrivateRoute;