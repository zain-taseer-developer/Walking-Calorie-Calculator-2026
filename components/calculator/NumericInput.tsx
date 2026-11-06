"use client";

import React, { useState, useEffect, useRef } from "react";
import { normalizeLeadingZeros, clearZeroOnFocus } from "@/lib/numericInput";

export interface NumericInputProps {
  id?: string;
  value: number | string;
  onChange: (value: number, rawString: string) => void;
  min?: number;
  max?: number;
  step?: number | string;
  className?: string;
  placeholder?: string;
  inputMode?: "decimal" | "numeric";
  disabled?: boolean;
  "aria-label"?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function NumericInput({
  id,
  value,
  onChange,
  min,
  max,
  step = "any",
  className = "",
  placeholder,
  inputMode = "decimal",
  disabled = false,
  "aria-label": ariaLabel,
  onFocus,
  onBlur,
}: NumericInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>(() =>
    value !== undefined && value !== null ? String(value) : ""
  );

  // Sync external value changes when not actively focused
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(value !== undefined && value !== null ? String(value) : "");
    }
  }, [value, isFocused]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    // Clear displayed zero on focus so the user can enter a custom value without the zero getting in the way
    const cleared = clearZeroOnFocus(displayValue);
    if (cleared !== displayValue) {
      setDisplayValue(cleared);
    }
    if (onFocus) onFocus(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    
    // Normalize leading zeros (e.g. 0777 -> 777, but 0.75 stays 0.75)
    const normalized = normalizeLeadingZeros(raw);
    setDisplayValue(normalized);

    if (normalized === "" || normalized === ".") {
      onChange(0, normalized);
      return;
    }

    const parsed = parseFloat(normalized);
    if (!isNaN(parsed)) {
      onChange(parsed, normalized);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    let finalStr = displayValue.trim();

    if (finalStr === "" || finalStr === ".") {
      finalStr = "0";
      setDisplayValue(finalStr);
      onChange(0, finalStr);
    }

    if (onBlur) onBlur(e);
  };

  return (
    <input
      id={id}
      type="text"
      inputMode={inputMode}
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      placeholder={placeholder}
      className={className}
      aria-label={ariaLabel}
    />
  );
}
