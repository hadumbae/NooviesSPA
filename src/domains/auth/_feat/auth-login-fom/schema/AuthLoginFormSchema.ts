/**
 * @fileoverview Defines validation schemas and types for the user login form.
 */

import {z} from "zod";
import {EmailStringSchema} from "@/common/schema/strings/EmailStringSchema.ts";
import {AnyValues} from "@/common/types";
import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";

/** Zod schema for validating user login credentials. */
export const AuthLoginFormSchema = z.object({
    email: preprocessEmptyStringToUndefined(EmailStringSchema),
    password: preprocessEmptyStringToUndefined(StringValueSchema),
});

/** Type representing validated login form data. */
export type AuthLoginFormData = z.infer<typeof AuthLoginFormSchema>;

/** Type representing raw or partial login form values. */
export type AuthLoginFormValues = AnyValues<AuthLoginFormData>;