import { ChatRobot, Times } from "@/assets/icons/Icons";
import { motion } from "motion/react";
import { useEffect, useState, type JSX } from "react";

const ChatBot = () => {
  const [openChat, SetOpenChat] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    setMessages((prev) => [...prev, inputMessage]);
    
    
    const response = await fetch("/api/chat-bot", {
      method:"POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messages)
    })


    const data = await response.json; 

    console.log("CHATBOT RESPONSE: ", data) 

    setInputMessage("");
  };

  // to avoid scrolling in body
  useEffect(() => {
    if (openChat) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openChat]);

  const chatContent = (): JSX.Element => {
    return (
      <div
        className="fixed bottom-20 w-89 h-[30rem] bg-zinc-900 rounded-xl shadow-lg z-30 
             flex flex-col overflow-y-auto border border-zinc-500
             left-1/2 -translate-x-1/2
             lg:left-auto lg:right-5 lg:translate-x-0 lg:w-[30rem]"
      >
        <div className=" flex justify-between items-center  p-3 border-b-2 font-semibold">
          <div className="flex gap-x-3">
            <img
              src="/profile.jpg"
              alt="sham's profile"
              className="h-15 rounded-4xl "
            />

            <div className="flex flex-col text-start ">
              <span className="text-xl font-bold">Chat with Sham</span>
              <span className="text-sm font-light">
                Powered by Google Gemini
              </span>
            </div>
          </div>

          <button onClick={() => SetOpenChat((prev) => !prev)}>
            <Times className="h-9 fill-white" />
          </button>
        </div>

        <div className="flex-1 p-3 overflow-y-auto space-y-5 text-sm">
          {/* response*/}
          <div className="flex flex-col gap-y-3 ">
            {/* profile, name */}
            <div className="flex items-center gap-x-3">
              <img
                src="/profile.jpg"
                alt="sham's profile"
                className="h-8 rounded-4xl "
              />

              <span className="text-sm font-medium">Shammy Kierson Suyat</span>
            </div>

            <div className="bg-gray-200 p-2 rounded-md max-w-[75%]">
              <p className="text-black text-start">
                Ako pala ang chatbot ni boss shami, send money pambili ng
                spaghetti ng boss ko.
              </p>
            </div>
          </div>

          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-end"
            >
              <div className="bg-cyan-500 text-white p-2 rounded-md max-w-[75%]">
                <p className="text-sm">{message}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="p-3 border-t flex gap-2">
          <input
          value={inputMessage}
            type="text"
            className="flex-1 h-10 rounded-md px-2 py-1 text-sm border border-cyan-500"
            placeholder="Type your message..."
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button
            onClick={handleSendMessage}
            className="bg-cyan-500 text-white px-3 rounded-md text-sm"
          >
            Send
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating Button */}
      <div className="flex lg:fixed lg:bottom-5 lg:right-5 lg:z-50">
        <button onClick={() => SetOpenChat((prev) => !prev)}>
          <div
            className="lg:p-2 lg:bg-zinc-900 lg:border lg:border-cyan-500 lg:shadow-[0_0_12px_3px_rgba(6,182,212,0.5)] lg:rounded-full 
            hover:scale-110 transition-transform duration-200 "
          >
            <ChatRobot className="h-10 text-cyan-400" />
          </div>
        </button>
      </div>

      {/* Chat Popup */}
      {openChat && chatContent()}
    </>
  );
};

export default ChatBot;
