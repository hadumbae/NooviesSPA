/**
 * @file Custom React Hook Form initialization for reservation code lookups.
 * @filename useSetReservationUniqueCodeForm.ts
 */

import {
    FetchByCodeSearchParams,
    SetReservationCodeFormSubmitSchema,
    SetReservationCodeFormValues
} from "@/domains/reservation/views/admin/reservation-by-code/schemas";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

/**
 * Props for the {@link useSetReservationUniqueCodeForm} hook.
 */
type FormProps = {
    /** Initial values typically derived from URL search parameters or session state. */
    presetValues?: Partial<FetchByCodeSearchParams>;
}

/**
 * Specialized hook for managing the reservation "Fetch by Code" search form state.
 * @param `props` - Optional configuration containing initial form values.
 * @returns A standard React Hook Form object typed with {@link SetReservationCodeFormValues}.
 */
export function useSetReservationUniqueCodeForm(
    {presetValues}: FormProps = {},
): UseFormReturn<SetReservationCodeFormValues> {
    return useForm<SetReservationCodeFormValues>({
        /** Bridges Zod schema validation with React Hook Form. */
        resolver: zodResolver(SetReservationCodeFormSubmitSchema),
        /** Ensures the "code" field is controlled from mount. */
        defaultValues: {
            code: presetValues?.code ?? "",
        },
    });
}