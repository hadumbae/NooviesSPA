/**
 * @fileoverview Custom React hook for managing the Genre Query Option form.
 * Integrates React Hook Form with Zod validation for consistent form handling
 * and schema-based validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {GenreQueryOptionFormValues} from "@/pages/genres/schema/filters/GenreQueryOptionForm.types.ts";
import {GenreQueryOptionSchema} from "@/pages/genres/schema/filters/GenreQueryOptions.schema.ts";

/**
 * Parameters accepted by {@link useGenreQueryOptionForm}.
 */
type QueryOptionFormParams = {
    /**
     * Optional preset form values used to initialize the form.
     * Typically passed when restoring saved query state or defaults.
     */
    presetValues?: Partial<GenreQueryOptionFormValues>;
};

/**
 * React hook that sets up a Genre Query Option form using React Hook Form.
 *
 * @param {QueryOptionFormParams} params - Optional parameters including preset values.
 * @returns {UseFormReturn<GenreQueryOptionFormValues>} React Hook Form methods and state.
 *
 * @example
 * ```tsx
 * const form = useGenreQueryOptionForm({
 *   presetValues: { name: "Action", sortByName: "asc" }
 * });
 *
 * <form onSubmit={form.handleSubmit(onSubmit)}>
 *   <input {...form.register("name")} />
 *   <select {...form.register("sortByName")}>
 *     <option value="">None</option>
 *     <option value="asc">Ascending</option>
 *     <option value="desc">Descending</option>
 *   </select>
 * </form>
 * ```
 */
export default function useGenreQueryOptionForm(
    params: QueryOptionFormParams = {}
): UseFormReturn<GenreQueryOptionFormValues> {
    const {presetValues} = params;
    const {name, sortByName} = presetValues ?? {};

    const defaultValues: GenreQueryOptionFormValues = {
        name: name ?? "",
        sortByName: sortByName ?? "",
    };

    return useForm<GenreQueryOptionFormValues>({
        resolver: zodResolver(GenreQueryOptionSchema),
        defaultValues,
    });
}
