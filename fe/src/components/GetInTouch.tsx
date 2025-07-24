import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { contact, socials } from "../data/GetInTouch-data";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const GetInTouch = () => {
  const MessageForm = () => {
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const isFormEmpty = !name || !email || !message;

    const MessageSchema = z.object({
      name: z.string().min(1, "Please enter your name"),
      email: z.string().email("Invalid email"),
      message: z.string().min(1, "Please enter your message"),
    });

    const resetForm = () => {
      setName("");
      setEmail("");
      setMessage("");
    };

    async function handleSend(data: any) {
      const { name, email, message } = data;

      const response = await axios.post("https://personal-website-mb25.onrender.com/api/message", {
        data: { name: name, email: email, message: message },
      });

      if (response.status) {
        console.log("RESPONSE STATUS: ", response.status);

        toast.success(`Thanks, ${name.split(" ")[0]}!`, {
          description: `I appreciate you taking the time to contact me`,
        });
      }

      resetForm();
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
      };

      const result = MessageSchema.safeParse(data);

      if (result.success) {
        console.log(data, typeof data);
        resetForm();
        setFormErrors({});
        handleSend(data);
        console.log("ITO AY SA HANDLE SUBMIT KUNG NASAAN SI HANDLE SEND");
      } else {
        const formattedErrors = result.error.format();
        setFormErrors({
          name: formattedErrors.name?._errors[0] || "",
          email: formattedErrors.email?._errors[0] || "",
          message: formattedErrors.message?._errors[0] || "",
        });
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div
          className="flex flex-col mt-10 bg-zinc-700 dark:bg-zinc-900 border gap-y-5 border-zinc-700 px-3 py-5 rounded-md
        md:w-80 lg:w-[27rem]
        
        "
        >
          <Input
            name="name"
            type="text"
            value={name}
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
            className="h-10 md:h-13 lg:10 bg-zinc-600 dark:bg-zinc-700 rounded-sm border-none focus-visible:ring-0 text-white"
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm ">{formErrors.name}</p>
          )}

          <Input
            name="email"
            type="email"
            value={email}
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 md:h-13 lg:10 bg-zinc-600 dark:bg-zinc-700 rounded-sm border-none focus-visible:ring-0 text-white"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}

          <Textarea
            name="message"
            value={message}
            placeholder="Your Message"
            onChange={(e) => setMessage(e.target.value)}
            className="h-10 md:h-42 lg:h-40 bg-zinc-600 dark:bg-zinc-700rounded-sm border-none focus-visible:ring-0 text-white"
          />
          {formErrors.message && (
            <p className="text-red-500 text-sm">{formErrors.message}</p>
          )}

          <Button
            type="submit"
            disabled={
              isFormEmpty ||
              !!formErrors.name ||
              !!formErrors.email ||
              !!formErrors.message
            }
            className=" h-10 md:h-13 lg:h-10 bg-zinc-900 border border-cyan-500 text-cyan-500 rounded-sm active:scale-95 active:bg-cyan-500 active:text-zinc-900 "
          >
            Send Message
          </Button>
        </div>
      </form>
    );
  };

  return (
    // parent container

    <div className="flex justify-center mt-30">
      {/* content */}
      {/* here */}
      <div
        className="flex flex-col w-full max-w-md
          md:items-start
         md:min-w-md md:max-w-2xl md:gap-x-5 lg:max-w-4xl "
      >
        <h1 className="text-black dark:text-white h-10 text-5xl font-bold mt-2 text-center w-full">
          Get in Touch
        </h1>

        {/* let's connect and message container */}
        <div className=" md:flex md:justify-between lg:items-center lg:justify-center lg:gap-x-10 w-full">
          {/* Let's Connect */}
          <div
            className="flex flex-col mt-10  bg-zinc-700 dark:bg-zinc-900 border gap-y-5 border-zinc-700 pl-7 pr-3 py-5 rounded-md 
        
            md:w-80 lg:w-[27rem]
        "
          >
            <h1 className="text-white h-10 text-3xl font-bold  ">
              Let's Connect
            </h1>

            {/* Long Text */}
            <div className="flex border-l-2 border-l-cyan-500  justify-center items-center ">
              <p className="text-white  pl-5">
                I'm always open to discussing new projects and opportunities.
                Feel free to send me a message!
              </p>
            </div>

            <div className="flex flex-col gap-y-4 ">
              {contact.map((data, index) => (
                <div key={index} className="flex gap-x-2 items-center ">
                  {data.icon && <data.icon className="w-10 h-10 text-white" />}

                  {/* header, text */}
                  <div className="flex flex-col  text-white ">
                    <h3 className="text-[1.129rem] h-6 font-medium">
                      {data.name}
                    </h3>

                    <p
                      className={`text-[1rem] ${
                        data.label === "shammysuyat@gmail.com"
                          ? "text-cyan-500 underline"
                          : "text-white"
                      }`}
                    >
                      {data.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* separator */}
            <div className="h-[1px] w-75 bg-white dark:bg-zinc-700 mt-1 md:w-68" />

            {/* socials */}
            <div className="flex flex-col">
              <p className="text-white  text-start">
                Connect with me on social media
              </p>

              {/* buttons horizontally */}
              <div className="flex flex-row items-center gap-x-3  mt-2">
                {socials.map((data, index) => (
                  <a
                    key={index}
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-zinc-600 p-1 rounded-sm">
                      {<data.icon width="30" />}
                    </button>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* message */}
          {MessageForm()}
        </div>

        {/* website owner ship */}
        <div className=" flex bg-white dark:bg-zinc-700 mt-10 h-px w-full  " />
        <span className="mx-auto text-sm mt-1 text-zinc-700 dark:text-zinc-700">
          © 2025 Shammy Kierson Suyat. All rights reserved.
        </span>
        <div />
      </div>
    </div>
  );
};

export default GetInTouch;
