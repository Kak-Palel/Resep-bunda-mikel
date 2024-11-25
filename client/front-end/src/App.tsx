import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./pages/routes";
import { UserProvider } from "./components/UserContext";

const queryClient = new QueryClient();

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
