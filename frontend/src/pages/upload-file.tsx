import Alert, { TAlertTypes } from "$components/alert";
import Loader from "$components/loader";
import Navbar from "$components/navbar";
import userService from "$services/user.service";
import * as React from "react";

type TAlertState = {
  show: boolean;
  type: TAlertTypes;
  msg: string;
};

export default function UploadFilePage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [description, setDescription] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [alertState, setAlertState] = React.useState<TAlertState>({
    show: false,
    type: "success",
    msg: "",
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    if (!file) {
      setProcessing(false);
      return setAlertState({
        show: true,
        type: "error",
        msg: "Please select a file to upload",
      });
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("name", file.name);

    try {
      const uploadedFile = await userService.uploadFile(formData);
      console.log({ uploadedFile });

      setAlertState({
        show: true,
        type: "success",
        msg: "File uploaded successfully",
      });
      setFile(null);
      setDescription("");
    } catch (error) {
      if (error instanceof Error) {
        return setAlertState({
          show: true,
          type: "error",
          msg: error.message,
        });
      }
    } finally {
      setProcessing(false);
    }
  };

  console.log({ alertState });

  return (
    <div className="bg-slate-200 min-h-screen w-svw">
      <Navbar />

      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        {alertState.show && (
          <Alert
            type={alertState.type}
            msg={alertState.msg}
            onClose={() =>
              setAlertState((alertState) => ({ ...alertState, show: false }))
            }
          />
        )}

        <form
          onSubmit={handleUpload}
          className="m-10 flex flex-col items-center justify-center"
        >
          <label className="flex flex-col items-center justify-center h-full w-full border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
            <div className="flex flex-col items-center justify-center pt-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-60 h-60 text-gray-500 group-hover:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="pt-1 text-lg tracking-wider text-gray-500 group-hover:text-gray-600 max-w-md overflow-hidden truncate">
                {file?.name || "Upload a file"}
              </p>
            </div>
            <input
              type="file"
              className="opacity-0"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0] || null);
                }
              }}
            />
          </label>

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="mt-10 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            rows={3}
            placeholder="File description"
          />

          <div className="flex justify-center w-full  mt-10">
            {!processing && (
              <input
                type="submit"
                value="Upload"
                className="w-full cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              />
            )}
            {processing && <Loader />}
          </div>
        </form>
      </div>
    </div>
  );
}
