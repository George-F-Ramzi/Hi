import { IMESSAGE, IUSER } from "../Types/authTypes";

interface Prop {
  text: IMESSAGE;
  partner: IUSER;
  myPhoto: string;
}

function Message({ text, partner, myPhoto }: Prop) {
  return (
    <>
      {text.sender_id === partner.id ? (
        <div className="w-full flex flex-col my-4">
          <p className=" mb-1 ml-12 max-w-[280px] h-fit p-[12px] bg-gray4 text-body1 font-normal w-fit rounded">
            {text.message}
          </p>
          <img
            src={partner.photo}
            className="min-w-[40px] w-[40px] h-[40px] rounded-[100px] mb-4"
          />
        </div>
      ) : (
        <div className="w-full flex justify-end  my-4">
          <div className="flex-col max-w-[280px] ">
            <p className=" mb-1 mr-12 max-w-fit h-fit p-[12px] bg-blue1 text-white text-body1 font-normal w-fit rounded">
              {text.message}
            </p>
            <div className="w-full flex justify-end max-h-[40px]">
              <img
                src={myPhoto}
                className="min-w-[40px] w-[40px] h-[40px] rounded-[100px] mb-4"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
