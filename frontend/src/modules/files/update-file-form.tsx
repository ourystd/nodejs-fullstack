import Alert, { TAlertTypes } from "$components/alert";
import Loader from "$components/loader";
import filesService from "./files.service";
import { TFile } from "./types";
import * as React from "react";

type TAlertState = {
  show: boolean;
  type: TAlertTypes;
  msg: string;
};

export default function FileUpdateForm({ file }: { file: TFile }) {
  const [filename, setFilename] = React.useState(file.name || "");
  const [description, setDescription] = React.useState(file.description || "");
  const [alertState, setAlertState] = React.useState<TAlertState>({
    show: false,
    type: "success",
    msg: "",
  });
  const [processing, setProcessing] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    if (!filename && !description) {
      setAlertState({
        show: true,
        type: "error",
        msg: "File name and description cannot be empty",
      });

      return setProcessing(false);
    }

    try {
      await filesService.updateFile({
        id: file.id,
        ...(filename && { name: filename }),
        ...(description && { description }),
      });

      setAlertState({
        show: true,
        type: "success",
        msg: "File infos updated successfully",
      });
    } catch (error) {
      setAlertState({
        show: true,
        type: "error",
        msg: error instanceof Error ? error.message : "An error occured",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded overflow-hidden bg-white border-2 flex justify-between gap-x-3 p-4"
    >
      {alertState.show && (
        <div className="fixed bottom-0 left-0 w-full flex items-center justify-center">
          <Alert
            msg={alertState.msg}
            type={alertState.type}
            onClose={() =>
              setAlertState((state) => ({ ...state, show: false }))
            }
          />
        </div>
      )}
      <div className="w-full">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-1 text-md font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={file.name}
            onChange={(e) => setFilename(e.target.value)}
            className="w-80 border border-gray-300 rounded p-3 bg-slate-50 hover:bg-white"
            placeholder="File name..."
            disabled={processing}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-1 text-md font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={file.description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-80 border border-gray-300 rounded p-3 resize-none bg-slate-50 hover:bg-white"
            placeholder="Write a description..."
            disabled={processing}
          />
        </div>
        <div className="w-80 flex justify-center">
          {!processing && (
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save changes
            </button>
          )}
          {processing && <Loader />}
        </div>
      </div>
      <iframe
        style={{ height: "20rem" }}
        className="w-full"
        src={file.path}
        title={file.name}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
    </form>
  );
}
