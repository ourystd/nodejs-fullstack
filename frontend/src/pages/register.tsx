import RegisterForm from "$modules/auth/register-form";
import logo from "$assets/react.svg";
import { GestPageOnly } from "$modules/auth/guest-page-only";
import Navbar from "$components/navbar";

const RegisterPage = () => {
  return (
    <GestPageOnly>
      <div className="bg-slate-200 min-h-screen">
        <Navbar />
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create a new account
              </h2>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </GestPageOnly>
  );
};

export default RegisterPage;
