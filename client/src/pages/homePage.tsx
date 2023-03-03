import { useEffect, useState } from "react";
import { FiCornerDownRight } from "react-icons/fi";
import ChattingSection from "../components/chattingSection";
import MainBar from "../components/mainBar";
import RequestsBar from "../components/requestsBar";

function HomePage() {
  const [showRequest, setShowRequest] = useState<boolean>(true);
  useEffect(() => {}, []);

  return (
    <div className="flex relative">
      <MainBar />
      <ChattingSection />
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
  );
}

export default HomePage;
