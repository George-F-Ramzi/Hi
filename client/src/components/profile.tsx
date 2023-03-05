import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiSettings } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  AcceptRequest,
  CancelRequest,
  IsReceiving,
  IsSending,
  RemoveRequest,
  SendRequest,
} from "../Api/authApi";
import { IUSER } from "../Types/authTypes";

interface Prop {
  user: IUSER;
  isMe: boolean;
  isContact: boolean;
  close: (check: boolean) => void;
  setTarget: (user: IUSER) => void;
}

function Profile({ user, isMe, isContact, close, setTarget }: Prop) {
  const [sending, setSending] = useState<boolean>(false);
  const [receiving, setReceiving] = useState<boolean>(false);

  useEffect(() => {
    setSending(false);
    setReceiving(false);
    if (isMe) return;
    if (isContact) return;
    CheckReceving();
  }, [user]);

  const CheckReceving = async () => {
    let state: string;
    try {
      let { data }: AxiosResponse = await IsReceiving(user.id);
      state = data;
      if (state.includes("Is Not Requesting")) {
        CheckSending();
      } else {
        setReceiving(true);
      }
    } catch (error) {
      toast("Something Wrong Happen");
    }
  };

  const CheckSending = async () => {
    let state: string;
    try {
      let { data }: AxiosResponse = await IsSending(user.id);
      state = data;
      if (state.includes("Is Not Sending")) {
        setSending(false);
      } else {
        setSending(true);
      }
    } catch (error) {
      toast("Something Wrong Happen", { type: "error" });
    }
  };

  return (
    <div>
      <FiArrowLeft
        onClick={() => close(false)}
        size={"22px"}
        className="cursor-pointer"
      />
      <h4 className="my-8 text-headline4 font-bold">
        {isMe ? "My Profile" : "Profile"}
      </h4>
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
        <button
          onClick={() => setTarget(user)}
          className="shadow-sm w-full mt-12 py-[12px] bg-primary rounded text-white uppercase text-body1"
        >
          Start Chatting
        </button>
      ) : (
        ""
      )}
      {sending ? (
        <button
          onClick={async () => {
            try {
              await CancelRequest(user.id);
              isContact = false;
              setSending(false);
              setReceiving(false);
            } catch (error) {
              toast("Something Wrong Happen", { type: "error" });
            }
          }}
          className="shadow-sm w-full mt-12 py-[12px] bg-gray2 rounded text-black uppercase text-body1"
        >
          Remove Request
        </button>
      ) : (
        ""
      )}
      {receiving ? (
        <div className="flex mt-12 ">
          <button
            onClick={async () => {
              try {
                await AcceptRequest(user.id);
                isContact = false;
                setSending(false);
                setReceiving(false);
              } catch (error) {
                toast("Something Wrong Happen", { type: "error" });
              }
            }}
            className="shadow-sm w-full  py-[12px] bg-primary rounded text-white uppercase text-body1"
          >
            Accept
          </button>
          <button
            onClick={async () => {
              try {
                await RemoveRequest(user.id);
                isContact = false;
                setSending(false);
                setReceiving(false);
              } catch (error) {
                toast("Something Wrong Happen", { type: "error" });
              }
            }}
            className="shadow-sm w-full  ml-4 py-[12px] bg-gray2 rounded text-black uppercase text-body1"
          >
            Remove
          </button>
        </div>
      ) : (
        ""
      )}
      {!receiving && !sending && !isContact && !isMe ? (
        <button
          onClick={async () => {
            try {
              await SendRequest(user.id);
              setSending(true);
            } catch (error) {
              toast("Something Wrong Happen", { type: "error" });
            }
          }}
          className="shadow-sm w-full mt-12 py-[12px] bg-primary rounded text-white uppercase text-body1"
        >
          Send Request
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
