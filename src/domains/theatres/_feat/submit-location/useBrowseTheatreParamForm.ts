/**
 * @fileoverview React Hook Form initializer for theatre browse parameters.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    useBrowseTheatreParamFormDefaultValues,
} from "@/domains/theatres/_feat/submit-location/useBrowseTheatreParamFormDefaultValues.ts";
import {
    BrowseTheatreParams,
    BrowseTheatreParamSchema
} from "@/domains/theatres/_feat/submit-location/BrowseTheatreParamSchema.ts";
import {BrowseTheatreParamFormStarterValues} from "./BrowseTheatreParamFormStarterValues";

/** Initialisation options for the browse theatre form. */
export type FormParams = {
    presetValues?: Partial<BrowseTheatreParamFormStarterValues>;
};

/**
 * Creates a React Hook Form instance for theatre browse parameters using Zod validation.
 */
export function useBrowseTheatreParamForm(
    params?: FormParams,
): UseFormReturn<BrowseTheatreParamFormStarterValues, unknown, BrowseTheatreParams> {
    const defaultValues = useBrowseTheatreParamFormDefaultValues(params);

    return useForm<BrowseTheatreParamFormStarterValues, unknown, BrowseTheatreParams>({
        resolver: zodResolver(BrowseTheatreParamSchema),
        defaultValues,
    });
}
