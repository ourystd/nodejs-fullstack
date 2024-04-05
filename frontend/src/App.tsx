import AuthContextProvider from "$modules/auth/auth-context-provider";
import { RequireAuthPage } from "$modules/auth/reuire-auth-page";
import HomePage from "$pages/home";
import LoginPage from "$pages/login";
import RegisterPage from "$pages/register";
import UploadFilePage from "$pages/upload-file";
import AccountVerificationPage from "$pages/verify-account";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/upload",
    element: (
      <RequireAuthPage>
        <UploadFilePage />
      </RequireAuthPage>
    ),
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
