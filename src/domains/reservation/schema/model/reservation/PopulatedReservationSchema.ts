/**
 * @file Discriminated union schema for fully populated reservation records.
 * @filename PopulatedReservationSchema.ts
 */

import {superRefineReservation} from "@/domains/reservation/schema/model/reservation/ReservationSchemaUtilities.ts";
import {z} from "zod";
import {ReservationTypeConstant} from "@/domains/reservation/constants/ReservationTypeConstant.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {SeatMapWithSeatSchema} from "@/domains/seatmap/schema/model/SeatMap.schema.ts";
import {
    PopulatedReservationBaseSchema
} from "@/domains/reservation/schema/model/reservation/PopulatedReservationBaseSchema.ts";

/**
 * Populated schema for General Admission (GA) variants.
 * * @remarks
 * Extends {@link PopulatedReservationBaseSchema}. Since GA bookings rely on
 * unassigned capacity, `selectedSeating` is explicitly null or omitted.
 */
const GeneralSchemaOption = PopulatedReservationBaseSchema.extend({
    /** Matches the GA identifier (index 0) in {@link ReservationTypeConstant}. */
    reservationType: z.literal(ReservationTypeConstant[0]),

    /** Nullable as GA logic bypasses specific {@link SeatMapWithSeatSchema} assignments. */
    selectedSeating: z.null().optional(),
});

/**
 * Populated schema for Reserved Seating variants.
 * * @remarks
 * Extends {@link PopulatedReservationBaseSchema}. Requires a non-empty array
 * of seat mappings containing fully resolved seat metadata.
 */
const SeatingSchemaOption = PopulatedReservationBaseSchema.extend({
    /** Matches the Reserved identifier (index 1) in {@link ReservationTypeConstant}. */
    reservationType: z.literal(ReservationTypeConstant[1]),

    /** Array of {@link SeatMapWithSeatSchema} records via {@link generateArraySchema}. */
    selectedSeating: generateArraySchema(SeatMapWithSeatSchema),
});

/**
 * Fully populated and validated {@link z.discriminatedUnion}.
 * * **Discrimination:** Directs validation flow based on the `reservationType` field.
 * **Refinement:** Applies {@link superRefineReservation} to enforce temporal
 * consistency (e.g., expiry dates vs. current status).
 */
export const PopulatedReservationSchema = z
    .discriminatedUnion("reservationType", [GeneralSchemaOption, SeatingSchemaOption])
    .superRefine(superRefineReservation);

/**
 * Inferred type from {@link PopulatedReservationSchema}.
 * * Represents a reservation with its related entities (User, Showing, etc.)
 * fully resolved for use in high-fidelity UI components or detail views.
 */
export type PopulatedReservation = z.infer<typeof PopulatedReservationSchema>;