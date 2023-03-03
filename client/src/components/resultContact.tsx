import React from "react";
import { IUSER } from "../Types/authTypes";

interface Prop {
  user: IUSER;
}

function ResultContact({ user }: Prop) {
  return (
    <div className="w-full flex mb-12 items-center  ">
      <img
        src={user.photo}
        className="w-[54px] h-[54px] rounded-[100px] min-w-[54px]"
      />
      <div className="ml-[16px] w-full ">
        <p className="text-body1 mb-1 font-medium text-black grow">
          {user.username}
        </p>
        <p className="text-body2 font-normal w-full text-gray ">
          A new message from george
        </p>
      </div>
    </div>
  );
}

export default ResultContact;
