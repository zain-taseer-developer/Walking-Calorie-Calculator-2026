import { describe, it, expect } from "vitest";
import { normalizeLeadingZeros, clearZeroOnFocus } from "./numericInput";

describe("Numeric Input Normalization and Focus Zero Clearing", () => {
  describe("normalizeLeadingZeros", () => {
    it("strips redundant leading zeros from integers", () => {
      expect(normalizeLeadingZeros("0777")).toBe("777");
      expect(normalizeLeadingZeros("0050")).toBe("50");
      expect(normalizeLeadingZeros("01")).toBe("1");
    });

    it("preserves a standalone zero or double zeros normalized to 0", () => {
      expect(normalizeLeadingZeros("0")).toBe("0");
      expect(normalizeLeadingZeros("00")).toBe("0");
      expect(normalizeLeadingZeros("000")).toBe("0");
    });

    it("does not break decimals like 0.75 or 0.05", () => {
      expect(normalizeLeadingZeros("0.75")).toBe("0.75");
      expect(normalizeLeadingZeros("0.05")).toBe("0.05");
      expect(normalizeLeadingZeros("0.001")).toBe("0.001");
    });

    it("normalizes leading zero before decimal if redundant", () => {
      expect(normalizeLeadingZeros("012.34")).toBe("12.34");
      expect(normalizeLeadingZeros("007.89")).toBe("7.89");
    });

    it("keeps trailing dot intact during in-progress decimal typing", () => {
      expect(normalizeLeadingZeros("0.")).toBe("0.");
      expect(normalizeLeadingZeros("5.")).toBe("5.");
      expect(normalizeLeadingZeros("150.")).toBe("150.");
    });

    it("converts leading dot to 0. notation", () => {
      expect(normalizeLeadingZeros(".5")).toBe("0.5");
      expect(normalizeLeadingZeros(".75")).toBe("0.75");
    });

    it("handles empty string gracefully", () => {
      expect(normalizeLeadingZeros("")).toBe("");
    });
  });

  describe("clearZeroOnFocus", () => {
    it("clears displayed zero when user focuses an input", () => {
      expect(clearZeroOnFocus(0)).toBe("");
      expect(clearZeroOnFocus("0")).toBe("");
      expect(clearZeroOnFocus("0.0")).toBe("");
      expect(clearZeroOnFocus("00")).toBe("");
    });

    it("leaves non-zero values untouched on focus", () => {
      expect(clearZeroOnFocus(154)).toBe("154");
      expect(clearZeroOnFocus("70")).toBe("70");
      expect(clearZeroOnFocus("3.5")).toBe("3.5");
      expect(clearZeroOnFocus("0.75")).toBe("0.75");
    });
  });
});

