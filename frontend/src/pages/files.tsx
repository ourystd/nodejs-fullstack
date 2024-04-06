import Navbar from "$components/navbar";

import FileList from "$modules/files/file-list";

export default function FilesListPage() {
  return (
    <div className="bg-slate-200 min-h-screen w-svw">
      <Navbar />

      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          My files
        </h2>
        {/* <div className="max-w-md w-full"></div> */}

        <FileList />
      </div>
    </div>
  );
}
