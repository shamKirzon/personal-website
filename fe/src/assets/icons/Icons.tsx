import { motion } from "framer-motion";

type Props = {
  width: string;
};

export const Location = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <circle cx="12" cy="9.5" r="1.5" />
    <path d="M12 2a8 8 0 0 0-8 7.92c0 5.48 7.05 11.58 7.35 11.84a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 9.92A8 8 0 0 0 12 2m0 11a3.5 3.5 0 1 1 3.5-3.5A3.5 3.5 0 0 1 12 13" />
  </svg>
);

export const Download = ({ width }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      d="M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z"
    />
  </svg>
);

export const Email = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path
        fill="#fff"
        d="M3 5v-.75a.75.75 0 0 0-.75.75zm18 0h.75a.75.75 0 0 0-.75-.75zM3 5.75h18v-1.5H3zM20.25 5v12h1.5V5zM19 18.25H5v1.5h14zM3.75 17V5h-1.5v12zM5 18.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 5 19.75zM20.25 17c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 21.75 17z"
      />
      <path
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="m3 5l9 9l9-9"
      />
    </g>
  </svg>
);

export const Home = ({ width }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      d="M12 3s-6.186 5.34-9.643 8.232A1.04 1.04 0 0 0 2 12a1 1 0 0 0 1 1h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1a.98.98 0 0 0-.383-.768C18.184 8.34 12 3 12 3"
    />
  </svg>
);

export const Contact = ({ width }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      d="M21 2H6a2 2 0 0 0-2 2v3H2v2h2v2H2v2h2v2H2v2h2v3a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1m-8 2.999c1.648 0 3 1.351 3 3A3.01 3.01 0 0 1 13 11c-1.647 0-3-1.353-3-3.001c0-1.649 1.353-3 3-3M19 18H7v-.75c0-2.219 2.705-4.5 6-4.5s6 2.281 6 4.5z"
    />
  </svg>
);

export const Projects = ({ width }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M5.4 2h13.2A3.4 3.4 0 0 1 22 5.4v13.2a3.4 3.4 0 0 1-3.4 3.4H5.4A3.4 3.4 0 0 1 2 18.6V5.4A3.4 3.4 0 0 1 5.4 2M7 5a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1m5 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1m6 1a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0z"
      clip-rule="evenodd"
    />
  </svg>
);

export const LightMode = ({ width }: Props) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
    viewBox="0 0 24 24"
    animate={{ rotate: 150 }}
    transition={{ repeat: 0, duration: 0.5, ease: "linear" }}
    className="text-white"
  >
    <path
      fill="currentColor"
      d="M12 17q-2.075 0-3.537-1.463T7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17m-7-4H1v-2h4zm18 0h-4v-2h4zM11 5V1h2v4zm0 18v-4h2v4zM6.4 7.75L3.875 5.325L5.3 3.85l2.4 2.5zm12.3 12.4l-2.425-2.525L17.6 16.25l2.525 2.425zM16.25 6.4l2.425-2.525L20.15 5.3l-2.5 2.4zM3.85 18.7l2.525-2.425L7.75 17.6l-2.425 2.525z"
    />
  </motion.svg>
);

export const DarkMode = ({ width }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height="32"
    viewBox="0 0 24 24"
  >
    <g fill="#fff" fill-opacity="0">
      <path d="M15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z">
        <animate
          id="lineMdMoonLoop0"
          fill="freeze"
          attributeName="fill-opacity"
          begin="0.7s;lineMdMoonLoop0.begin+6s"
          dur="0.4s"
          values="0;1"
        />
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="lineMdMoonLoop0.begin+2.2s"
          dur="0.4s"
          values="1;0"
        />
      </path>
      <path d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="lineMdMoonLoop0.begin+3s"
          dur="0.4s"
          values="0;1"
        />
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="lineMdMoonLoop0.begin+5.2s"
          dur="0.4s"
          values="1;0"
        />
      </path>
      <path d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="lineMdMoonLoop0.begin+0.4s"
          dur="0.4s"
          values="0;1"
        />
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="lineMdMoonLoop0.begin+2.8s"
          dur="0.4s"
          values="1;0"
        />
      </path>
      <path d="M20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z">
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="lineMdMoonLoop0.begin+3.4s"
          dur="0.4s"
          values="0;1"
        />
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="lineMdMoonLoop0.begin+5.6s"
          dur="0.4s"
          values="1;0"
        />
      </path>
    </g>
    <path
      fill="none"
      stroke="#fff"
      stroke-dasharray="56"
      stroke-dashoffset="56"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
    >
      <animate
        fill="freeze"
        attributeName="stroke-dashoffset"
        dur="0.6s"
        values="56;0"
      />
    </path>
  </svg>
);

