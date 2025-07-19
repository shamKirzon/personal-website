import { ChatRobot } from "@/assets/icons/Icons";
import { useState } from "react";

const ChatBot = () => {
  const [openChat, SetOpenChat] = useState<boolean>(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button onClick={() => SetOpenChat((prev) => !prev)}>
          <div className="p-2 bg-zinc-900 border border-cyan-500 shadow-[0_0_12px_3px_rgba(6,182,212,0.5)] rounded-full 
            hover:scale-110 transition-transform duration-200 active:bg-zinc-700">
            <ChatRobot className="h-10 text-cyan-400" />
          </div>
        </button>
      </div>

      {/* Chat Popup */}
      {openChat && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-zinc-900 rounded-xl shadow-lg z-40 flex flex-col overflow-hidden
        border border-zinc-500">
          <div className=" text-white p-3 border-b-2 font-semibold">Chat with Sham's ChatBot</div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            <div className="bg-gray-200 p-2 rounded-md self-start max-w-[75%]">
            <p className="text-black">
                Ako pala ang chatbot ni boss shami, send money pambili ng spaghetti ng boss ko. 
            </p>
            </div>

              <div className="bg-gray-200 p-2 rounded-md self-start max-w-[75%]">
            <p className="text-black">
                Hindi pa po ako tapos gawin, cinocode pa po yung utak ko para merong masasagot sainyo ahihihih
            </p>
            </div>
            {/* Add more chat messages here */}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              className="flex-1  rounded-md px-2 py-1 text-sm border border-cyan-500"
              placeholder="Type your message..."
            />
            <button className="bg-cyan-500 text-white px-3 rounded-md text-sm">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
