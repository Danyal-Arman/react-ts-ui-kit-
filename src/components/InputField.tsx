import React, { useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";




export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  passwordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  clearable = false,
  passwordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const baseClasses =
    "w-full rounded-md transition border focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white";
  const variantClasses = {
    filled: "bg-gray-100 border-transparent focus:ring-blue-500",
    outlined: "border-gray-300 focus:ring-blue-500",
    ghost: "border-transparent bg-transparent focus:ring-blue-500",
  };
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-sm font-medium dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          type={passwordToggle && !showPassword ? "password" : "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            invalid ? "border-red-500 focus:ring-red-500" : "",
            disabled ? "opacity-50 cursor-not-allowed" : ""
          )}
        />

        {clearable && value && (
          <button
            type="button"
            className="absolute right-2 text-gray-500 hover:text-black dark:hover:text-white"
            onClick={() =>
              onChange &&
              onChange({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            ✕
          </button>
        )}

        {passwordToggle && (
          <button
            type="button"
            className="absolute right-8 text-gray-500 hover:text-black dark:hover:text-white"
            onClick={() => setShowPassword((prev) => !prev)}
          >
{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {helperText && !invalid && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
      {invalid && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
