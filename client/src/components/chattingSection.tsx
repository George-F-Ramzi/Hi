import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Converstion } from "../Api/authApi";
import { IMESSAGE, IUSER } from "../Types/authTypes";
import Message from "./message";

interface Prop {
  user: IUSER;
  photo: string;
  myID: number;
}

function ChattingSection({ user, photo, myID }: Prop) {
  const [chat, setChat] = useState<IMESSAGE[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (user.username != "") LoadChat();
  }, [user]);

  const LoadChat = async () => {
    try {
      let { data }: AxiosResponse = await Converstion(user.id);
      setChat(data);
    } catch (error) {
      toast("Somthing Wrong Happen", { type: "error" });
    }
  };

  const AppendMessage = () => {
    let newObj: IMESSAGE = { date: "", message, sender_id: myID };
    let Chat: IMESSAGE[] = chat;
    Chat.push(newObj);
    setChat(Chat);
  };

  return (
    <div className="w-full h-screen bg-gray5 flex justify-center relative">
      {user.username != "" ? (
        <div className="flex flex-col w-full items-center ">
          <div className="mt-[60px] flex flex-col items-center">
            <img
              src={user.photo}
              className="w-[72px] h-[72px] rounded-[100px]"
            />
            <h5 className="text-body1 mt-4 font-bold ">{user.username}</h5>
          </div>
          <div className="w-full h-full overflow-y-scroll scrollbar-hide p-6 flex flex-col justify-end">
            {Array.isArray(chat) &&
              chat.map((m, i) => {
                return (
                  <Message key={i} text={m} partner={user} myPhoto={photo} />
                );
              })}
          </div>
          <div className="z-40 border-t drop-shadow-2xl bg-white mb-4  bottom-4 rounded h-[96px] w-[90%] flex items-center p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                AppendMessage();
                setMessage("");
              }}
              className="w-full"
            >
              <input
                placeholder="What's on your mind?"
                className="h-[56px] w-full pl-4 border outline-none rounded border-default"
                value={message}
                onChange={(e) => {
                  e.preventDefault();
                  setMessage(e.target.value);
                }}
              />
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChattingSection;
