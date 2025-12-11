/**
 * @file useScreenSubmitFormDefaultValues.ts
 * @summary
 * Hook for generating and managing default values for a `Screen` form.
 *
 * @description
 * Combines multiple sources of default values for a `Screen` form:
 * - Hardcoded field defaults
 * - Existing `Screen` entity (edit workflows)
 * - Optional `presetValues` from parent components
 *
 * Synchronizes these defaults with `ScreenFormContext.initialValues`
 * and ensures stable references to avoid unnecessary re-renders.
 *
 * @param params.presetValues - Optional partial form values to override defaults.
 * @param params.screen - Optional existing `Screen` entity for edit mode.
 * @returns The merged and context-synced `ScreenFormValues` object.
 *
 * @example
 * ```ts
 * const defaultValues = useScreenSubmitFormDefaultValues({
 *   screen: existingScreen,
 *   presetValues: { name: "Main Hall" },
 * });
 * ```
 */
import { Screen } from "@/pages/screens/schema/screen/Screen.types.ts";
import { ScreenFormValues } from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import { ScreenFormContext } from "@/pages/screens/contexts/screen-form/ScreenFormContext.ts";
import { useEffect, useRef } from "react";
import { isEqual } from "lodash";

type ValuesParams = {
    /** Partial form values that override all other defaults, useful for pre-filling fields. */
    presetValues?: Partial<ScreenFormValues>;

    /** Existing `Screen` entity for edit workflows; merged before `presetValues`. */
    screen?: Screen;
};

/**
 * Generates merged default values for a `Screen` form and syncs them to context.
 *
 * @param params - Configuration for default values including preset overrides and existing entity.
 * @returns `ScreenFormValues` merged from defaults, entity, and preset values.
 */
export default function useScreenSubmitFormDefaultValues(params: ValuesParams) {
    const { presetValues, screen } = params;

    // --- Stable Reference ---
    const heldValues = useRef<ScreenFormValues | null>(null);

    // --- Access Context ---
    const { setInitialValues, currentValues } = useRequiredContext({ context: ScreenFormContext });

    // --- Default Values ---
    const defaultValues: ScreenFormValues = {
        name: "",
        capacity: "",
        screenType: undefined,
        theatre: undefined,
        ...screen,
        ...presetValues,
    };

    // --- Sync Values to Context ---
    useEffect(() => {
        if (!isEqual(heldValues.current, defaultValues)) {
            heldValues.current = defaultValues;
            setInitialValues(defaultValues);
        }
    }, [defaultValues, setInitialValues]);

    // --- Return Current or Default Values ---
    return currentValues ?? (heldValues.current ?? defaultValues) as ScreenFormValues;
}
