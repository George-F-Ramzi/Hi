import axios from "axios";

export default axios.create({
  baseURL: "https://hi-node-js.vercel.app/",
  headers: {
    "x-auth-token": localStorage.getItem("token"),
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
});
