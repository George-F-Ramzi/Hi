import { FiXSquare } from "react-icons/fi";
import RequestCard from "./requestCard";

interface Prop {
  show: (active: boolean) => void;
}

function RequestsBar({ show }: Prop) {
  return (
    <div className="min-w-[380px] w-[380px] h-screen z-20 shadow-2xl p-8 flex items-center flex-col relative">
      <p className="text-body2 mb-[64px]">Freind Requests</p>
      <div className=" h-ful overflow-y-scroll scrollbar-hide">
        <RequestCard />
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
