/**
 * @file useBrowseTheatreParamForm.ts
 *
 * React Hook Form initializer for theatre browse parameters.
 *
 * Integrates:
 * - **Zod** schema validation
 * - **React Hook Form** state management
 * - Stable default values via `useBrowseTheatreParamFormDefaultValues`
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    BrowseTheatreParamFormValues,
    BrowseTheatreParams,
    BrowseTheatreParamsSchema,
} from "@/pages/movies/schema/params/BrowseTheatreParams.ts";
import {
    useBrowseTheatreParamFormDefaultValues,
} from "@/pages/theatres/hooks/forms/browse-theatre-params/useBrowseTheatreParamFormDefaultValues.ts";

/**
 * Parameters for initializing the browse theatre form.
 */
type FormParams = {
    /** Optional preset browse parameters used to prefill the form */
    presetValues?: Partial<BrowseTheatreParams>;
};

/**
 * Creates a React Hook Form instance for browsing theatres.
 *
 * - Applies Zod-based validation
 * - Injects stable default values to prevent unnecessary resets
 *
 * @param params - Form initialization parameters
 * @returns React Hook Form API for browse theatre parameters
 */
export function useBrowseTheatreParamForm(params?: FormParams): UseFormReturn<BrowseTheatreParamFormValues> {
    const defaultValues = useBrowseTheatreParamFormDefaultValues(params);

    return useForm<BrowseTheatreParamFormValues>({
        resolver: zodResolver(BrowseTheatreParamsSchema),
        defaultValues,
    });
}
