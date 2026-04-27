/** @fileoverview Zod schema and type definitions for cast member credit forms. */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {MovieCreditFormBaseSchema} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormBaseSchema.ts";

/** Zod schema for a complete cast credit including base fields. */
export const MovieCreditFormCastSchema = MovieCreditFormBaseSchema.extend({
    department: z.literal("CAST", {required_error: "Required.", message: "Must be `CAST`."}),
    characterName: NonEmptyStringSchema.max(150, {message: "Must be 150 characters or less."}),
    billingOrder: z.preprocess(
        (val) => {
            if (typeof val !== "number" && !(typeof val === "string" && val !== "")) return undefined;
            const num = Number(val);
            return !isNaN(num) ? num : undefined;
        },
        PositiveNumberSchema.optional(),
    ),
    isPrimary: CoercedBooleanValueSchema.optional(),
    uncredited: CoercedBooleanValueSchema.optional(),
    voiceOnly: CoercedBooleanValueSchema.optional(),
    cameo: CoercedBooleanValueSchema.optional(),
    motionCapture: CoercedBooleanValueSchema.optional(),
    archiveFootage: CoercedBooleanValueSchema.optional(),
});

/** Type representing a full cast credit form inferred from MovieCreditFormCastSchema. */
export type MovieCreditFormCastValues = z.infer<typeof MovieCreditFormCastSchema>;