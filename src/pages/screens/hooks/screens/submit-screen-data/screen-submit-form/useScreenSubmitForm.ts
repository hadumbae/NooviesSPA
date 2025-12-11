/**
 * @file useScreenSubmitForm.ts
 * @summary
 * Custom React hook for initializing and managing a `Screen` form.
 *
 * @description
 * This hook combines:
 * - Preset form values provided by parent components
 * - Optional existing `Screen` entity values (edit workflows)
 * - Default field values defined in `useScreenSubmitFormDefaultValues`
 *
 * It integrates with `react-hook-form` and uses `ScreenFormSchema`
 * for Zod-based validation via `zodResolver`. Returns a fully typed
 * form instance ready for use in screen submit forms.
 *
 * @param params - Optional configuration object
 * @param params.presetValues - Partial form values to override defaults
 * @param params.screen - Existing `Screen` entity to populate form values
 * @returns A `UseFormReturn<ScreenFormValues>` instance from `react-hook-form`
 *
 * @example
 * ```ts
 * const { register, handleSubmit, formState } = useScreenSubmitForm({
 *   screen: myScreen,
 *   presetValues: { name: "Main Hall" },
 * });
 * ```
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenFormSchema } from "@/pages/screens/schema/forms/ScreenForm.schema.ts";
import { Screen } from "@/pages/screens/schema/screen/Screen.types.ts";
import { ScreenFormValues } from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import useScreenSubmitFormDefaultValues
    from "@/pages/screens/hooks/screens/submit-screen-data/screen-submit-form/useScreenSubmitFormDefaultValues.ts";

type FormParams = {
    /** Optional preset form values that override defaults */
    presetValues?: Partial<ScreenFormValues>;

    /** Optional existing `Screen` entity whose values populate the form */
    screen?: Screen;
};

/**
 * Initializes a screen form with merged default values, validation, and react-hook-form integration.
 *
 * @param params Optional configuration including preset values and existing screen
 * @returns A typed react-hook-form instance for `ScreenFormValues`
 */
export default function useScreenSubmitForm({ screen, presetValues }: FormParams = {}) {
    const defaultValues: ScreenFormValues = useScreenSubmitFormDefaultValues({ presetValues, screen });

    return useForm<ScreenFormValues>({
        resolver: zodResolver(ScreenFormSchema),
        defaultValues,
    });
}
