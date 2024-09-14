import { createBrowserRouter } from "react-router-dom";
import Home from "./Home"
import Root from "./Root";
import Error from "./Error";
import ComingSoon from "./ComingSoon";
import RecipePage from "./RecipePage";

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
      },
      {
        path: "/:id", // Dynamic route for individual recipe pages
        element: <RecipePage />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default router;
