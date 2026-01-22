/**
 * @file useTheatreShowingQueryForm.ts
 *
 * React Hook Form wrapper for Theatre Showing query options.
 *
 * Integrates:
 * - {@link TheatreShowingQueryOptionSchema} for runtime validation
 * - React Hook Form for form state management
 * - Zod resolver for schema-based validation
 * - Stable default values via {@link useTheatreShowingQueryFormDefaultValues}
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {
    TheatreShowingQueryFormValues,
    TheatreShowingQueryOptions
} from "@/pages/showings/schema/features/movie-showings/TheatreShowingQueryOptions.types.ts";
import {
    useTheatreShowingQueryFormDefaultValues
} from "@/pages/showings/hooks/forms/theatre-showing-query-form/useTheatreShowingQueryFormDefaultValues.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    TheatreShowingQueryOptionSchema
} from "@/pages/showings/schema/features/movie-showings/TheatreShowingQueryOptions.schema.ts";

/**
 * Parameters for {@link useTheatreShowingQueryForm}.
 */
type FormParams = {
    /**
     * Optional preset query values.
     *
     * These values are merged into the form's default state and
     * are typically derived from URL parameters or persisted filters.
     */
    presetValues?: Partial<TheatreShowingQueryOptions>;
};

/**
 * React Hook Form hook for Theatre Showing query forms.
 *
 * - Provides validated query form state
 * - Applies Zod-based validation
 * - Ensures stable default values across renders
 *
 * @param params - Hook configuration parameters
 * @returns React Hook Form instance for Theatre Showing queries
 */
export function useTheatreShowingQueryForm(
    {presetValues}: FormParams
): UseFormReturn<TheatreShowingQueryFormValues> {
    const defaultValues = useTheatreShowingQueryFormDefaultValues({presetValues});

    return useForm<TheatreShowingQueryFormValues>({
        resolver: zodResolver(TheatreShowingQueryOptionSchema),
        defaultValues,
    });
}
