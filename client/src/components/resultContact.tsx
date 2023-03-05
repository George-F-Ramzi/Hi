import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IsContact } from "../Api/authApi";
import { IProfile, IUSER } from "../Types/authTypes";

interface Prop {
  user: IUSER;
  open: ({ user, isMe, isContact }: IProfile) => void;
}

function ResultContact({ user, open }: Prop) {
  const [isContact, setIsContact] = useState<boolean>(false);
  const [isMe, setIsMe] = useState<boolean>(false);

  useEffect(() => {
    setIsMe(false);
    CheckIsContact();
  }, [user]);

  const CheckIsContact = async () => {
    let state: string;
    try {
      let { data }: AxiosResponse = await IsContact(user.id);
      state = data;

      if (state.includes("Not A Contact")) {
        setIsContact(false);
      } else if (state.includes("Is A Contact")) setIsContact(true);
      else setIsMe(true);

      //
    } catch (error) {
      toast("Something Wrong Happen");
    }
  };

  return (
    <div
      onClick={() => {
        open({ user, isMe, isContact });
      }}
      className="w-full flex mb-12 items-center cursor-pointer  "
    >
      <img
        src={user.photo}
        className="w-[54px] h-[54px] rounded-[100px] min-w-[54px]"
      />
      <div className="ml-[16px] w-full ">
        <p className="text-body1 mb-1 font-medium text-black grow">
          {user.username}
        </p>
        {isMe ? (
          <p className="text-body2 font-normal w-full text-gray ">Thats You</p>
        ) : (
          <p className="text-body2 font-normal w-full text-gray ">
            {isContact ? "Added to freind list" : "Not in freind list"}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResultContact;
