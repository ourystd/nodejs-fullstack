import { httpClient } from "./http-client";

type TUserInfos = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

/**
 * Handles the signup HTTP request to add a new user to the database
 * The data needed for each user is First Name, Last Name, Username, Email, and Password
 */
const register = async (userInfos: TUserInfos) => {
  const res = await httpClient.post<{ message: string }, { message: string }>(
    `/users/signup`,
    userInfos
  );

  if (!res.ok) {
    throw new Error(
      res.data?.message || `An error occured: ${res.originalError}`
    );
  }

  return (
    res.data?.message ||
    "Your account has been created successfully. Please verify your email inbox to verify your account."
  );
};

/**
 * Handles the login HTTP request to access your user profile
 * The data needed for each user is the username or email along with the password
 */
type TCredentials = {
  emailOrUsername: string;
  password: string;
};

type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isVerified: boolean;
  token: string;
};

const login = async (credentials: TCredentials) => {
  const res = await httpClient.post<TUser, { message: string }>(
    `/users/login`,
    credentials
  );

  if (!res.ok) {
    throw new Error(res.data?.message);
  }

  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = (): TUser | null => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

/**
 * Handles the verify email request.
 */
type TData = {
  message: string;
};
const verifyAccount = (confirmationToken: string) => {
  return httpClient.get<TData>(`/users/verify/${confirmationToken}`);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  verify: verifyAccount,
};

export default AuthService;
