import { create } from "apisauce";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const httpClient = create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const authHttpClient = create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

authHttpClient.addRequestTransform((request) => {
  const token = localStorage.getItem("access_token");

  if (token && request.headers) {
    request.headers["x-access-token"] = token;
  }
});

const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

authHttpClient.addAsyncRequestTransform(async () => {
  console.log("wait");
  await sleep(3000);
  console.log("done");
});

export { authHttpClient, httpClient };

