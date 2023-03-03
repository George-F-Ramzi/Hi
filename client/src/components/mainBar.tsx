import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { Contacts, LoadingUser, Search } from "../Api/authApi";
import { IUSER } from "../Types/authTypes";
import ContactCard from "./contactCard";
import ResultContact from "./resultContact";

let placeholder = { username: "", photo: "", id: 0, details: null };

function MainBar() {
  const [user, setUser] = useState<IUSER>(placeholder);
  const [search, setSearch] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<IUSER[]>([]);
  const [contactsData, setContactsData] = useState<IUSER[]>([]);
  const [resultUI, setResultUI] = useState<boolean>(false);

  useEffect(() => {
    LoadUser();
    LoadContacts();
  }, []);

  const LoadUser = async () => {
    try {
      let data: AxiosResponse = await LoadingUser();
      setUser(data.data);
    } catch (error) {
      toast("Somthing Wrong Happen", { type: "error" });
    }
  };

  const LoadContacts = async () => {
    try {
      let data: AxiosResponse = await Contacts();
      setContactsData(data.data);
    } catch (error) {
      toast("Somthing Wrong Happen", { type: "error" });
    }
  };

  const SearchUsers = async () => {
    try {
      let data: AxiosResponse = await Search(search);
      setSearchedUsers(data.data);
      setResultUI(true);
    } catch (error) {
      toast("Somthing Wrong Happen", { type: "error" });
    }
  };

  return (
    <div className="min-w-[380px] z-20 w-[380px] h-screen shadow-2xl p-8 flex flex-col">
      <div className="flex items-center">
        <img src={user.photo} className="w-[54px] h-[54px] rounded-[100px]" />
        <p className="text-black ml-4 text-body1">{user.username}</p>
      </div>
      <div className="mt-8  w-full min-h-[56px] relative rounded">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            SearchUsers();
          }}
          className="w-full h-full"
        >
          <input
            className="w-full h-full outline-none pl-4 border border-default focus:border-active  focus:border-2 rounded"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </form>
        <FiSearch
          size={"24px"}
          className="absolute top-[30%] right-4 text-gray"
        />
      </div>
      <div className="flex mt-12 items-center mb-6">
        <h3 className="text-headline3 font-bold grow text-black">
          {resultUI ? "Result" : "Chats"}
        </h3>
        {resultUI ? (
          <FiX
            size={"24px"}
            className="cursor-pointer"
            onClick={() => {
              setResultUI(false);
              setSearch("");
            }}
          />
        ) : (
          ""
        )}
      </div>
      <div className="h-full overflow-y-scroll scrollbar-hide">
        {resultUI ? (
          searchedUsers.length != 0 ? (
            searchedUsers.map((c, i) => {
              return <ResultContact key={i} user={c} />;
            })
          ) : (
            <p className="mt-8 w-full text-center">Results Not Found</p>
          )
        ) : (
          ""
        )}
        {!resultUI ? (
          contactsData.length != 0 ? (
            contactsData.map((c, i) => {
              return <ContactCard key={i} user={c} />;
            })
          ) : (
            <p className="mt-8 w-full text-center">No Contacts</p>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MainBar;
