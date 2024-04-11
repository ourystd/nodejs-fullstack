import Navbar from "$components/navbar";
import filesService from "$modules/files/files.service";
import { TFile } from "$modules/files/types";
import FileUpdateForm from "$modules/files/update-file-form";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function FileDetailsPage() {
  const { fileId } = useParams();
  const [file, setFile] = React.useState<TFile | null>(null);

  React.useEffect(() => {
    const fetchFile = async () => {
      if (!fileId) {
        return;
      }
      const file = await filesService.getFile(fileId);
      setFile(file);
    };
    fetchFile();
  }, [fileId]);

  return (
    <div className="bg-slate-200 min-h-screen w-svw">
      <Navbar />

      <div className="py-12 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div>
          <Link to="/files" className="text-indigo-500 hover:text-indigo-700">
            Back to files
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-90 mt-2 mb-4">
            {fileId}
          </h1>
        </div>

        <div>{file && <FileUpdateForm file={file} />}</div>
      </div>
    </div>
  );
}
