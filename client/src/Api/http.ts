import axios from "axios";

export default axios.create({
  baseURL: "hi-node-4yx80pf29-george-f-ramzi.vercel.app",
  headers: { "x-auth-token": localStorage.getItem("token") },
});
