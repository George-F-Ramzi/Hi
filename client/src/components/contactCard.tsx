import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LastMessage } from "../Api/authApi";
import { IUSER } from "../Types/authTypes";

interface Prop {
  user: IUSER;
  setTarget: (user: IUSER) => void;
}

function ContactCard({ user, setTarget }: Prop) {
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    LoadLastMessage();
  }, []);

  const LoadLastMessage = async () => {
    try {
      let data: AxiosResponse = await LastMessage(user.id);
      setLastMessage(data.data);
    } catch (error) {
      toast("Somthing Wrong Happen", { type: "error" });
    }
  };

  return (
    <div
      onClick={() => setTarget(user)}
      className="w-full flex mb-12 items-center cursor-pointer "
    >
      <img
        src={user.photo}
        className="w-[54px] h-[54px] rounded-[100px] min-w-[54px]"
      />
      <div className="ml-[16px] w-full ">
        <p className="text-body1 mb-1 font-medium text-black grow">
          {user.username}
        </p>
        <p className="text-body2 font-normal w-full text-gray ">
          {lastMessage != "" ? lastMessage : "Added to friend list"}
        </p>
      </div>
    </div>
  );
}

export default ContactCard;
