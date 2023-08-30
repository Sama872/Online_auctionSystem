import {Navigate, createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/Home";
import App from "./App";
import Auctions from "./pages/auction/auctions";
import Manageauctions from "./pages/manageauctions/Manageauctions";
import ViewAuctions from './pages/seller/ViewAuctions';
import BiddedAuctions from './pages/bidder/BiddedAuctions';
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import Bidder from './middleware/bidder';
import Seller from "./middleware/seller";
import Addauction from './pages/auction/Addauction';
import Updateauction from "./pages/auction/Updateauction";
import Login2 from "./pages/auth/Login2";
import Register2 from './pages/auth/Register2';
import Updateuser from "./pages/manageauctions/Updateuser";
import Users from './pages/users/Users';
import Auctionslist from "./pages/seller/Auctionslist";

export const routes = createBrowserRouter([

    {
        path:"",
        element:<App/>,
        children:[
            {
                path: "",
                element: <Home/>,
              },

              {
                    path:"/register",
                    element:<Register2/>,
             },

             {
              path:"/updateauctions/:id",
              element:<Auctionslist/>,
       },

             {
              path:"/users",
              element:<Users/>,
       },

             
              
              //middleware
              {
                element : <Guest/>,
                children:[
                  {
                    path: "/login",
                    element: <Login2/>,
                  },

                  
    
                ]
              },

              {
                element : <Bidder/>,
                children:[
                  {
                    path: "/biddedauctions/:id",
                    element: <BiddedAuctions/>,
                  },

                  {
                    path: "/auctions",
                    element: <Auctions/>,
                  },
                ]
              },

              {
                element:<Seller/>,
                children:[
                  {
                    path: "/viewauctions/:id",
                    element: <ViewAuctions/>,
                  },
                  {
                    path:"/addauction",
                    element:<Addauction/>
                  },
    
                  {
                    path:"/updateauction/:id",
                    element:<Updateauction/>
                  },
                ]
              },

              {
                element:<Admin/>,
                children:[
                  {
                    path: "/manage-auctions",
                    element: <Manageauctions/>,
                  },
    
                  {
                    path:"/updateuser/:id",
                    element:<Updateuser/>
                  },
                ]
              },
        ]
    },

    {
        path:"*",
        element:<Navigate to={"/"} />
    }
    

  ]);