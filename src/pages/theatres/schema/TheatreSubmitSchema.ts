import {z, ZodType} from "zod";
import ITheatreSubmit from "@/pages/theatres/interfaces/ITheatreSubmit.ts";
import {TrimmedStringSchema} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";

export const TheatreSubmitSchema: ZodType<ITheatreSubmit> = z.object({
    name: TrimmedStringSchema
        .min(1, "Required.")
        .max(255, "Must be 255 characters or less."),

    location: TrimmedStringSchema
        .min(1, "Required.")
        .max(255, "Must be 255 characters or less."),

    seatCapacity: z
        .union([z.literal(""), RequiredNumber])
        .refine(num => num !== "", {message: "Required."})
        .refine(num => num >= 0, {message: "Must be 0 or greater."}),
});

export type TheatreSubmit = z.infer<typeof TheatreSubmitSchema>;