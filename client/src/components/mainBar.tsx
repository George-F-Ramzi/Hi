import { FiSearch } from "react-icons/fi";
import ContactCard from "./contactCard";

function MainBar() {
  return (
    <div className="w-[380px] h-screen shadow-lg p-8 flex flex-col">
      <div className="flex items-center">
        <img
          src="https://picsum.photos/200/300"
          className="w-[54px] h-[54px] rounded-[100px]"
        />
        <p className="text-black ml-4 text-body1">George Fawzi</p>
      </div>
      <div className="mt-8  w-full min-h-[56px] relative rounded">
        <input
          className="w-full h-full outline-none pl-4 border border-default focus:border-active  focus:border-2 rounded"
          placeholder="What are you looking for?"
        />
        <FiSearch
          size={"24px"}
          className="absolute top-[30%] right-4 text-gray"
        />
      </div>
      <h3 className="mt-12 text-headline3 font-bold text-black mb-6">Chats</h3>
      <div className="h-full overflow-y-scroll scrollbar-hide">
        <ContactCard />
      </div>
    </div>
  );
}

export default MainBar;
