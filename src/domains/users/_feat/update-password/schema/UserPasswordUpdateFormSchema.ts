/**
 * @fileoverview Zod validation schema for user password update requests.
 */

import {z} from "zod";
import {AnyValues} from "@/common/_types";
import {UserPasswordSchema} from "@/domains/users/_schema/fields";

/** Zod schema for validating password update and confirmation fields. */
export const UserPasswordUpdateFormSchema = z.object({
    password: UserPasswordSchema,
    confirm: UserPasswordSchema,
}).refine(
    ({password, confirm}) => password === confirm,
    {message: "Passwords don't match.", path: ["confirm"]},
);

/** Type representing the validated password update form data. */
export type UserPasswordUpdateFormData = z.infer<typeof UserPasswordUpdateFormSchema>;

/** Type representing the raw input values for the password update form. */
export type UserPasswordUpdateFormValues = AnyValues<UserPasswordUpdateFormData>;