import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {CoercedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

export const TheatreParamSchema = z.object({
    theatreID: IDStringSchema,
});

export const TheatreScreenParamSchema = z.object({
    theatreID: IDStringSchema,
    screenID: IDStringSchema,
});

export const TheatreScreenSearchParamSchema = z.object({
    activeTab: z.union([z.literal("seats"), z.literal("showings")], {message: "Must be 'seats' or 'showings'."}),
    seatPage: CoercedNonNegativeNumberSchema.optional().default(1),
    seatPerPage: CoercedNonNegativeNumberSchema.optional().default(10),
    showingPage: CoercedNonNegativeNumberSchema.optional().default(1),
    showingPerPage: CoercedNonNegativeNumberSchema.optional().default(10),
});