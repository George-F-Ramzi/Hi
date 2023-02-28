import axios, { AxiosPromise, AxiosResponse } from "axios";

let api = axios.create({
  baseURL: "http://localhost:3001",
});

export const LoginApi = async (data: object): Promise<AxiosPromise> => {
  let response: AxiosResponse<object> = await api.post("/login", data);
  return response;
};
