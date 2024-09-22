import { createBrowserRouter } from "react-router-dom";
import Home from "./Home"
import Root from "./Root";
import Error from "./Error";
import RecipePage from "./RecipePage";
import InputRecipe from "./InputRecipe";
import JamBiasa from "./JamBiasa";

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
        path: "/inputRecipe",
        element: <InputRecipe />,
      },
      {
        path: "/:id", // Dynamic route for individual recipe pages
        element: <RecipePage />,
      },
      {
        path: "/jamBiasa",
        element: <JamBiasa />,
      }
    ],
    errorElement: <Error />,
  },
]);

export default router;
