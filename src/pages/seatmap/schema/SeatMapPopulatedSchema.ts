import {z, ZodType} from "zod";
import {SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";
import {ShowingSchema} from "@/pages/showings/schema/ShowingSchema.ts";
import IPopulatedSeatMap from "@/pages/seatmap/interfaces/IPopulatedSeatMap.ts";
import SeatMapBaseSchema from "@/pages/seatmap/schema/SeatMapBaseSchema.ts";

/**
 * Zod schema for validating a populated `SeatMap` object.
 *
 * This schema defines the structure and validation rules for a populated `SeatMap` object.
 */
export const SeatMapPopulatedSchema: ZodType<IPopulatedSeatMap> = SeatMapBaseSchema.extend({
    seat: z.lazy(() => SeatSchema),
    showing: z.lazy(() => ShowingSchema),
});

/**
 * Represents a single populated `Showing` object,
 * inferred from `ShowingPopulatedSchema`.
 */
export type PopulatedSeatMap = z.infer<typeof SeatMapPopulatedSchema>;