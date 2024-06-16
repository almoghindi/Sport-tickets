import React from "react";

interface DropdownFieldProps {
  error?: string;
  placeholder?: string;
  options: string[];
}

const DropdownField = React.forwardRef<HTMLSelectElement, DropdownFieldProps>(
  ({ error, placeholder, options, ...rest }, ref) => {
    return (
      <div className="dropdown-field flex flex-col gap-1">
        <select
          {...rest}
          ref={ref}
          className="border border-gray-400 p-2 rounded mb-2 text-black"
          defaultValue=""
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
    );
  }
);

export default DropdownField;
