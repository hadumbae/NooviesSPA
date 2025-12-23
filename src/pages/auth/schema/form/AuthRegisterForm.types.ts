/**
 * Registration form type definitions.
 *
 * Provides inferred TypeScript types derived from the
 * registration Zod schemas.
 */
import {z} from "zod";
import {
    AuthRegisterFormSchema,
    AuthRegisterFormValuesSchema,
} from "@/pages/auth/schema/form/AuthRegisterForm.schema.ts";

/**
 * Registration form input type.
 *
 * @remarks
 * Inferred from {@link AuthRegisterFormSchema}.
 */
export type AuthRegisterForm =
    z.infer<typeof AuthRegisterFormSchema>;

/**
 * Form-ready registration values type.
 *
 * @remarks
 * Inferred from {@link AuthRegisterFormValuesSchema}.
 */
export type AuthRegisterFormValues =
    z.infer<typeof AuthRegisterFormValuesSchema>;
