import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenFormSchema } from "@/pages/screens/schema/forms/ScreenForm.schema.ts";
import { Screen } from "@/pages/screens/schema/screen/Screen.types.ts";
import { ScreenFormValues } from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

/**
 * Parameters for `useScreenSubmitForm`.
 */
type FormParams = {
    /** Optional preset form values that override defaults */
    presetValues?: Partial<ScreenFormValues>;

    /** Optional screen object whose values will populate the form */
    screen?: Screen;
};

/**
 * Custom React hook for initializing a screen form with react-hook-form.
 *
 * Combines preset values and optional existing screen data to set up default values.
 * Uses `ScreenFormSchema` for Zod-based validation via `zodResolver`.
 *
 * @param params Optional configuration including preset values and existing screen
 * @returns A `react-hook-form` instance typed with `ScreenFormValues`
 *
 * @example
 * const { register, handleSubmit, formState } = useScreenSubmitForm({ screen: myScreen });
 */
export default function useScreenSubmitForm({ screen, presetValues }: FormParams = {}) {
    const defaultValues: ScreenFormValues = {
        name: getDefaultValue(presetValues?.name, screen?.name, ""),
        capacity: getDefaultValue(presetValues?.capacity, screen?.capacity, ""),
        screenType: getDefaultValue(presetValues?.screenType, screen?.screenType, undefined),
        theatre: getDefaultValue(presetValues?.theatre, screen?.theatre, undefined),
    };

    return useForm<ScreenFormValues>({
        resolver: zodResolver(ScreenFormSchema),
        defaultValues,
    });
}
