import myProfile from "@/assets/images/profile.jpg";
import downloadCV from "@/assets/icons/download.svg";
import email from "@/assets/icons/email.svg";
import location from "@/assets/icons/location.svg";

const Profile = () => {
  const profileButtons = [
    {
      label: "Download CV",
      icon: downloadCV,
    },
    {
      label: "Send Email",
      icon: email,
    },
  ];

  return (
    // parent
    <>
      {/*Content Container*/}
      <div className="flex justify-center">
        {/* Profile, Text Container */}
        <div className="flex gap-x-3   sm: mt-4 lg:gap-x-5">
          <img
            src={myProfile}
            alt="Profile"
            className="max-h-24 rounded-md h-auto sm:min-h-35 lg:max-h-50 "
          />

          {/* text, button div  */}
          <div className="flex flex-col  pr-4 w-[13rem] sm:w-[22rem] lg:w-[25rem] lg:gap-y-6">
            
            {/* name, location, description */}
            <div className="flex flex-col">
              
              {/*name,location  */}
              <div>
                <h1 className="text-white text-md h-5 font-bold sm:text-[1.5rem] lg:text-3xl lg:font-bold ">
                  Shammy Kierson Suyat
                </h1>

                {/*location */}
                <div className="flex items-center sm:mt-3">
                  <img
                    src={location}
                    alt={location}
                    className=" w-[.8rem] sm:w-5 lg:w-6 "
                  />

                  <h1 className="text-white font-extralight text-[.5rem] text sm:text-sm lg:text-[1rem]">
                    Taguig City, Philippines
                  </h1>
                </div>
              </div>
              <p className="text-[#A1A1AA] mt-1 text-[0.5rem] sm:text-[.9rem] lg:text-[1rem] lg:mt-2.5 ">
                Computer Science student focused on learning full-stack
                development.
              </p>
            </div>

            {/* button */}
            <div className="flex mt-2.5 gap-x-2 sm:gap-x-5 ">
              {profileButtons.map((button, index) => (
                <button
                  key={index}
                  className={`flex  ${
                    button.label === "Download CV"
                      ? "border-[#22D3EE]"
                      : "border-[#3F3F46]"
                  } p-1 rounded-[0.25rem] items-center justify-center bg-[#18181B]  border-1 gap-x-1 sm:gap-x-2 lg:px-3 lg:py:2`}
                >
                  <img
                    src={button.icon}
                    alt={button.icon}
                    className=" w-3 sm:w-5 lg:w-7 "
                  />
                  <p className="text-[.5rem] text-white sm:text-[.7rem] lg:text-[.8rem] ">
                    {button.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
