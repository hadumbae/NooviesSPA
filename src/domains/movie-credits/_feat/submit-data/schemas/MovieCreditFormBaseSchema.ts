/**
 * @fileoverview Zod schema and type definitions for base movie credit form fields.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {
    preprocessEmptyToUndefined
} from "@/common/_feat/validation-preprocessors";
import {NonEmptyStringSchema} from "@/common/_schemas";

/** Zod schema for core movie credit fields common to both cast and crew. */
export const MovieCreditFormBaseSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    movie: IDStringSchema,
    person: IDStringSchema,
    roleType: IDStringSchema,
    displayRoleName: preprocessEmptyToUndefined(
        NonEmptyStringSchema.max(150, {message: "Must be 150 characters or less."}).optional()
    ),
    creditedAs: preprocessEmptyToUndefined(
        NonEmptyStringSchema.max(150, {message: "Must be 150 characters or less."}).optional()
    ),
    notes: preprocessEmptyToUndefined(
        NonEmptyStringSchema.max(1000, {message: "Must be 1000 characters or less."}).optional()
    ),
});

/** Type representing the core movie credit fields inferred from MovieCreditFormBaseSchema. */
export type MovieCreditFormBaseValues = z.infer<typeof MovieCreditFormBaseSchema>;