import AuthContextProvider from "$modules/auth/auth-context-provider";
import HomePage from "$pages/home";
import LoginPage from "$pages/login";
import RegisterPage from "$pages/register";
import AccountVerificationPage from "$pages/verify-account";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verify-account/:confirmationToken",
    element: <AccountVerificationPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
