import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}

function gettoken(name: string) {
    const cookie = document.cookie;

    const [key, value] = cookie.split("=");
    if (key === name) {
        return value;
    }
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = gettoken("token");

    if (!token) {
    return <Navigate to="/signin" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
