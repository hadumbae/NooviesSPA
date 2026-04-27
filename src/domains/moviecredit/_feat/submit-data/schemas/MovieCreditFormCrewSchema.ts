/** @fileoverview Zod schema and type definitions for crew credit form submissions. */

import {MovieCreditFormBaseSchema} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormBaseSchema.ts";
import {z} from "zod";
import {UndefinedForCrewFieldSchema} from "@/domains/moviecredit/schemas";

/** Zod schema for crew credit submissions that explicitly disallows cast-specific fields. */
export const MovieCreditFormCrewSchema = MovieCreditFormBaseSchema.extend({
    department: z.literal("CREW", {required_error: "Required.", message: "Must be `CREW`."}),
    billingOrder: UndefinedForCrewFieldSchema,
    characterName: UndefinedForCrewFieldSchema,
    isPrimary: UndefinedForCrewFieldSchema,
    uncredited: UndefinedForCrewFieldSchema,
    voiceOnly: UndefinedForCrewFieldSchema,
    cameo: UndefinedForCrewFieldSchema,
    motionCapture: UndefinedForCrewFieldSchema,
    archiveFootage: UndefinedForCrewFieldSchema,
});

/** Type representing a full crew credit form inferred from MovieCreditSubmitCrewSchema. */
export type MovieCreditFormCrewValues = z.infer<typeof MovieCreditFormCrewSchema>;