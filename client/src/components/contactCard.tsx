function ContactCard() {
  return (
    <div className="w-full flex mb-12 items-center  ">
      <img
        src="https://picsum.photos/200/300"
        className="w-[54px] h-[54px] rounded-[100px] min-w-[54px]"
      />
      <div className="ml-[16px] w-full ">
        <div className="flex">
          <p className="text-body1 mb-1 font-medium text-black grow">
            George Fawzi
          </p>
          <p className="text-body2 font-normal  bg-primary shadow-sm h-[24px] w-[24px] flex justify-center rounded items-center text-white ">
            4
          </p>
        </div>
        <p className="text-body2 font-normal w-full text-gray ">
          A new message from george
        </p>
      </div>
    </div>
  );
}

export default ContactCard;
