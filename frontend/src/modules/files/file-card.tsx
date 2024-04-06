type TFile = {
  name: string;
  description: string;
  path: string;
};

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
          <div className="font-bold text-xl mb-2">{file.name}</div>
          <p className="text-gray-700 text-base">{file.description}</p>
        </div>
      </div>
    </>
  );
};

export default FileCard;
