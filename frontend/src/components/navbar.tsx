import { Transition } from "@headlessui/react";
import * as React from "react";

import useAuth from "$modules/auth/use-auth";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";

type ActionsProps = {
  style?: string;
};

const navLinks = [
  {
    name: "Login",
    url: "/login",
  },
  {
    name: "Register",
    url: "/register",
  },
];

const authNavLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Files",
    url: "/files",
  },
  {
    name: "Upload",
    url: "/upload",
  },
  {
    name: "Profile",
    url: "/profile",
  },
];

const Actions = ({
  style = "px-3 py-2 rounded-md text-sm font-medium",
}: ActionsProps) => {
  const { logout, state } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };
  return (
    <>
      {state.isAuthenticated ? (
        <ul className="flex items-center gap-x-2">
          {authNavLinks.map((link) => (
            <li key={link.url}>
              <NavLink
                to={link.url}
                className={({ isActive }) =>
                  [
                    "px-3 py-2 rounded-md text-sm font-medium",
                    isActive
                      ? "text-indigo-700 bg-slate-50 hover:bg-slate-50"
                      : "hover:bg-white hover:bg-opacity-10 text-white",
                  ].join(" ")
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              className={
                style + " hover:bg-white hover:bg-opacity-10 text-white"
              }
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul className="flex items-center gap-x-2">
          {navLinks.map((link) => (
            <li key={link.url}>
              <NavLink
                to={link.url}
                className={({ isActive }) =>
                  [
                    "px-3 py-2 rounded-md text-sm font-medium",
                    isActive
                      ? "text-indigo-700 bg-slate-50 hover:bg-slate-50"
                      : "hover:bg-white hover:bg-opacity-10 text-white",
                  ].join(" ")
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col justify-center items-between bg-indigo-700 px-4 sm:px-6 lg:px-8 xl:px-12 py-3 md:py-4">
      <div className="flex items-center justify-between flex-1">
        <Link to="/">
          <img className="h-8 w-8" src={logo} alt="Educative" />
        </Link>
        <div className="-mr-2 flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
        <nav className="hidden md:flex md:items-center">
          <Actions />
        </nav>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <nav
            ref={ref}
            id="mobile-menu"
            className="md:hidden flex justify-end pt-2 pb-3 space-y-1"
          >
            <Actions />
          </nav>
        )}
      </Transition>
    </div>
  );
};

export default Navbar;
