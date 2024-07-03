import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext";


const ProtectedRoute = ({ element: Element, allowedRoles, ...rest }) => {
    const { user } = useAuth();


    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return (
        <Routes>
            <Route {...rest} element={<Element />} />;
        </Routes>
    )

};

export default ProtectedRoute;
