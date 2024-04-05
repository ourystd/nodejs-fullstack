import clsx from "clsx";
import React from "react";

export type TAlertTypes = "success" | "error" | "warning" | "info" | "default";

type TAlertProps = {
  type: TAlertTypes;
  msg: string;
  onClose?: () => void;
};

const bgColorMap = {
  success: "bg-green-500",
  error: "bg-red-500 text-white",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
  default: "bg-gray-500",
};

const Alert = ({ type = "default", msg, onClose }: TAlertProps) => {
  const [showAlert, setShowAlert] = React.useState(true);

  if (!showAlert) {
    onClose && onClose();
    return null;
  }

  const bgColor = bgColorMap[type];

  return (
    <div
      className={clsx(`px-6 py-4 border-0 rounded relative mb-4 ${bgColor}`)}
    >
      <span className="text-xl text-current inline-block mr-5 align-middle">
        <i className="fas fa-bell" />
      </span>
      <span className="inline-block align-middle mr-8 text-current">{msg}</span>
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
