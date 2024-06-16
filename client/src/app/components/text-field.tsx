import React from "react";
interface TextFieldProps {
  error?: string;
  placeholder?: string;
  type?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ error, placeholder, type, ...rest }, ref) => {
    return (
      <div className="text-field flex flex-col gap-1">
        <input
          {...rest}
          ref={ref}
          className="border border-gray-400 p-2 rounded mb-2 text-black"
          placeholder={placeholder}
          type={type}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
    );
  }
);

export default TextField;
