/**
 * @fileoverview Hook for managing the current user's reservation query options form.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {
    CurrentUserReservationsQueryOptions,
    CurrentUserReservationsQueryOptionSchema
} from "@/domains/reservations/_feat/fetch-current-user-reservations/schema";
import {
    CurrentUserReservationsQueryOptionFormValues
} from "@/domains/reservations/_feat/fetch-current-user-reservations/form/CurrentUserReservationsQueryOptionFormValues.ts";
import {
    useCurrentUserReservationsQueryOptionFormDefaultValues
} from "@/domains/reservations/_feat/fetch-current-user-reservations/form/useCurrentUserReservationsQueryOptionFormDefaultValues.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormValuesConfig} from "@/common/_feat/submit-data";

/** Initialises a React Hook Form for managing current user reservation query parameters. */
export function useCurrentUserReservationsQueryOptionForm(
    values: FormValuesConfig<CurrentUserReservationsQueryOptionFormValues, CurrentUserReservationsQueryOptions> = {}
): UseFormReturn<CurrentUserReservationsQueryOptionFormValues, unknown, CurrentUserReservationsQueryOptions> {
    const defaultValues = useCurrentUserReservationsQueryOptionFormDefaultValues(values);

    return useForm<CurrentUserReservationsQueryOptionFormValues, unknown, CurrentUserReservationsQueryOptions>({
        resolver: zodResolver(CurrentUserReservationsQueryOptionSchema),
        defaultValues,
    });
}