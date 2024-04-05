import Navbar from "$components/navbar";
import useAuth from "$modules/auth/use-auth";
import welcome from "$assets/welcome.png";
import { RequireAuthPage } from "$modules/auth/reuire-auth-page";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { state } = useAuth();
  return (
    <RequireAuthPage>
      <div className="bg-slate-200 min-h-screen w-svw">
        <Navbar />

        <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {`Welcome, ${state.user?.firstName}!`}
            </h2>
            <p className="mt-6 text-center text-3xl text-gray-900">
              You can upload your content easily to manage your files
            </p>
            <img
              className="mx-auto w-auto my-12"
              src={welcome}
              alt="Workflow"
            />
          </div>
          <Link
            to="/upload"
            className="w-80 cursor-pointer mt-10 bg-transparent text-center hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Upload a file
          </Link>
        </div>
      </div>
    </RequireAuthPage>
  );
}
