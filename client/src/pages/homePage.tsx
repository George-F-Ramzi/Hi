import { useEffect, useState } from "react";
import { FiCornerDownRight } from "react-icons/fi";
import ChattingSection from "../components/chattingSection";
import MainBar from "../components/mainBar";
import RequestsBar from "../components/requestsBar";
import Socket from "socket.io-client";
import { AxiosResponse } from "axios";
import { LoadingUser } from "../Api/authApi";
import { toast } from "react-toastify";
import { IUSER } from "../Types/authTypes";

let url: string = "http://localhost:3001";
let placeholder = { username: "", photo: "", id: 0, details: null };

function HomePage() {
  const [showRequest, setShowRequest] = useState<boolean>(true);
  const [user, setUser] = useState<IUSER>(placeholder);
  const [target, setTarget] = useState<IUSER>(placeholder);

  useEffect(() => {
    LoadUser();
  }, []);

  useEffect(() => {
    if (user.id != 0 && user.id != null) {
      let io = Socket(url);
      io.on("connect", () => {
        io.emit("ID", user.id);
      });
    }
  }, [user]);

  const LoadUser = async () => {
    try {
      let data: AxiosResponse = await LoadingUser();
      setUser(data.data);
    } catch (error) {
      toast("Somthing Wrong Happen", { type: "error" });
    }
  };

  return (
    <div className="flex relative">
      <MainBar mainUSER={user} setTarget={setTarget} />
      <ChattingSection user={target} photo={user.photo} myID={user.id} />
      {showRequest ? (
        <RequestsBar show={setShowRequest} />
      ) : (
        <div
          onClick={() => {
            setShowRequest(true);
          }}
          className="absolute right-8 top-8 h-[48px] w-[48px] bg-white flex  justify-center items-center rounded shadow-lg cursor-pointer"
        >
          <FiCornerDownRight />
        </div>
      )}
    </div>
  );
}

export default HomePage;
