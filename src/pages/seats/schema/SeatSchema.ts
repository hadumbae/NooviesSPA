import {z, ZodType} from "zod";
import ISeat from "@/pages/seats/interfaces/ISeat.ts";
import {IDString, TrimmedStringSchema} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatTypeEnum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {ScreenSchema} from "@/pages/screens/schema/base/ScreenSchema.ts";

export const SeatSchema: ZodType<ISeat> = z.object({
    _id: IDString,

    row: TrimmedStringSchema
        .min(1, "Required.")
        .max(50, "Must be 50 characters or less."),

    seatNumber: TrimmedStringSchema
        .min(1, "Required.")
        .max(50, "Must be 50 characters or less."),

    seatType: SeatTypeEnum,

    isAvailable: RequiredBoolean,

    priceMultiplier: RequiredNumber
        .gte(0, "Must be 0 or greater."),

    theatre: z
        .union([IDString, z.lazy(() => TheatreSchema)]),

    screen: z
        .union([IDString, z.lazy(() => ScreenSchema)]),
});

export const SeatArraySchema = z.array(SeatSchema);

export type Seat = z.infer<typeof SeatSchema>;
export type SeatArray = z.infer<typeof SeatArraySchema>;