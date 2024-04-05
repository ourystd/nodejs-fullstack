import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "$services/auth.service";
import Loader from "$components/loader";
import Alert, { TAlertTypes } from "$components/alert";
import React from "react";

const UserSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }).min(1),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

type TUser = z.infer<typeof UserSchema>;

const RegisterForm = () => {
  const [alertState, setAlertState] = React.useState<{
    show: boolean;
    type: TAlertTypes;
    msg: string;
  }>({
    show: false,
    type: "success",
    msg: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUser>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit: SubmitHandler<TUser> = async (userInfos, e) => {
    e?.preventDefault();

    try {
      const message = await AuthService.register(userInfos);
      setAlertState({
        show: true,
        type: "success",
        msg: message,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An error occured";
      setAlertState({
        show: true,
        type: "error",
        msg,
      });
    }
  };
  console.log({ errors });

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {alertState.show ? (
        <div className="flex justify-center">
          <Alert type={alertState.type} msg={alertState.msg} />
        </div>
      ) : null}

      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="firstName" className="sr-only">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="firstName"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="First Name"
            {...register("firstName")}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="sr-only">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="lastName"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Last Name"
            {...register("lastName")}
          />
        </div>
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Username"
            {...register("username")}
          />
        </div>
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            type="email"
            autoComplete="email"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            {...register("email")}
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
            Create my account
          </button>
        )}
        {isSubmitting && <Loader />}
      </div>
    </form>
  );
};

export default RegisterForm;
