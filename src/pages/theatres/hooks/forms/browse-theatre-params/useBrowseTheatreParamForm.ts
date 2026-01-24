/**
 * @file useBrowseTheatreParamForm.ts
 *
 * React Hook Form initializer for theatre browse parameters.
 *
 * Integrates:
 * - Zod-based validation
 * - React Hook Form state management
 * - Stable default values
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    useBrowseTheatreParamFormDefaultValues,
} from "@/pages/theatres/hooks/forms/browse-theatre-params/useBrowseTheatreParamFormDefaultValues.ts";
import {
    BrowseTheatreParamFormValues,
    BrowseTheatreParams,
    BrowseTheatreParamSchema,
} from "@/pages/theatres/schema/params/client/browse-theatre-list/BrowseTheatreParamSchema.ts";

/**
 * Initialization options for the browse theatre form.
 */
type FormParams = {
    /** Optional preset values used to prefill the form */
    presetValues?: Partial<BrowseTheatreParams>;
};

/**
 * Creates a React Hook Form instance for theatre browse parameters.
 *
 * @param params - Optional initialization options
 */
export function useBrowseTheatreParamForm(
    params?: FormParams,
): UseFormReturn<BrowseTheatreParamFormValues> {
    const defaultValues = useBrowseTheatreParamFormDefaultValues(params);

    return useForm<BrowseTheatreParamFormValues>({
        resolver: zodResolver(BrowseTheatreParamSchema),
        defaultValues,
    });
}
