/** @fileoverview Zod schema and type definitions for raw movie credit form values. */

import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";

/** Zod schema for the initial, unprocessed form state of a movie credit. */
export const MovieCreditFormValuesSchema = z.object({
    movie: FormStarterValueSchema,
    person: FormStarterValueSchema,
    department: FormStarterValueSchema,
    roleType: FormStarterValueSchema,
    displayRoleName: FormStarterValueSchema,
    notes: FormStarterValueSchema,
    creditedAs: FormStarterValueSchema,
    characterName: FormStarterValueSchema,
    billingOrder: FormStarterValueSchema,
    isPrimary: FormStarterValueSchema,
    uncredited: FormStarterValueSchema,
    voiceOnly: FormStarterValueSchema,
    cameo: FormStarterValueSchema,
    motionCapture: FormStarterValueSchema,
    archiveFootage: FormStarterValueSchema,
});

/** Type representing the raw movie credit form state inferred from MovieCreditFormValuesSchema. */
export type MovieCreditFormValues = z.infer<typeof MovieCreditFormValuesSchema>;