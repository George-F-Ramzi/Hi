import axios from "axios";

export default axios.create({
  baseURL: "https://hi-server.onrender.com/",
  headers: {
    "x-auth-token": localStorage.getItem("token"),
  },
});
