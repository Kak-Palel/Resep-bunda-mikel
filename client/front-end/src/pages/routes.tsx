import { createBrowserRouter } from "react-router-dom";
import Home from "./Home"
import Root from "./Root";
import Error from "./Error";
import ComingSoon from "./ComingSoon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/",
        element: <ComingSoon />,
      }
    ],
    errorElement: <Error />,
  },
]);

export default router;
