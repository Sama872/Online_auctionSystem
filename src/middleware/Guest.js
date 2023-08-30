import React from "react";
import { Outlet , Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/storage";

const Guest = ()=>{
    const auth = getAuthUser();

    // Redirect to home page if user is already authenticated
    if (auth) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default Guest;
