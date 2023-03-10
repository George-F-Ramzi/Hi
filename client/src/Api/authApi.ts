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

export async function AcceptRequest(id: number) {
  return await http.post(`/acceptRequest/${id}`);
}

export async function Requests() {
  return await http.get(`/requests`);
}

export async function RemoveRequest(id: number) {
  return await http.post(`/removeRequest/${id}`);
}

export async function SendRequest(id: number) {
  return await http.post(`/sendRequest/${id}`);
}

export async function IsReceiving(id: number) {
  return await http.get(`/isReceving/${id}`);
}

export async function IsSending(id: number) {
  return await http.get(`/isSending/${id}`);
}

export async function CancelRequest(id: number) {
  return await http.post(`/cancelRequest/${id}`);
}

export async function Converstion(id: number) {
  return await http.get(`/converstion/${id}`);
}
