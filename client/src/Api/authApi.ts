import http from "./http";

export async function LoadingUser() {
  return await http.get("/user");
}

export async function Search(value: string) {
  return await http.get(`/search/${value}`);
}

export async function Contacts() {
  return await http.get(`/contacts`);
}

export async function LastMessage(id: number) {
  return await http.get(`/last/${id}`);
}

export async function IsContact(id: number) {
  return await http.get(`/isContact/${id}`);
}
