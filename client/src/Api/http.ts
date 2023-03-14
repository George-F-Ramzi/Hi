import axios from "axios";

export default axios.create({
  baseURL: "https://hi-node-js.vercel.app/",
  headers: {
    "x-auth-token": localStorage.getItem("token"),
    "Access-Control-Allow-Origin": "https://hi-eight-peach.vercel.app/",
  },
});
