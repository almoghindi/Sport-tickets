import React from "react";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ onClick = () => {}, text, type }) => {
  return (
    <button
      className="px-5 py-2 text-lg text-white bg-blue-800 rounded hover:bg-blue-700 transition duration-0.3s"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
