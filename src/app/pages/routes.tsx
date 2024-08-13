import { useRoutes } from "react-router-dom";

import HomePage from "./home";
import NotFound from "./404";


const routesMap = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const Routes = () => useRoutes(routesMap);

export default Routes;
