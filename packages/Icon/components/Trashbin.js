import React from "react";

const SvgTrashbin = props => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 480 480"
    css={`
      color: ${props.color};
      width: ${props.size};
      height: ${props.size};
      vertical-align: text-top;
    `}
    {...props}
  >
    <path
      d="M187 366h-35V177h35v189zm70 0h-35V177h35v189zm70 0h-35V177h35v189zm28-231H124v273h231V135zM183.529 92h112.353l-8.106-21.714c-1.277-1.643-2.826-2.642-4.647-3.286h-86.581c-1.82.655-3.37 1.654-4.646 3.286L183.529 92zM437 126.473c-.006 2.554-.827 4.647-2.47 6.279-1.643 1.632-3.736 2.453-6.279 2.248H397v273c0 23-19 42-42 42H124c-23 0-42-19-42-42V135H51.193c-2.554.2-4.647-.622-6.279-2.265-1.632-1.643-2.453-3.736-2.914-6.278V100.97c.45-2.554 1.271-4.647 2.914-6.279C46.557 93.06 48.65 92.24 51.193 92h89.4l19.118-37.386c2.73-6.74 7.649-12.474 14.755-17.203 7.105-4.73 14.3-7.095 21.582-7.411h87.398c7.283.316 14.477 2.681 21.583 7.41 7.105 4.73 12.023 10.465 14.755 17.204L338.902 92h89.4c2.553.228 4.646 1.05 6.278 2.692 1.632 1.643 2.453 3.736 2.42 6.279v25.502z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default SvgTrashbin;
