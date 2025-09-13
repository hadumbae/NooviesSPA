import { z } from "zod";
import {
    MovieCreditFormBaseSchema,
    MovieCreditFormCastOnlySchema,
    MovieCreditFormCastSchema,
    MovieCreditFormSchema,
    MovieCreditFormValuesSchema,
    MovieCreditSubmitCrewSchema
} from "@/pages/moviecredit/schemas/form/MovieCreditForm.schema.ts";

/**
 * Type representing the **raw form values** for a movie credit.
 * All fields use `FormStarterValueSchema` placeholders.
 */
export type MovieCreditFormValues = z.infer<typeof MovieCreditFormValuesSchema>;

/**
 * Type representing the **base values** for a movie credit form.
 * Includes core fields like `movie`, `person`, `roleType`, `displayRoleName`, and `notes`.
 */
export type MovieCreditFormBaseValues = z.infer<typeof MovieCreditFormBaseSchema>;

/**
 * Type representing a **CAST credit** using only the shared fields.
 */
export type MovieCreditFormCastOnlyValues = z.infer<typeof MovieCreditFormCastOnlySchema>;

/**
 * Type representing a **CAST credit** including base and shared fields.
 */
export type MovieCreditFormCastValues = z.infer<typeof MovieCreditFormCastSchema>;

/**
 * Type representing a **CREW credit** with all crew-specific rules applied.
 */
export type MovieCreditFormCrewValues = z.infer<typeof MovieCreditSubmitCrewSchema>;

/**
 * Discriminated union type representing either a **CREW** or **CAST** movie credit.
 */
export type MovieCreditForm = z.infer<typeof MovieCreditFormSchema>;
