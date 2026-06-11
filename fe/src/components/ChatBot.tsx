import { ChatRobot, Times } from "@/assets/icons/Icons";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, type JSX } from "react";
import axios from "axios";

type Message = {
  sender: "user" | "chatbot";
  text: string;
};

const ChatBot = () => {
  const greet =
    "Hi! I'm Shammy's chatbot assistant. Feel free to ask anything about Shammy — I'll respond using the information Shammy trained me with.";
  const [openChat, SetOpenChat] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "chatbot", text: greet },
  ]);

  const MIN_TYPING_DELAY = 1500;

  const handleChatbotResponse = async (message: string) => {
    setIsTyping(true);
    const startedAt = Date.now();

    const waitForMinDelay = async () => {
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_TYPING_DELAY) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_TYPING_DELAY - elapsed),
        );
      }
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_RENDER_API_KEY}/api/chat-bot`,
        // "http://localhost:5000/api/chat-bot",
        {
          data: message,
        },
      );

      await waitForMinDelay();
      setMessages((prev) => [
        ...(prev ?? []),
        { sender: "chatbot", text: response.data },
      ]);
    } catch (err) {
      console.log("ChatBot problem: ", err);
      await waitForMinDelay();
      setMessages((prev) => [
        ...(prev ?? []),
        {
          sender: "chatbot",
          text: "Sorry, I'm having trouble responding right now. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    setMessages((prev) => [
      ...(prev ?? []),
      { sender: "user", text: inputMessage },
    ]);

    handleChatbotResponse(inputMessage);
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
    const chatbotResponseUI = (text: string, index: number): JSX.Element => (
      <div key={index} className="flex flex-col gap-y-3 ">
        <div className="flex items-center gap-x-3">
          <img
            src="/profile.jpg"
            alt="sham's profile"
            className="h-8 rounded-4xl "
          />

          <span className="text-sm font-medium">Shammy Kierson Suyat</span>
        </div>

        <div className="bg-gray-200 p-2 w-fit rounded-md max-w-[75%]">
          <p className="text-black text-start">{text}</p>
        </div>
      </div>
    );

    const userInputUI = (text: string, index: number): JSX.Element => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end"
      >
        <div className="bg-cyan-500 text-white p-2 rounded-md max-w-[75%]">
          <p className="text-sm">{text}</p>
        </div>
      </motion.div>
    );

    const typingIndicatorUI = (): JSX.Element => (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-y-3"
      >
        <div className="flex items-center gap-x-3">
          <img
            src="/profile.jpg"
            alt="sham's profile"
            className="h-8 rounded-4xl "
          />

          <span className="text-sm font-medium">Shammy Kierson Suyat</span>
        </div>

        <div className="bg-gray-200 px-3 py-2 w-fit rounded-full flex items-center gap-x-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 bg-gray-500 rounded-full"
              animate={{ y: ["0%", "-50%", "0%"] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </motion.div>
    );

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed bottom-20 w-80 h-[26rem] bg-zinc-900 rounded-xl shadow-lg z-30
             flex flex-col overflow-hidden border border-zinc-500
             right-5
             lg:w-[26rem] text-white"
      >
        <div className=" flex justify-between items-center  p-3 border-b font-semibold ">
          <div className="flex gap-x-2 items-center">
            <img
              src="/profile.jpg"
              alt="sham's profile"
              className="h-[41px] rounded-4xl "
            />

            <div className="flex flex-col text-start gap-y-0.5">
              <span className="text-[19px] font-bold leading-none">
                Chat with Sham
              </span>
              <span className="text-xs font-light leading-none text-zinc-400">
                Powered by Google Gemini
              </span>
            </div>
          </div>

          <button onClick={() => SetOpenChat((prev) => !prev)}>
            <Times className="h-5 fill-white" />
          </button>
        </div>

        <div className="flex-1 p-3 overflow-y-auto space-y-5 text-sm scrollbar-hide">
          {messages?.map((message, index) =>
            message.sender === "user"
              ? userInputUI(message.text, index)
              : chatbotResponseUI(message.text, index),
          )}
          {isTyping && typingIndicatorUI()}
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
      </motion.div>
    );
  };

  return (
    <>
      {/* Floating Button */}
      <div className="flex fixed bottom-5 right-5 z-50">
        <button onClick={() => SetOpenChat((prev) => !prev)}>
          <motion.div
            className="p-2 bg-zinc-900 border border-cyan-500 rounded-full
            hover:scale-110 transition-transform duration-200 "
            animate={{
              boxShadow: [
                "0 0 8px 2px rgba(6,182,212,0.4)",
                "0 0 18px 5px rgba(6,182,212,0.8)",
                "0 0 8px 2px rgba(6,182,212,0.4)",
              ],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChatRobot className="h-10 text-cyan-400" />
          </motion.div>
        </button>
      </div>

      {/* Chat Popup */}
      <AnimatePresence>{openChat && chatContent()}</AnimatePresence>
    </>
  );
};

export default ChatBot;
