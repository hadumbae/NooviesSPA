import {useForm, UseFormReturn} from "react-hook-form";
import {TheatreQueryOptionFormValues} from "@/pages/theatres/schema/queries/TheatreQueryOptionFormSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {TheatreQueryOptionSchema} from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";
import {TheatreQueryOptions} from "@/pages/theatres/schema/queries/TheatreQueryOption.types.ts";

type FormProps = {
    /** Optional preset values to initialize the form with. */
    presetValues?: Partial<TheatreQueryOptions>;
}

/**
 * Custom React Hook that creates and manages a form instance for theatre query options.
 *
 * @remarks
 * This hook integrates **React Hook Form** with **Zod** validation via the `zodResolver`.
 * It initializes the form with both filtering and sorting fields, allowing users
 * to query theatres based on attributes like name, seat capacity, and location.
 *
 * The function merges any provided `presetValues` with a set of default empty-string values
 * to ensure form stability even when no input is given.
 *
 * @param {FormProps} [options] - Optional configuration for the form.
 * @param {Partial<TheatreQueryOptionFormValues>} [options.presetValues] -
 * Initial values to prefill the form with. Fields not provided default to empty strings.
 *
 * @returns {UseFormReturn<TheatreQueryOptionFormValues>} A React Hook Form instance
 * providing control, validation, and state management for theatre query options.
 *
 * @example
 * ```tsx
 * const form = useTheatreQueryOptionForm({
 *   presetValues: { name: "Grand Theatre", sortByCity: "asc" }
 * });
 *
 * return (
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <input {...form.register("name")} placeholder="Theatre Name" />
 *     <select {...form.register("sortByCity")}>
 *       <option value="">--</option>
 *       <option value="asc">Ascending</option>
 *       <option value="desc">Descending</option>
 *     </select>
 *   </form>
 * );
 * ```
 */
export default function useTheatreQueryOptionForm(
    {presetValues}: FormProps = {}
): UseFormReturn<TheatreQueryOptionFormValues> {
    // ⚡ Filters ⚡
    const defaultFilterValues = {
        _id: presetValues?._id ?? "",
        name: presetValues?.name ?? "",
        seatCapacity: presetValues?.seatCapacity ?? "",
        street: presetValues?.street ?? "",
        city: presetValues?.city ?? "",
        state: presetValues?.state ?? "",
        country: presetValues?.country ?? "",
        postalCode: presetValues?.postalCode ?? "",
        timezone: presetValues?.timezone ?? "",
    };

    // ⚡ Sort ⚡
    const defaultSortValues = {
        sortByName: presetValues?.sortByName ?? "",
        sortBySeatCapacity: presetValues?.sortBySeatCapacity ?? "",
        sortByCity: presetValues?.sortByCity ?? "",
        sortByState: presetValues?.sortByState ?? "",
        sortByCountry: presetValues?.sortByCountry ?? "",
        sortByPostCode: presetValues?.sortByPostCode ?? "",
        sortByTimezone: presetValues?.sortByTimezone ?? "",
    };

    return useForm<TheatreQueryOptionFormValues>({
        resolver: zodResolver(TheatreQueryOptionSchema),
        defaultValues: {...defaultFilterValues, ...defaultSortValues},
    });
}
