import {z, ZodType} from "zod";
import {IDString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {CoercedDateSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import IShowingSubmit from "@/pages/showings/interfaces/IShowingSubmit.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {LanguageEnum} from "@/common/schema/enums/LanguageEnum.ts";


/**
 * Zod schema for validating `Showing` submission data.
 *
 * This schema defines the structure and constraints
 * for data submitted when creating or updating a showing.
 */
export const ShowingSubmitSchema: ZodType<IShowingSubmit> = z.object({
    startTime: z
        .union([z.literal(""), CoercedDateSchema])
        .refine((date) => date !== "", {message: "Required."}),

    endTime: CoercedDateSchema.optional(),

    ticketPrice: RequiredNumber
        .gt(0, "Must be greater than 0"),

    language: LanguageEnum,

    subtitleLanguages: z
        .array(LanguageEnum)
        .nonempty({message: "Must not be empty."}),

    isSpecialEvent: RequiredBoolean
        .optional(),

    isActive: RequiredBoolean
        .optional(),

    movie: IDString,
    theatre: IDString,
    screen: IDString,
});

/**
 * Represents the submission data of a `Showing`
 * object, inferred from `ShowingArraySchema`.
 */
export type ShowingSubmit = z.infer<typeof ShowingSubmitSchema>;

