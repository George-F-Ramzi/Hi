import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { FiXSquare } from "react-icons/fi";
import { toast } from "react-toastify";
import { AcceptRequest, RemoveRequest, Requests } from "../Api/authApi";
import { IRequests } from "../Types/authTypes";
import RequestCard from "./requestCard";

interface Prop {
  show: (active: boolean) => void;
}

function RequestsBar({ show }: Prop) {
  const [requests, setRequests] = useState<IRequests[]>([]);

  useEffect(() => {
    CheckRequest();
  }, []);

  const CheckRequest = async () => {
    try {
      let { data }: AxiosResponse = await Requests();
      setRequests(data);
    } catch (error) {
      toast("Something Wrong Happen");
    }
  };

  const Accept = async (id: number) => {
    try {
      await AcceptRequest(id);
      CheckRequest();
    } catch (error) {
      toast("Something Wrong Happen");
    }
  };

  const Remove = async (id: number) => {
    try {
      await RemoveRequest(id);
      CheckRequest();
    } catch (error) {
      toast("Something Wrong Happen");
    }
  };

  return (
    <div className="min-w-[380px] w-[380px] h-screen z-20 shadow-2xl p-8 flex items-center flex-col relative">
      <p className="text-body2 mb-[64px]">Freind Requests</p>
      <div className=" h-ful overflow-y-scroll scrollbar-hide">
        {requests.length != 0 ? (
          requests.map((r, i) => {
            return (
              <RequestCard
                remove={Remove}
                accept={Accept}
                key={i}
                request={r}
              />
            );
          })
        ) : (
          <p className="mt-8 w-full text-center">No Requests For You</p>
        )}
      </div>
      <FiXSquare
        onClick={() => show(false)}
        size={"24px"}
        className="absolute left-4 hover:cursor-pointer"
      />
    </div>
  );
}

export default RequestsBar;
