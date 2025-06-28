import {z} from "zod";
import {CoercedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

export const TheatreScreenParamsSchema = z.object({
    theatreID: IDStringSchema,
    screenID: IDStringSchema,
});

export const TheatreScreenSearchParamSchema = z.object({
    activeTab: z
        .union([z.literal("seats"), z.literal("showings")], {message: "Must be 'seats' or 'showings'."})
        .optional()
        .default("seats"),

    seatPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(1),

    seatsPerPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(10),

    showingPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(1),

    showingsPerPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(10),
});