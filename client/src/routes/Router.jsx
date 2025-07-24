import { createBrowserRouter } from "react-router";

import AddRestaurant from '../pages/AddRestaurant'
import Home from '../pages/Home'
import Update from '../pages/Update'
import Signin from "../pages/Signin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/update/:id",
        element: <Update />
    },
    {
        path: "/add",
        element: <AddRestaurant />
    },
    {
        path: "/signin",
        element: <Signin />
    }
])

export default router