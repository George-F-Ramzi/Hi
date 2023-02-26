import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const div = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("connect", () => {
      setName(socket.id);
    });
    socket.on("recive", (value, id) => {
      Recive(value, id);
    });
  }, []);

  let Send = () => {
    socket.emit("send", message);
  };

  let Recive = (value: string, id: string) => {
    let p = document.createElement("p");
    p.innerText = `${value}: "" ${id}`;
    div.current?.appendChild(p);
  };

  return (
    <div className="m-auto mt-[144px] flex-col items-center flex  h-[600px] border w-[600px] border-black">
      <h1 className="my-8 font-bold">{name}</h1>
      <div ref={div} className="h-full w-full overflow-y-auto"></div>
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          Send();
          setMessage("");
        }}
      >
        <input
          className="w-full h-20 border-t-2 outline-none border-black p-4"
          placeholder="Enter Message Here"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </form>
    </div>
  );
}

export default App;
