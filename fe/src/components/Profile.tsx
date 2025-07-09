import myProfile from "@/assets/images/profile.jpg";
import { Location, Download, Email } from "@/assets/icons/Icons";

const Profile = () => {
  const profileButtons = [
    {
      label: "Download CV",
      icon: <Download width="35" />,
    },
    {
      label: "Send Email",
      icon: <Email width="35" />,
    },
  ];

  const downloadCV = () => {
    const URL = "/kambing.jpg";
    const link = document.createElement("a");

    link.href = URL;
    link.download = "ShammyKiersonSuyat-CV";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendEmail = () => {
    window.location.href = "mailto:shammysuyat@gmail.com?subject=Visitors&body=Hi Shammy, I visited your web";
  }

  return (
    <>
      {/*Parent Container*/}
      <div className="flex justify-center mt-4 ">
        {/* Profile, Text Container */}
        <div className="flex flex-col items-center w-full max-w-sm">
          <img
            src={myProfile}
            alt="Profile"
            className="w-50  object-cover rounded-md"
          />
          <h1 className="text-white text-3xl font-bold mt-2">
            Shammy Kierson Suyat
          </h1>

          {/* location */}

          <div className="flex items-center gap-x-1">
            <Location width="25" />
            <h1 className="text-white text-lg ">Taguig City, Philippines</h1>
          </div>
          <p className=" text-[#A1A1AA] text-center text-lg leading-6 mt-2 ">
            Computer Science student focused on learning full-stack development.
          </p>

          {/* buttons */}
          <div className=" flex flex-col space-y-3 mt-6 w-full px-4">
            {profileButtons.map((button, index) => (
              <button
                key={index}
                className={`flex items-center justify-center gap-x-1 bg-zinc-900 p-[.45rem] rounded-lg ${
                  button.label === "Download CV"
                    ? "border-cyan-300 active:bg-cyan-500"
                    : "border-zinc-400 active:bg-zinc-800"
                } border-[.5px]
                 active:scale-95 
                transition duration-200
                `}
                onClick={() => {
                  if (button.label === "Download CV") downloadCV();
                  else sendEmail()
                }}
              >
                {button.icon}
                <span className="text-[1.09rem] text-white">
                  {button.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
