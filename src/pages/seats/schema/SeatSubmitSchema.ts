import {z, ZodType} from "zod";
import ISeatSubmit from "@/pages/seats/interfaces/ISeatSubmit.ts";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatTypeEnum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {RefinedIDStringSchema} from "@/common/schema/strings/RefinedIDStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";

export const SeatSubmitSchema: ZodType<ISeatSubmit> = z.object({
    row: NonEmptyStringSchema
        .min(1, "Required.")
        .max(50, "Must be 50 characters or less."),

    seatNumber: NonEmptyStringSchema
        .min(1, "Required.")
        .max(50, "Must be 50 characters or less."),

    seatType: z
        .union([z.undefined(), SeatTypeEnum])
        .refine((type) => !!type, {message: "Required"}),

    isAvailable: RequiredBoolean,

    priceMultiplier: z
        .union([z.literal(""), RequiredNumberSchema])
        .refine((multi) => multi !== "", {message: "Required"})
        .refine((multi) => multi >= 0, {message: "Must be 0 or greater."}),

    theatre: RefinedIDStringSchema,

    screen: RefinedIDStringSchema,
});

export type SeatSubmit = z.infer<typeof SeatSubmitSchema>;