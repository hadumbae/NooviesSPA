import {z, ZodType} from "zod";
import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";

export const TheatreSchema: ZodType<ITheatre> = z.object({
    _id: IDStringSchema.readonly(),

    name: NonEmptyStringSchema
        .min(1, "Required.")
        .max(255, "Must be 255 characters or less."),

    location: NonEmptyStringSchema
        .min(1, "Required.")
        .max(255, "Must be 255 characters or less."),

    seatCapacity: RequiredNumberSchema
        .gte(0, "Must be equal or greater than 0."),

    screens: z.array(z.union([
        IDStringSchema,
        z.lazy(() => ScreenSchema),
    ])),

    seats: z.array(z.union([
        IDStringSchema,
        z.lazy(() => SeatSchema),
    ])),
});

export const TheatreArraySchema = z.array(TheatreSchema);

export type Theatre = z.infer<typeof TheatreSchema>;
export type TheatreArray = z.infer<typeof TheatreArraySchema>;