import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar";
import AuthContextProvider from "$modules/auth/auth-context";
import RegisterPage from "$pages/register";
import AccountVerificationPage from "$pages/verify-account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verify-account/:confirmationToken",
    element: <AccountVerificationPage />,
  },
]);

function Home() {
  return (
    <div className="bg-slate-200 h-screen w-svw">
      <Navbar />
    </div>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
