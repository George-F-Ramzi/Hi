function RequestCard() {
  return (
    <div className="w-full flex mb-12 ">
      <img
        src="https://picsum.photos/200/300"
        className="w-[54px] h-[54px] rounded-[100px]"
      />
      <div className="ml-[16px] ">
        <div className="flex">
          <p className="text-body1 mb-1 font-medium text-black grow">
            George Fawzi
          </p>
          <p className="text-body1 font-medium text-black ">1d</p>
        </div>
        <p className="text-body2 font-normal w-full text-gray ">
          George sent you a Freind request
        </p>
        <div className="mt-[16px] flex">
          <button className="bg-primary text-white px-4 py-2 text-body2 rounded shadow-sm uppercase">
            Accept
          </button>
          <button className="bg-gray2 ml-[16px] text-black text-body2  px-4 py-2 rounded  uppercase">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;
