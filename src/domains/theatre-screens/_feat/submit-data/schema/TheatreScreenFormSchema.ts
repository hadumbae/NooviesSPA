/**
 * @fileoverview Zod validation schema and type definitions for Theatre Screen forms.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {IDStringSchema} from "@/common/_schemas";
import {preprocessEmptyToUndefined} from "@/common/_feat/validation-preprocessors";
import {ScreenTypeSchema} from "@/domains/theatre-screens/_schema";
import {
    CoercedNonNegativeNumberSchema
} from "@/common/_schemas/numbers/non-negative-number/CoercedNonNegativeNumberSchema";

/**
 * Zod schema for validating theatre screen creation and update submissions.
 */
export const TheatreScreenFormSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),
    capacity: preprocessEmptyToUndefined(CoercedNonNegativeNumberSchema),
    screenType: ScreenTypeSchema,
    theatre: IDStringSchema,
});

/** Validated data structure for Theatre Screen form submissions. */
export type TheatreScreenFormData = z.infer<typeof TheatreScreenFormSchema>;