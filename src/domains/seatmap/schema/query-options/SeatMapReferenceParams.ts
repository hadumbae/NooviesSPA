/**
 * @file SeatMapReferenceParams.ts
 *
 * @summary
 * Zod schema and inferred type for SeatMap reference parameters.
 *
 * @description
 * Defines query-ready parameters for filtering SeatMap documents
 * via referenced entities and seat identity fields.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ShowingStatusSchema} from "@/domains/showings/schema/fields";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {SeatTypeSchema} from "@/domains/seats/schema/fields";

/**
 * SeatMap reference filter schema.
 */
export const SeatMapReferenceFilterSchema = z.object({
    movie: IDStringSchema.optional(),
    showingSlug: NonEmptyStringSchema.optional(),
    showingStatus: ShowingStatusSchema.optional(),
    seatRow: NonEmptyStringSchema.max(10, "Must be 10 characters or less.").optional(),
    seatNumber: PositiveNumberSchema.optional(),
    seatType: SeatTypeSchema.optional(),
});

/**
 * Inferred TypeScript type for SeatMap reference parameters.
 */
export type SeatMapReferenceParams = z.infer<typeof SeatMapReferenceFilterSchema>;
