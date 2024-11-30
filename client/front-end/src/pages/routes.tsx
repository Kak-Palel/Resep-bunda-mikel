import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Root from "./Root";
import Error from "./Error";
import Recipe from "./Recipe";
import RecipePage from "./RecipePage";
import InputRecipe from "./InputRecipe";
import JamBiasa from "./JamBiasa";
import Profile from "./Profile";

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
        element: <Home />,
      },
      {
        path: "/recipe",
        element: <Recipe />
      },
      {
        path: "/inputRecipe",
        element: <InputRecipe />,
      },
      {
        path: "/profile/:name", // Dynamic route for profiles
        element: <Profile />,
      },
      {
        path: "/:id", // Dynamic route for individual recipe pages
        element: <RecipePage />,
      },
      {
        path: "/jamBiasa",
        element: <JamBiasa />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default router;
