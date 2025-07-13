import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { contact, socials } from "../data/GetInTouch-data";




const GetInTouch = () => {

  return (
    // parent container
    <div className="flex justify-center mt-30">
      {/* content */}
      <div className="flex flex-col w-full max-w-md ">
        <h1 className="text-white h-10 text-5xl font-bold mt-2 text-center w-full">
          Get in Touch
        </h1>

       

        {/* Let's Connect */}
        <div className="flex flex-col mt-10 bg-zinc-900 border gap-y-5 border-zinc-700   pl-7 pr-3 py-5 rounded-md ">
          <h1 className="text-white h-10 text-3xl font-bold ">
            Let's Connect
          </h1>

          {/* Long Text */}
          <div className="flex border-l-2 border-l-cyan-500  justify-center items-center ">
            <p className="text-white  pl-5">
              I'm always open to discussing new projects and opportunities. Feel
              free to send me a message!
            </p>
          </div>

          <div className="flex flex-col gap-y-4 ">
            {contact.map((data, index) => (
              <div key={index} className="flex  items-center ">
                {data.icon && <data.icon width="60" height="45" />}

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
          <div className="h-[1px] w-75 bg-zinc-700 mt-1" />

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
        <div className="flex flex-col mt-10 bg-zinc-900 border gap-y-5 border-zinc-700  px-3 py-5 rounded-md ">
       

          <Input
            type="text"
            placeholder="Your Name"
            className="h-10 bg-zinc-700 rounded-sm border-none focus-visible:ring-0 text-white "
          />

          <Input
            type="email"
            placeholder="Your Email"
            className="h-10 bg-zinc-700  rounded-sm border-none focus-visible:ring-0 text-white "
          />

          <Textarea
            placeholder="Your Message"
            className="h-30 bg-zinc-700  rounded-sm border-none focus-visible:ring-0 text-white "
          />
          <Button className="h-10 bg-zinc-900 border border-cyan-500 text-cyan-500 rounded-sm active:scale-95 active:bg-cyan-500 active:text-zinc-900">
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
