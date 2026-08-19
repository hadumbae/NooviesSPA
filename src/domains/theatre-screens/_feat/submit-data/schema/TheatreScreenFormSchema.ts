/**
 * @fileoverview Zod validation schema and type definitions for Theatre Screen forms.
 */

import {z} from "zod";
import {IDStringSchema, NonEmptyStringSchema} from "@/common/_schemas";
import {preprocessEmptyToUndefined} from "@/common/_feat/validation-preprocessors";
import {ScreenTypeSchema} from "@/domains/theatre-screens/_schema";
import {
    CoercedNonNegativeNumberSchema
} from "@/common/_schemas/numbers/non-negative-number/CoercedNonNegativeNumberSchema";
import {AnyValues} from "@/common/_types";

/**
 * Zod schema for validating theatre screen creation and update submissions.
 */
export const TheatreScreenFormSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    name: preprocessEmptyToUndefined(NonEmptyStringSchema.max(255, "Must be 255 characters or less.")),
    capacity: preprocessEmptyToUndefined(CoercedNonNegativeNumberSchema),
    screenType: preprocessEmptyToUndefined(ScreenTypeSchema),
    theatre: preprocessEmptyToUndefined(IDStringSchema),
});

/** Validated data structure for Theatre Screen form submissions. */
export type TheatreScreenFormData = z.infer<typeof TheatreScreenFormSchema>;

/**
 * TypeScript type representing the initial or "in-progress" values of a Theatre Screen form.
 */
export type TheatreScreenFormValues = AnyValues<TheatreScreenFormData>;