import { authHttpClient } from "./http-client";

type TFile = {
  name: string;
  description: string;
  file: File;
};

type TCreatedFile = {
  id: string;
  name: string;
  description: string;
  path: string;
  createdAt: Date;
  createdBy: string;
};

type ErrorRes = {
  message: string;
};

const uploadFile = async (formData: FormData) => {
  const res = await authHttpClient.post<TCreatedFile, ErrorRes>(
    `/files`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  if (!res.ok) {
    throw new Error(res.data?.message);
  }

  return res.data;
};

export default { uploadFile };
