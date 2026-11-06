/**
 * Normalizes numeric string inputs by stripping redundant leading zeros
 * without breaking decimal notation such as 0.75, 0.05, 0., etc.
 */
export function normalizeLeadingZeros(value: string): string {
  if (value === "") return "";
  
  // If starts with "." e.g. ".5", convert to "0.5"
  if (value.startsWith(".")) {
    return "0" + value;
  }

  // If there's a decimal point, normalize only the integer part
  if (value.includes(".")) {
    const parts = value.split(".");
    const intPart = parts[0].replace(/^0+(?=\d)/, "") || "0";
    return intPart + "." + parts.slice(1).join(".");
  }

  // Whole number without decimal point
  // e.g. "0777" -> "777", "00" -> "0", "0" -> "0"
  return value.replace(/^0+(?=\d)/, "");
}

/**
 * Handles clearing a displayed zero on focus so the user can enter a custom value
 * without the initial zero interfering with typing.
 */
export function clearZeroOnFocus(currentValue: string | number): string {
  const str = String(currentValue).trim();
  if (str === "0" || str === "0.0" || str === "00") {
    return "";
  }
  return str;
}

