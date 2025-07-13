import LoadingThreeDotsPulse from "./LoadingThreeDotsPulse";

const WebView = () => {
  return (
    <div className="flex min-h-screen min-w-screen justify-center items-center  w-[60rem]">
     
      <div className=" flex  flex-col w-[60rem] text-center gap-y-20">
        <span className="text-5xl  text-white">
          UNDER DEVELOPMENT, PLEASE USE MOBILE VIEW FOR NOW
        </span>
        <LoadingThreeDotsPulse/>
      </div>
    </div>
  );
};

export default WebView;
