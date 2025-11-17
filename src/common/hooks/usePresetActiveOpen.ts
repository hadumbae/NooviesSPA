import { Dispatch, SetStateAction, useState } from "react";

/**
 * Configuration object for {@link usePresetActiveOpen}.
 *
 * Provides optional values that allow the hook to operate in
 * a controlled mode.
 *
 * @property presetOpen - Externally controlled `open` state.
 * @property setPresetOpen - Setter for the externally controlled `open` state.
 */
type PresetValues = {
    presetOpen?: boolean;
    setPresetOpen?: Dispatch<SetStateAction<boolean>>;
};

type PresetReturns = {
    /** The resolved active open state (controlled or internal). */
    activeOpen: boolean;

    /** Setter that updates either the external or internal open state. */
    setActiveOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * Custom hook to manage a component's open/closed state with optional controlled behavior.
 *
 * This hook supports both **controlled** and **uncontrolled** usage patterns:
 *
 * ### Controlled Mode
 * Provide both `presetOpen` and `setPresetOpen`.
 * The hook will use these values as the source of truth.
 *
 * ### Uncontrolled Mode
 * Omit `presetOpen` and `setPresetOpen`.
 * The hook will internally manage state using `useState`.
 *
 * @param params - Optional configuration enabling controlled mode.
 *
 * @returns An object containing:
 * - `activeOpen` — The resolved open state.
 * - `setActiveOpen` — The setter function for updating the open state.
 *
 * @example
 * ```ts
 * // Uncontrolled mode
 * const { activeOpen, setActiveOpen } = usePresetActiveOpen();
 * setActiveOpen(true);
 * ```
 *
 * @example
 * ```ts
 * // Controlled mode
 * const [open, setOpen] = useState(false);
 * const { activeOpen, setActiveOpen } = usePresetActiveOpen({
 *     presetOpen: open,
 *     setPresetOpen: setOpen,
 * });
 * ```
 *
 * @remarks
 * - Controlled mode requires **both** `presetOpen` and `setPresetOpen`.
 * - If only one is provided, the hook falls back to uncontrolled mode.
 */
export default function usePresetActiveOpen(params: PresetValues): PresetReturns {
    const { presetOpen, setPresetOpen } = params;
    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const activeOpen = isControlled ? presetOpen : isOpen;
    const setActiveOpen = isControlled ? setPresetOpen : setIsOpen;

    return {
        activeOpen,
        setActiveOpen,
    };
}
