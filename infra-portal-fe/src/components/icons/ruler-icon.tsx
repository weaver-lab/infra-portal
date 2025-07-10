import { IconProps } from "./types";

export const RulerIcon = ({ color = null }: IconProps) => {
  const stroke = color || "currentColor";
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_501_2939)">
        <path
          d="M9.06104 2.69666L10.475 4.11066"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.93945 4.81799L8.35345 6.23199"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.81836 6.93933L6.23236 8.35333"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.69678 9.06067L4.11078 10.4747"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.8283 0.928921L0.928786 10.8284C0.538262 11.2189 0.538262 11.8521 0.928786 12.2426L3.75721 15.0711C4.14774 15.4616 4.7809 15.4616 5.17143 15.0711L15.0709 5.17156C15.4614 4.78104 15.4614 4.14787 15.0709 3.75735L12.2425 0.928921C11.852 0.538397 11.2188 0.538396 10.8283 0.928921Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_501_2939">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
