import { Link } from "react-router-dom";
import { TFile } from "./types";
import filesService from "./files.service";
import { clsx } from "clsx";
import * as React from "react";
import Alert, { TAlertTypes } from "$components/alert";

type TAlertState = {
  show: boolean;
  type: TAlertTypes;
  msg: string;
};
const FileCard = ({
  file,
  onDelete,
}: {
  file: TFile;
  onDelete: () => Promise<void>;
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [alertState, setAlertState] = React.useState<TAlertState>({
    show: false,
    type: "success",
    msg: "",
  });
  const handleDelete = async () => {
    setIsDeleting(true);
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await filesService.deleteFile(file.id);
        setAlertState({
          show: true,
          type: "info",
          msg: "File deleted successfully",
        });
        onDelete?.();
      } catch (error) {
        setAlertState({
          show: true,
          type: "error",
          msg: "An error occured while deleting the file",
        });
      }
    }
    setIsDeleting(false);
  };

  return (
    <>
      {alertState.show && (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center">
          <Alert
            msg={alertState.msg}
            type={alertState.type}
            onClose={() =>
              setAlertState((state) => ({ ...state, show: false }))
            }
          />
        </div>
      )}
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <iframe
          style={{ height: "20rem" }}
          className="w-full"
          src={file.path}
          title={file.name}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            <Link
              to={`/files/${file.id}`}
              className="hover:underline hover:text-blue-500"
            >
              {file.name}
            </Link>
          </div>
          <p className="text-gray-700 text-base">{file.description}</p>
        </div>
        <div className="flex mt-2">
          <a
            href={file.path}
            download={file.description}
            target="_blank"
            rel="noreferrer"
            className={clsx(
              "flex-1 bg-gray-100 hover:bg-green-700 hover:text-white font-light text-sm py-3 px-4",
              {
                "cursor-not-allowed pointer-events-none opacity-50": isDeleting,
              }
            )}
          >
            Download
          </a>
          <Link
            to={`/files/${file.id}`}
            className={clsx(
              "flex-1 bg-gray-100 hover:bg-blue-700 hover:text-white font-light text-sm text-center py-3 px-4",
              {
                "cursor-not-allowed pointer-events-none opacity-50": isDeleting,
              }
            )}
          >
            Edit
          </Link>
          <button
            className={clsx(
              "flex-1 bg-gray-100 hover:bg-red-700 hover:text-white font-light text-sm py-3 px-4",
              {
                "cursor-not-allowed pointer-events-none opacity-50 bg-red-300":
                  isDeleting,
              }
            )}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </>
  );
};

export default FileCard;
