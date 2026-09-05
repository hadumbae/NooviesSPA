/**
 * @fileoverview Hook for managing the user index query options form state and validation.
 */

import {QueryOptionFormValues} from "@/common/_feat";
import {UserQueryOptions, UserQueryOptionsSchema} from "@/domains/users/_schema/query-options";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    UserIndexQueryOptionFormValues,
    useUserIndexQueryOptionFormDefaultValues
} from "@/domains/users/_feat/submit-query-options";

/** Initializes a React Hook Form instance for user index query options using Zod validation. */
export function useUserIndexQueryOptionForm(
    config: QueryOptionFormValues<UserIndexQueryOptionFormValues, UserQueryOptions>
): UseFormReturn<UserIndexQueryOptionFormValues, unknown, UserQueryOptions> {
    const defaultValues = useUserIndexQueryOptionFormDefaultValues(config);

    return useForm<UserIndexQueryOptionFormValues, unknown, UserQueryOptions>({
        resolver: zodResolver(UserQueryOptionsSchema),
        defaultValues,
    });
}