export const Facebook = ({ width }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z"
    />
  </svg>
);

export const LinkedIn = ({ width }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
    />
  </svg>
);

export const GithubWhite = ({ width }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      d="M20.116 5.901a4 4 0 0 0-.26-.31a4.4 4.4 0 0 0 .21-.76a5.3 5.3 0 0 0-.35-2.8s-1.12-.35-3.69 1.38a12.5 12.5 0 0 0-3.35-.45a12.6 12.6 0 0 0-3.36.45c-2.57-1.75-3.69-1.38-3.69-1.38a5.26 5.26 0 0 0-.35 2.77a4.2 4.2 0 0 0 .22.79c-.09.1-.18.21-.26.31a5.14 5.14 0 0 0-1.12 3.3a8 8 0 0 0 .04.85c.32 4.43 3.27 5.46 6.08 5.78a2.56 2.56 0 0 0-.77 1.39a4 4 0 0 0-.13 1.09v1.31c-1.119.1-2.267-.063-2.623-1.061a5.7 5.7 0 0 0-1.834-2.413a1 1 0 0 1-.17-.112a1 1 0 0 0-.93-.645h-.005a1 1 0 0 0-1 .995c-.003.812.81 1.337 1.143 1.515a4.5 4.5 0 0 1 .923 1.359c.364 1.023 1.429 2.578 4.466 2.376l.002.098l.004.268a1 1 0 0 0 1 1h4.714a1 1 0 0 0 1-1s.008-3.16.008-3.69a4 4 0 0 0-.13-1.09l-.002-.006l.004.006c-.009-.035-.022-.063-.032-.097a2.53 2.53 0 0 0-.74-1.293l.012.021l-.02-.02c2.81-.32 5.74-1.37 6.06-5.78a8 8 0 0 0 .04-.85a5.23 5.23 0 0 0-1.11-3.3Z"
    />
  </svg>
);

export const GithubBlack = ({ width }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height={width}
    viewBox="0 0 24 24"
  >
    <path
      fill="#000"
      d="M11.963 2.382C.554 2.621-1.82 17.93 8.852 21.602c.498.093.684-.219.684-.478v-1.68c-2.79.601-3.38-1.317-3.38-1.317a2.6 2.6 0 0 0-1.121-1.442c-.902-.612.072-.602.072-.602a2.07 2.07 0 0 1 1.536 1.038a2.167 2.167 0 0 0 2.924.819c.052-.5.275-.965.633-1.317c-2.23-.25-4.564-1.1-4.564-4.875a3.76 3.76 0 0 1 1.038-2.645a3.46 3.46 0 0 1 .103-2.634s.84-.26 2.76 1.037a9.6 9.6 0 0 1 5.02 0c1.908-1.276 2.748-1.038 2.748-1.038c.365.828.398 1.763.093 2.614a3.75 3.75 0 0 1 1.037 2.645c0 3.786-2.344 4.626-4.574 4.865c1.038.55.602 4.086.664 4.522c0 .259.176.57.695.477c10.642-3.64 8.152-18.97-3.257-19.209"
    />
  </svg>
);

export const ChatRobot = ({className}:{className?:string}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      fill="#06b6d4"
      d="M13.5 2c0 .444-.193.843-.5 1.118V5h5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h5V3.118A1.5 1.5 0 1 1 13.5 2M0 10h2v6H0zm24 0h-2v6h2zM9 14.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m7.5-1.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0"
    />
  </svg>
);
