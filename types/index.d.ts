import * as React from "react";

export interface ReactMaskedControlProps {
  /**
   * Character to replace actual input (e.g., '*').
   * If null, no character replacement is performed.
   */
  replaceCharacter?: string | null;

  /**
   * Number of characters to mask with `replaceCharacter`.
   * Defaults to the full length of the input.
   */
  replaceCharacterLength?: number | null;

  /**
   * Defines the structure of the input by grouping characters.
   * Example: [3,3,4] with '-' will produce '123-456-7890'.
   */
  delimiterBlocks?: number[];

  /**
   * Character used to separate each block (e.g., '-').
   */
  delimiterCharacter?: string | null;

  /**
   * Called when the input changes.
   * Receives the original event, the masked value, and the raw (unmasked) value.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    maskedValue: string,
    rawValue: string
  ) => void;

  /**
   * Props to be passed directly to the underlying native input.
   */
  nativeInputProps?: React.InputHTMLAttributes<HTMLInputElement>;

  /**
   * Raw (unmasked) input value.
   */
  value?: string;

  /**
   * Maximum length for raw input.
   */
  maxLength?: number | null;
}

/**
 * A customizable masked input React component.
 */
export const ReactMaskedControl: React.FC<ReactMaskedControlProps>;
