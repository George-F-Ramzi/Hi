import { useEffect, useState } from "react";
import { FiCornerDownRight } from "react-icons/fi";
import ChattingSection from "../components/chattingSection";
import MainBar from "../components/mainBar";
import RequestsBar from "../components/requestsBar";
import { io, Socket } from "socket.io-client";
import { AxiosResponse } from "axios";
import { Converstion, LoadingUser } from "../Api/authApi";
import { toast } from "react-toastify";
import { IMESSAGE, IUSER } from "../Types/authTypes";
import lodash from "lodash";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

let url: string = "https://hi-node-js.vercel.app/";
let placeholder = { username: "", photo: "", id: 0, details: null };

function HomePage() {
  const [showRequest, setShowRequest] = useState<boolean>(true);
  const [user, setUser] = useState<IUSER>(placeholder);
  const [target, setTarget] = useState<IUSER>(placeholder);
  const [chat, setChat] = useState<IMESSAGE[]>([]);
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket>(io);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect((): any => {
    setSocket(
      io(url, {
        withCredentials: true,
        extraHeaders: {
          "Access-Control-Allow-Origin": "https://hi-eight-peach.vercel.app",
        },
      })
    );
    LoadUser();
    return () => socket.close();
  }, []);

  useEffect(() => {
    LoadChat();
  }, [target]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", user.id);
      socket.on("Joined", () => {
        toast("Your Are Online Now", { type: "success" });
        setChat([{ date: "", message: "", sender_id: 0 }]);
      });
    });
  }, [user.id]);

  const LoadUser = async () => {
    try {
      setLoading(true);
      let { data }: AxiosResponse = await LoadingUser();
      setUser(data);
      setLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  };

  const AppendMessage = () => {
    let m: IMESSAGE = { date: "", message, sender_id: user.id };
    socket.emit("send", [m, target.id]);
    let copy = chat.map((e) => {
      return e;
    });
    setChat([...copy, m]);
  };

  const LoadChat = async () => {
    try {
      let { data }: AxiosResponse = await Converstion(target.id);
      if (lodash.isEmpty(data)) {
        setChat([{ date: "", message: "", sender_id: target.id }]);
      } else setChat(data);
    } catch (error) {
      toast("Something Wrong Happen", { type: "error" });
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <TailSpin color="blue" />
        </div>
      ) : (
        <div className="flex relative">
          <MainBar mainUSER={user} setTarget={setTarget} />
          <ChattingSection
            setMessage={setMessage}
            message={message}
            user={target}
            photo={user.photo}
            chat={chat}
            newMessage={AppendMessage}
            setChat={setChat}
            socket={socket}
          />
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
      )}
    </>
  );
}

export default HomePage;
