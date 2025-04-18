import {z} from "zod";
import {IDString, RequiredString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {CoercedDate} from "@/common/schema/helpers/ZodDateHelpers.ts";
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

    startTime: CoercedDate,

    endTime: CoercedDate,

    ticketPrice: RequiredNumber
        .gt(0, "Must be greater than 0"),

    language: RequiredString,

    subtitleLanguages: z
        .array(RequiredString)
        .nonempty({message: "Must not be empty."}),

    isSpecialEvent: RequiredBoolean
        .optional(),

    isActive: RequiredBoolean
        .optional(),
});