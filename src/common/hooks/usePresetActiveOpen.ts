import {Dispatch, SetStateAction, useState} from "react";

/**
 * Configuration object for {@link usePresetActiveOpen}.
 *
 * @property presetOpen - Optional externally controlled open state.
 * @property setPresetOpen - Optional setter function for the controlled open state.
 */
type PresetValues = {
    presetOpen?: boolean;
    setPresetOpen?: Dispatch<SetStateAction<boolean>>;
};

/**
 * Custom hook to manage a component's open state with optional controlled behavior.
 *
 * This hook allows a component to operate in either:
 * - **Controlled mode:** The open state is managed externally via `presetOpen` and `setPresetOpen`.
 * - **Uncontrolled mode:** The hook internally manages the open state using `useState`.
 *
 * @param params - Optional configuration for controlled open state behavior.
 *
 * @returns An object containing:
 * - `activeOpen` – The current open state (controlled or internal).
 * - `setActiveOpen` – Setter function to update the open state (controlled or internal).
 *
 * @example
 * ```ts
 * // Uncontrolled mode
 * const { activeOpen, setActiveOpen } = usePresetActiveOpen();
 *
 * // Controlled mode
 * const { activeOpen, setActiveOpen } = usePresetActiveOpen({ presetOpen, setPresetOpen });
 * ```
 */
export default function usePresetActiveOpen(params: PresetValues = {}) {
    const {presetOpen, setPresetOpen} = params;
    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const activeOpen = isControlled ? presetOpen : isOpen;
    const setActiveOpen = isControlled ? setPresetOpen : setIsOpen;

    return {
        activeOpen,
        setActiveOpen,
    };
}