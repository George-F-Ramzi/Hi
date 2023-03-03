function ChattingSection() {
  return (
    <div className="w-full h-screen bg-gray3 flex justify-center relative">
      <div className="mt-[100px] flex flex-col items-center">
        <img
          src="https://picsum.photos/200/300"
          className="w-[72px] h-[72px] rounded-[100px]"
        />
        <h5 className="text-body1 mt-4 font-meduim ">George fawzi Ramzi</h5>
      </div>
      <div className="z-40 shadow-lg bg-white absolute bottom-4 rounded h-[96px] w-[90%] flex items-center p-4">
        <input
          placeholder="What's on your mind?"
          className="h-[56px] w-full pl-4 border outline-none rounded border-default"
        />
      </div>
    </div>
  );
}

export default ChattingSection;
