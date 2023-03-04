import { IRequests } from "../Types/authTypes";

interface Prop {
  request: IRequests;
  accept: (id: number) => void;
  remove: (id: number) => void;
}
function DateFormating(value: string) {
  let now = new Date(value).toLocaleTimeString("en-us", { hour: "2-digit" });

  return now;
}

function RequestCard({ request, accept, remove }: Prop) {
  return (
    <div className="min-w-full flex mb-12  ">
      <img src={request.photo} className="w-[54px] h-[54px] rounded-[100px]" />
      <div className="ml-[16px] ">
        <div className="flex ">
          <p className="text-body1 mb-1 font-medium text-black grow">
            {request.username}
          </p>
          <p className="text-body1 font-medium text-black ">
            {DateFormating(request.date)}
          </p>
        </div>
        <p className="text-body2 min-w-[240px] font-normal text-gray ">
          {request.username.split(" ")[0]} sent you a Freind request
        </p>
        <div className="mt-[16px] flex">
          <button
            onClick={() => {
              accept(request.id);
            }}
            className="bg-primary text-white px-4 py-2 text-body2 rounded shadow-sm uppercase"
          >
            Accept
          </button>
          <button
            onClick={() => {
              remove(request.id);
            }}
            className="bg-gray2 ml-[16px] text-black text-body2  px-4 py-2 rounded  uppercase"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;
