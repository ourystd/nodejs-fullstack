import { ApiOkResponse, create } from "apisauce";
import { on } from "events";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const httpClient = create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 * Handles the signup HTTP request to add a new user to the database
 * The data needed for each user is First Name, Last Name, Username, Email, and Password
 */

type TUser = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

const register = async (userInfos: TUser) => {
  return httpClient.post(`/signup`, userInfos);
};

/**
 * Handles the login HTTP request to access your user profile
 * The data needed for each user is the username or email along with the password
 */
type TCredentials = {
  emailOrUsername: string;
  password: string;
};
const login = async (credentials: TCredentials) => {
  return httpClient.post(`/login`, credentials).then((res) => {
    /**
     * If successfully logged in, store the user data, including the token, in the localStorage
     */
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  token: string;
} | null;

const getCurrentUser = (): User => {
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
  return httpClient.get<TData>(`/verify/${confirmationToken}`);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  verify: verifyAccount,
};

export default AuthService;
