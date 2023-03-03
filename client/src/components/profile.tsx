import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiSettings } from "react-icons/fi";
import { toast } from "react-toastify";
import { ProfileState } from "../Api/authApi";
import { IUSER } from "../Types/authTypes";

interface Prop {
  user: IUSER;
  isMe: boolean;
  isContact: boolean;
  close: (check: boolean) => void;
}

function Profile({ user, isMe, isContact, close }: Prop) {
  const [sending, setSending] = useState<boolean>(false);
  const [receiving, setReceiving] = useState<boolean>(false);

  useEffect(() => {
    if (isMe) return;
    if (isContact) return;
    CheckRequest();
  }, [user]);

  const CheckRequest = async () => {
    let state: string;
    try {
      let { data }: AxiosResponse = await ProfileState(user.id);
      state = data;

      if (state.includes("Is Requesting")) setReceiving(true);
      else if (state.includes("Is Sending")) setSending(true);
      else if (state.includes("Is Not Sending")) {
        setSending(false);
        setReceiving(false);
      }

      //
    } catch (error) {
      toast("Something Wrong Happen");
    }
  };

  return (
    <div>
      <FiArrowLeft
        onClick={() => close(false)}
        size={"22px"}
        className="cursor-pointer"
      />
      <div className="mt-8 flex items-center">
        <img
          className="w-[64px] h-[64px] rounded-[100px] min-w-[64px]"
          src={user.photo}
        />
        <div className="ml-4 w-full">
          <div className="flex items-center">
            <h5 className="text-black font-semibold text-body1 grow">
              {user.username}
            </h5>
            {isMe ? (
              <FiSettings size={"18px"} className="cursor-pointer" />
            ) : (
              ""
            )}
          </div>
          <p className="text-body2 mt-2 text-slate-700">{user.details}</p>
        </div>
      </div>
      {isContact ? (
        <button className="shadow-sm w-full mt-12 py-[12px] bg-primary rounded text-white uppercase text-body1">
          Start Chatting
        </button>
      ) : (
        ""
      )}
      {sending && !receiving ? (
        <button className="shadow-sm w-full mt-12 py-[12px] bg-gray2 rounded text-black uppercase text-body1">
          Remove Request
        </button>
      ) : (
        ""
      )}
      {receiving && !sending ? (
        <div className="flex mt-12 ">
          <button className="shadow-sm w-full  py-[12px] bg-primary rounded text-white uppercase text-body1">
            Accept
          </button>
          <button className="shadow-sm w-full  ml-4 py-[12px] bg-gray2 rounded text-black uppercase text-body1">
            Remove
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
