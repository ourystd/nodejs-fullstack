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


const updateFile = async (file: {
  id: string;
  name?: string;
  description?: string;
}) => {
  const updatedFile = {
    ...(file.name && { name: file.name }),
    ...(file.description && { description: file.description }),
  };
  const res = await authHttpClient.patch<TFile, ErrorRes>(
    `/files/${file.id}`,
    updatedFile
  );
  if (!res.ok) {
    throw new Error(res.data?.message);
  }
  return res.data;
};

const getFile = async (id: string) => {
  const res = await authHttpClient.get<TFile, ErrorRes>(`/files/${id}`);
  if (!res.ok) {
    throw new Error(res.data?.message);
  }
  return res.data || null;
};

const deleteFile = async (id: string) => {
  const res = await authHttpClient.delete<{ message: string }, ErrorRes>(
    `/files/${id}`
  );
  if (!res.ok) {
    throw new Error(res.data?.message);
  }
  return res.data || null;
};

export default { uploadFile, getFiles, getFile, updateFile, deleteFile };
