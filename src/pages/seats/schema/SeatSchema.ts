import {z, ZodType} from "zod";
import ISeat from "@/pages/seats/interfaces/ISeat.ts";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatTypeEnum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {ScreenSchema} from "@/pages/screens/schema/base/ScreenSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";

export const SeatSchema: ZodType<ISeat> = z.object({
    _id: IDStringSchema,

    row: NonEmptyStringSchema
        .min(1, "Required.")
        .max(50, "Must be 50 characters or less."),

    seatNumber: NonEmptyStringSchema
        .min(1, "Required.")
        .max(50, "Must be 50 characters or less."),

    seatType: SeatTypeEnum,

    isAvailable: RequiredBoolean,

    priceMultiplier: RequiredNumberSchema
        .gte(0, "Must be 0 or greater."),

    theatre: z
        .union([IDStringSchema, z.lazy(() => TheatreSchema)]),

    screen: z
        .union([IDStringSchema, z.lazy(() => ScreenSchema)]),
});

export const SeatArraySchema = z.array(SeatSchema);

export type Seat = z.infer<typeof SeatSchema>;
export type SeatArray = z.infer<typeof SeatArraySchema>;