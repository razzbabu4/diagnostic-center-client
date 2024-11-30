import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="text-6xl animate-spin">⏳</div>
        </div>
    }
    if (user) {
        return children;
    }

    return <Navigate state={location?.pathname} to='/login'></Navigate>
};

export default PrivateRoute;