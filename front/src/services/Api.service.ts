import axios, { AxiosInstance } from "axios";

const createAxiosInstance = (url: string): AxiosInstance => {
  const token = localStorage.getItem("token");
  const instance = axios.create({
    url,
    headers: {
      authorization: "Bearer " + token, //the token is a variable which holds the token
    },
  });
  return instance;
};

const get = async <T>(url: string): Promise<T> => {
  const instance = createAxiosInstance(url);
  const result = await instance.get<T>(url);
  if (result.status === 200 || result.status === 201) {
    return result.data;
  }
  throw new Error(
    `Call to ${url} failed with status ${result.status} and text ${result.statusText}`
  );
};

const post = async <T>(
  url: string,
  body: Record<string, unknown>
): Promise<T> => {
  const instance = createAxiosInstance(url);
  const result = await instance.post<T>(url, body);
  if (result.status === 200 || result.status === 201) {
    return result.data;
  }
  throw new Error(
    `Call to ${url} failed with status ${result.status} and text ${result.statusText}`
  );
};

const deleteObjectById = async <T>(url: string): Promise<T> => {
  const instance = createAxiosInstance(url);
  const result = await instance.delete<T>(url);
  if (result.status === 200 || result.status === 201) {
    return result.data;
  }
  throw new Error(
    `Call to ${url} failed with status ${result.status} and text ${result.statusText}`
  );
};

const put = async <T>(
  url: string,
  body: Record<string, unknown>
): Promise<T> => {
  const instance = createAxiosInstance(url);
  const result = await instance.put<T>(url, body);
  if (result.status === 200 || result.status === 201) {
    return result.data;
  }
  throw new Error(
    `Call to ${url} failed with status ${result.status} and text ${result.statusText}`
  );
};

const ApiService = {
  get,
  post,
  put,
  deleteObjectById,
};

export default ApiService;
