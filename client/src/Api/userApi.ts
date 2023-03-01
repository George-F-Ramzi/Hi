import http from "./http";

export async function LoginApi(data: object) {
  return await http.post("/login", data);
}

export async function RegisterApi(data: object) {
  return await http.post("/join", data);
}

export async function AllowJoin() {
  return await http.post("/allow");
}
