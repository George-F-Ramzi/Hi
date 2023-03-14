import { useEffect, useRef } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { Socket } from "socket.io-client";
import { IMESSAGE, IUSER } from "../Types/authTypes";
import Message from "./message";

interface Prop {
  user: IUSER;
  photo: string;
  chat: IMESSAGE[];
  message: string;
  setMessage: (value: string) => void;
  setChat: (value: IMESSAGE[]) => void;
  newMessage: () => void;
  socket: Socket;
}

function ChattingSection({
  user,
  photo,
  chat,
  message,
  setMessage,
  newMessage,
  setChat,
  socket,
}: Prop) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
    socket.on("receive", (m) => {
      ReceiveHandler(m);
    });
    return () =>
      socket.off("receive", (m) => {
        ReceiveHandler(m);
      });
  }, [chat]);

  const ReceiveHandler = (m: IMESSAGE) => {
    let copy = chat.map((e) => {
      return e;
    });
    copy.push(m);
    if (copy[0].sender_id === m.sender_id) {
      setChat(copy);
    }
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
          <div className="w-full h-full mb-4 flex-col justify-end flex overflow-hidden">
            <div
              ref={ref}
              className="w-full h-fit flex flex-col p-6 scrollbar-hide overflow-y-scroll "
            >
              {Array.isArray(chat) &&
                chat.map((m, i) => {
                  return (
                    <Message key={i} text={m} partner={user} myPhoto={photo} />
                  );
                })}
            </div>
          </div>
          <div className="z-40 border-t drop-shadow-2xl bg-white mb-4  bottom-4 rounded h-[96px] w-[90%] flex items-center p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                newMessage();
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
                required
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex-col flex justify-center items-center">
          <FiMessageSquare size={"48px"} />
          <h5 className="mt-6 font-semibold">
            Start Chatting With Your Friends
          </h5>
        </div>
      )}
    </div>
  );
}

export default ChattingSection;
