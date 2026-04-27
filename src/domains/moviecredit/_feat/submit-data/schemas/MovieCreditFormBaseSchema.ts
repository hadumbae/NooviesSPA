/** @fileoverview Zod schema and type definitions for base movie credit form fields. */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/** Zod schema for core movie credit fields common to both cast and crew. */
export const MovieCreditFormBaseSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    movie: IDStringSchema,
    person: IDStringSchema,
    roleType: IDStringSchema,
    displayRoleName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, {message: "Must be 150 characters or less."}).optional()
    ),
    creditedAs: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, {message: "Must be 150 characters or less."}).optional()
    ),
    notes: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(1000, {message: "Must be 1000 characters or less."}).optional()
    ),
});

/** Type representing the core movie credit fields inferred from MovieCreditFormBaseSchema. */
export type MovieCreditFormBaseValues = z.infer<typeof MovieCreditFormBaseSchema>;