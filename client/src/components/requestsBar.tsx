import RequestCard from "./requestCard";

function RequestsBar() {
  return (
    <div className="fixed right-0 w-[380px] h-screen shadow-lg p-8 flex items-center flex-col">
      <p className="text-body2 mb-[64px]">Freind Requests</p>
      <div className=" h-ful overflow-y-scroll scrollbar-hide">
        <RequestCard />
      </div>
    </div>
  );
}

export default RequestsBar;
