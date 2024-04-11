import { Link } from "react-router-dom";
import { TFile } from "./types";

const FileCard = ({ file }: { file: TFile }) => {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border-2">
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
      </div>
    </>
  );
};

export default FileCard;
