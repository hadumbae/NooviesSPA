/**
 * @fileoverview Zod schema and TypeScript types for filtering seat map reference data.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {ShowingStatusSchema} from "@/domains/showings/_schema/fields";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {SeatTypeSchema} from "@/domains/seats/_schema/fields";
import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/** Zod schema for validating seat map reference filter parameters. */
export const SeatMapReferenceFilterSchema = z.object({
    movie: IDStringSchema.optional(),
    showingSlug: NonEmptyStringSchema.optional(),
    showingStatus: ShowingStatusSchema.optional(),
    seatRow: NonEmptyStringSchema.max(10, "Must be 10 characters or less.").optional(),
    seatNumber: PositiveNumberSchema.optional(),
    seatType: SeatTypeSchema.optional(),
});

/** Inferred TypeScript type for seat map reference parameters. */
export type SeatMapReferenceParams = z.infer<typeof SeatMapReferenceFilterSchema>;
