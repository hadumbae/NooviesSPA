/**
 * @fileoverview Zod validation schema for user password update requests.
 */

import {z} from "zod";
import {UserPasswordSchema} from "@/domains/auth/_feat";
import {AnyValues} from "@/common/_types";

/** Zod schema for validating password update and confirmation fields. */
export const UserPasswordUpdateFormSchema = z.object({
    password: UserPasswordSchema,
    confirm: UserPasswordSchema,
}).refine(
    passwords => passwords.password === passwords.confirm,
    {message: "Passwords don't match.", path: ["confirm"]},
);

/** Type representing the validated password update form data. */
export type UserPasswordUpdateFormData = z.infer<typeof UserPasswordUpdateFormSchema>;

/** Type representing the raw input values for the password update form. */
export type UserPasswordUpdateFormValues = AnyValues<UserPasswordUpdateFormData>;