import {Dispatch, SetStateAction} from "react";

/**
 * Represents an externally controlled open/close state for UI elements such as panels, popups, or dropdowns.
 *
 * @remarks
 * This type allows components to optionally receive a controlled "open state" from their parent.
 *
 * - When provided (`presetOpen` and `setPresetOpen` defined), the component's open/close behavior
 *   is managed externally via React state.
 * - When omitted (`presetOpen` and `setPresetOpen` absent), the component manages its own state internally.
 *
 * @example
 * ```tsx
 * // External control example:
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <MyDropdown presetOpen={isOpen} setPresetOpen={setIsOpen} />
 *
 * // Internal control example (no props passed):
 * <MyDropdown />
 * ```
 */
export type PresetOpenState =
    | {
    /** Whether the UI element (panel, popup, dropdown, etc.) is open. */
    presetOpen: boolean;
    /** Setter function to toggle the `presetOpen` state. */
    setPresetOpen: Dispatch<SetStateAction<boolean>>;
} | {
    /** Omitted when the component manages its own state internally. */
    presetOpen?: never;
    /** Omitted when the component manages its own state internally. */
    setPresetOpen?: never;
};
