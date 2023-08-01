/** @jsxImportSource @emotion/react */

type RoundCheckmarkProps = {
  stroke?: string;
};

export function RoundCheckmark({ stroke }: RoundCheckmarkProps) {
  return (
    <svg
      style={{ width: 24, height: 24, marginRight: 16 }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g clipPath="url(#a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Zm2.036 0c0 5.502 4.462 9.964 9.964 9.964 5.502 0 9.964-4.462 9.964-9.964 0-5.502-4.462-9.964-9.964-9.964-5.502 0-9.964 4.462-9.964 9.964Zm13.717-4.26h1.256c.174 0 .276.198.171.34l-5.64 7.822a.85.85 0 0 1-1.386 0l-3.337-4.629a.215.215 0 0 1 .174-.34h1.256c.276 0 .533.134.694.356l1.907 2.647 4.21-5.84a.853.853 0 0 1 .695-.356Z"
          fill={stroke || '#262626'}
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
