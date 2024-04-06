import filesService from "$modules/files/files.service";
import * as React from "react";
import FileCard from "./file-card";
import Loader from "$components/loader";
import { TFile } from "./types";

type TStatus = "idle" | "loading" | "success" | "error";

type TAction =
  | { type: "SET_DATA"; payload: TFile[] }
  | { type: "LOADING" }
  | { type: "ERROR"; payload: string }
  | { type: "RESET" };

type TState = {
  data: TFile[];
  status: TStatus;
  error?: string;
};

const initialState: TState = {
  data: [],
  status: "idle",
};

const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload, status: "success" };
    case "LOADING":
      return { ...state, status: "loading" };
    case "ERROR":
      return { ...state, error: action.payload, status: "error" };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default function FileList() {
  const [{ data: files, status, error }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const fetchFiles = React.useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const files = await filesService.getFiles();
      dispatch({ type: "SET_DATA", payload: files });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Error loading files. Try again.",
      });
    }
  }, []);

  React.useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  if (status === "error") {
    return (
      <div className="flex flex-col items-center w-full py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => {
            fetchFiles();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try again
        </button>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center w-full py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}
