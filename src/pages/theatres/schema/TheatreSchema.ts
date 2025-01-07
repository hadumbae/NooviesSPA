import {z, ZodType} from "zod";
import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import {IDString, RequiredString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {ScreenSchema} from "@/pages/screens/schema/ScreenSchema.ts";
import {SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";

export const TheatreSchema: ZodType<ITheatre> = z.object({
    _id: IDString.readonly(),

    name: RequiredString
        .min(1, "Required.")
        .max(255, "Must be 255 characters or less."),

    location: RequiredString
        .min(1, "Required.")
        .max(255, "Must be 255 characters or less."),

    numberOfSeats: RequiredNumber
        .gte(0, "Must be equal or greater than 0."),

    screens: z.array(z.union([
        IDString,
        z.lazy(() => ScreenSchema),
    ])),

    seats: z.array(z.union([
        IDString,
        z.lazy(() => SeatSchema),
    ])),
});

export const TheatreArraySchema = z.array(TheatreSchema);

export type Theatre = z.infer<typeof TheatreSchema>;
export type TheatreArray = z.infer<typeof TheatreArraySchema>;