"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface AnimatedDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
}

export default function AnimatedDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  name,
}: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={clsx("relative w-full", className)} ref={dropdownRef}>
      {/* Hidden input for form compatibility */}
      <input type="hidden" name={name} value={value} />

      {/* Dropdown Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border-b-2 border-[#254C54CC]/30 hover:border-[#254C5499] focus:border-[#254C5499] transition-colors py-3 cursor-pointer flex justify-between items-center group"
      >
        <span
          className={clsx(
            "text-sm font-sans transition-colors",
            selectedOption ? "text-[#254C54]" : "text-gray-500"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           transition={{ duration: 0.3 }}
           className="text-gray-400 group-hover:text-[#254C54] transition-colors"
        >
             <IconChevronDown size={16} />
        </motion.div>
      </div>

      {/* Animated Options List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg rounded-md overflow-hidden z-50 max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={clsx(
                  "px-4 py-3 text-sm font-sans cursor-pointer hover:bg-gray-50 transition-colors",
                  value === option.value ? "text-[#254C54] font-medium bg-gray-50" : "text-gray-600"
                )}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
