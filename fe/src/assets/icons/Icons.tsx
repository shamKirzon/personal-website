type Props = {
  width: string;
};

export const Location = ({ width }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="32"
    width={width}
    height="32"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="9.5" r="1.5" fill="#fff" />
    <path
      fill="#fff"
      d="M12 2a8 8 0 0 0-8 7.92c0 5.48 7.05 11.58 7.35 11.84a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 9.92A8 8 0 0 0 12 2m0 11a3.5 3.5 0 1 1 3.5-3.5A3.5 3.5 0 0 1 12 13"
    />
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

export const Email = ({width}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height="32"
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
