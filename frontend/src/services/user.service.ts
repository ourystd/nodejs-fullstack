import { authHttpClient } from "./http-client";

export type TCreatedFile = {
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

const getFiles = async () => {
  const res = await authHttpClient.get<TCreatedFile[], ErrorRes>(`/files`);
  if (!res.ok) {
    throw new Error(res.data?.message);
  }
  if (!res.data) {
    return [];
  }
  return res.data;
};

export default { uploadFile, getFiles };
