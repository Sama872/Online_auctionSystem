import React from "react";
import { Outlet , Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/storage";


const Bidder = ()=>{
    const auth = getAuthUser();
    // return <>
    //     {auth && auth.type==="bidder"? <Outlet/> : <Navigate to={"/login"} />}
    // </>
    if (auth && (auth.type==="seller" || auth.type==="admin")) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default Bidder;