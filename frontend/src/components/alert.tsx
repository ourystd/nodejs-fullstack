import clsx from "clsx";
import React from "react";

export type TAlertTypes = "success" | "danger" | "warning" | "info" | "default";

type TAlertProps = {
  type: TAlertTypes;
  msg: string;
};

const bgColorMap = {
  success: "bg-green-500",
  danger: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
  default: "bg-gray-500",
};

const Alert = ({ type = "default", msg }: TAlertProps) => {
  const [showAlert, setShowAlert] = React.useState(true);
  if (!showAlert) return null;
  const bgColor = bgColorMap[type];

  return (
    <div
      className={clsx(`px-6 py-4 border-0 rounded relative mb-4 ${bgColor}`)}
    >
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-bell" />
      </span>
      <span className="inline-block align-middle mr-8 text-slate-700">
        {msg}
      </span>
      <button
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        onClick={() => setShowAlert(false)}
      >
        <span>×</span>
      </button>
    </div>
  );
};

export default Alert;
