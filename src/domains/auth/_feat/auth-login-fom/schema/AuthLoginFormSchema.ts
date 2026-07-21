/**
 * @fileoverview Defines validation schemas and types for the user login form.
 */

import {z} from "zod";
import {EmailStringSchema} from "@/common/_schemas/strings/simple-strings/EmailStringSchema.ts";
import {AnyValues} from "@/common/_types";
import {StringValueSchema} from "@/common/_schemas";
import {preprocessEmptyToUndefined} from "@/common/_feat/validation-preprocessors";

/** Zod schema for validating user login credentials. */
export const AuthLoginFormSchema = z.object({
    email: preprocessEmptyToUndefined(EmailStringSchema),
    password: preprocessEmptyToUndefined(StringValueSchema),
});

/** Type representing validated login form data. */
export type AuthLoginFormData = z.infer<typeof AuthLoginFormSchema>;

/** Type representing raw or partial login form values. */
export type AuthLoginFormValues = AnyValues<AuthLoginFormData>;