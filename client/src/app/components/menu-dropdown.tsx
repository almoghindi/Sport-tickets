"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showDropdown = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsOpen(true);
  };

  const hideDropdown = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Delay to allow mouse movement
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative group"
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <div className="cursor-pointer">{trigger}</div>
      <div
        className={`absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 z-50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 block" : "opacity-0 hidden"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
