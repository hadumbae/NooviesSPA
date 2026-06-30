/**
 * @fileoverview Zod validation schema and type definitions for Theatre Screen forms.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {CoercedNonNegativeNumberSchema,} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {ScreenTypeSchema} from "@/domains/theatre-screens/_schema";

/**
 * Zod schema for validating theatre screen creation and update submissions.
 */
export const TheatreScreenFormSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),
    capacity: preprocessEmptyStringToUndefined(CoercedNonNegativeNumberSchema),
    screenType: ScreenTypeSchema,
    theatre: IDStringSchema,
});

/** Validated data structure for Theatre Screen form submissions. */
export type TheatreScreenFormData = z.infer<typeof TheatreScreenFormSchema>;