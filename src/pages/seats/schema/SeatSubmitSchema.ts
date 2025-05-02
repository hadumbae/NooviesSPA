import {z, ZodType} from "zod";
import ISeatSubmit from "@/pages/seats/interfaces/ISeatSubmit.ts";
import {RefinedIDString, TrimmedStringSchema} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatTypeEnum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";

export const SeatSubmitSchema: ZodType<ISeatSubmit> = z.object({
    row: TrimmedStringSchema
        .min(1, "Required.")
        .max(50, "Must be 50 characters or less."),

    seatNumber: TrimmedStringSchema
        .min(1, "Required.")
        .max(50, "Must be 50 characters or less."),

    seatType: z
        .union([z.undefined(), SeatTypeEnum])
        .refine((type) => !!type, {message: "Required"}),

    isAvailable: RequiredBoolean,

    priceMultiplier: z
        .union([z.literal(""), RequiredNumber])
        .refine((multi) => multi !== "", {message: "Required"})
        .refine((multi) => multi >= 0, {message: "Must be 0 or greater."}),

    theatre: RefinedIDString,

    screen: RefinedIDString,
});

export type SeatSubmit = z.infer<typeof SeatSubmitSchema>;