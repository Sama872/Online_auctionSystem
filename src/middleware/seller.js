import React from "react";
import { Outlet , Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/storage";


const Seller = ()=>{
    const auth = getAuthUser();
  
    if (auth && (auth.type==="bidder" || auth.type==="admin")) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default Seller;