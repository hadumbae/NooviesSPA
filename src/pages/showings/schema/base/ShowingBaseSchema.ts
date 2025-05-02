import {z} from "zod";
import {IDString, TrimmedStringSchema} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {CoercedDateSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";

/**
 * Zod schema for validating a `Showing` object.
 *
 * This schema defines the structure and validation rules for a `Showing` object.
 */
export default z.object({
    _id: IDString
        .readonly(),

    startTime: CoercedDateSchema,

    endTime: CoercedDateSchema,

    ticketPrice: RequiredNumber
        .gt(0, "Must be greater than 0"),

    language: TrimmedStringSchema,

    subtitleLanguages: z
        .array(TrimmedStringSchema)
        .nonempty({message: "Must not be empty."}),

    isSpecialEvent: RequiredBoolean
        .optional(),

    isActive: RequiredBoolean
        .optional(),
});