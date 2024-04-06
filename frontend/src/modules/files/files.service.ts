import { authHttpClient } from "$services/http-client";
import { TFile } from "./types";

type ErrorRes = {
  message: string;
};

const uploadFile = async (formData: FormData) => {
  const res = await authHttpClient.post<TFile, ErrorRes>(`/files`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!res.ok) {
    throw new Error(res.data?.message);
  }

  return res.data;
};

const getFiles = async () => {
  const res = await authHttpClient.get<TFile[], ErrorRes>(`/files`);
  if (!res.ok) {
    throw new Error(res.data?.message);
  }
  if (!res.data) {
    return [];
  }
  return res.data;
};

export default { uploadFile, getFiles };
