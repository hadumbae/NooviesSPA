/**
 * Login form type definitions.
 *
 * Provides inferred TypeScript types derived from
 * the login Zod schemas.
 */
import {z} from "zod";
import {
    AuthLoginFormSchema,
    AuthLoginFormValuesSchema,
} from "@/pages/auth/schema/form/AuthLoginForm.schema.ts";

/**
 * Login form input type.
 *
 * @remarks
 * Inferred from {@link AuthLoginFormSchema}.
 */
export type AuthLoginForm =
    z.infer<typeof AuthLoginFormSchema>;

/**
 * Form-ready login values type.
 *
 * @remarks
 * Inferred from {@link AuthLoginFormValuesSchema}.
 */
export type AuthLoginFormValues =
    z.infer<typeof AuthLoginFormValuesSchema>;
