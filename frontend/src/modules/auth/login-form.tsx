import AuthService from "$services/auth.service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "./use-auth";
import Loader from "$components/loader";

const LoginSchema = z.object({
  emailOrUsername: z.string(),
  password: z.string(),
});

type TCredentials = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const { login: loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TCredentials>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<TCredentials> = async (userInfos, e) => {
    e?.preventDefault();

    try {
      const loggedInUser = await AuthService.login(userInfos);
      if (loggedInUser?.token) {
        const { token, ...user } = loggedInUser;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", token);
        loginUser({ user, token });
      }
      return loggedInUser;
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
    }
  };
  console.log({ errors, isSubmitting });

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            type="text"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address or Username"
            {...register("emailOrUsername")}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            {...register("password")}
          />
        </div>
      </div>

      <div className="flex justify-center">
        {!isSubmitting && (
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Login
          </button>
        )}
        {isSubmitting && <Loader />}
      </div>
    </form>
  );
};

export default LoginForm;
