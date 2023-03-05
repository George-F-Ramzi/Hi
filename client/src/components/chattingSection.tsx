import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Converstion } from "../Api/authApi";
import { IMESSAGE, IUSER } from "../Types/authTypes";

interface Prop {
  user: IUSER;
}

function ChattingSection({ user }: Prop) {
  const [chat, setChat] = useState<IMESSAGE[]>();

  useEffect(() => {
    if (user.username != "") LoadChat();
  }, [user]);

  useEffect(() => {
    console.log(chat);
  }, [chat]);

  const LoadChat = async () => {
    try {
      let { data }: AxiosResponse = await Converstion(user.id);
      setChat(data);
    } catch (error) {
      toast("Somthing Wrong Happen", { type: "error" });
    }
  };

  return (
    <div className="w-full h-screen bg-gray3 flex justify-center relative">
      {user.username != "" ? (
        <>
          <div className="mt-[100px] flex flex-col items-center">
            <img
              src={user.photo}
              className="w-[72px] h-[72px] rounded-[100px]"
            />
            <h5 className="text-body1 mt-4 font-meduim ">{user.username}</h5>
          </div>
          <div className="z-40 shadow-lg bg-white absolute bottom-4 rounded h-[96px] w-[90%] flex items-center p-4">
            <input
              placeholder="What's on your mind?"
              className="h-[56px] w-full pl-4 border outline-none rounded border-default"
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChattingSection;
