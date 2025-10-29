import { z } from "zod";
import { ScreenTypeEnum } from "@/pages/screens/schema/ScreenType.enum.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { FormStarterValueSchema } from "@/common/schema/form/FormStarterValueSchema.ts";
import { CleanedNonNegativeNumberSchema } from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Schema representing the initial form values for a screen.
 * All fields are wrapped in `FormStarterValueSchema` to support optional default values.
 */
export const ScreenFormValuesSchema = z.object({
    /** Initial value for the screen name */
    name: FormStarterValueSchema,

    /** Initial value for the screen capacity */
    capacity: FormStarterValueSchema,

    /** Initial value for the screen type */
    screenType: FormStarterValueSchema,

    /** Initial value for the associated theatre ID */
    theatre: FormStarterValueSchema,
});

/**
 * Schema for validating a screen form submission.
 * Ensures all required fields are correctly typed and constrained.
 */
export const ScreenFormSchema = z.object({
    /** Name of the screen (max 255 characters) */
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),

    /** Capacity of the screen (non-negative number) */
    capacity: CleanedNonNegativeNumberSchema,

    /** Type of screen (e.g., IMAX, Standard, 3D) */
    screenType: ScreenTypeEnum,

    /** Associated theatre ID */
    theatre: IDStringSchema,
});
