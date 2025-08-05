import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "../Icons/Icons"; // Assuming this path is correct
import { BsCheck } from "react-icons/bs";

interface Option {
  value: string;
  label: string;
}

interface UnderlineSelectProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const UnderlineSelect: React.FC<UnderlineSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value) {
      setSelectedOption(null);
    } else {
      const found = options.find((opt) => opt.value === value);
      setSelectedOption(found || null);
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div
        className={`
          relative cursor-pointer group
          ${isOpen ? "z-10" : ""}
          w-full px-1 pb-[7px] bg-transparent border-0 border-b border-[#F3EAE1] focus:outline-none
        `}
        onClick={toggleDropdown}
      >
        <div className="flex items-center justify-between">
          <span
            className={`
              text-xl placeholder:font-FreightNeoProNormal font-FreightNeoProNormal
              ${selectedOption ? "text-[#F3EAE1]" : "text-[#F3EAE1]"}
              group-hover:text-[#F3EAE1]
            `}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`
              w-5 h-5 text-[#F3EAE1] transition-all duration-200
              ${isOpen ? " text-[#C7784D]" : "group-hover:text-[#C7784D] rotate-180"}
            `}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute top-full left-0 right-0 mt-1 z-[999999] 
          transform transition-all duration-200 origin-top
          ${
            isOpen
              ? "opacity-100 scale-y-100 translate-y-0"
              : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div
          className="
            bg-gradient-to-br from-white via-blue-50 to-purple-50
            border border-gray-200/50 rounded-lg shadow-xl backdrop-blur-sm
            overflow-hidden
          "
        >
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className={`
                  flex items-center justify-between px-4 py-3 cursor-pointer
                  transition-all duration-150
                  hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100
                  ${
                    selectedOption?.value === option.value
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-[#1C1213] font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                `}
                onClick={() => handleSelect(option)}
              >
                <span className="font-freightNeoMedium">
                  {option.label}
                </span>
                {selectedOption?.value === option.value && (
                  <BsCheck className="w-4 h-4 text-[#1C1213]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
