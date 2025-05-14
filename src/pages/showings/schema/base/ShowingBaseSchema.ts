import {z} from "zod";
import {CoercedDateSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";

/**
 * Zod schema for validating a `Showing` object.
 *
 * This schema defines the structure and validation rules for a `Showing` object.
 */
export default z.object({
    _id: IDStringSchema
        .readonly(),

    startTime: CoercedDateSchema,

    endTime: CoercedDateSchema,

    ticketPrice: RequiredNumberSchema
        .gt(0, "Must be greater than 0"),

    language: NonEmptyStringSchema,

    subtitleLanguages: z
        .array(NonEmptyStringSchema)
        .nonempty({message: "Must not be empty."}),

    isSpecialEvent: RequiredBoolean
        .optional(),

    isActive: RequiredBoolean
        .optional(),
});