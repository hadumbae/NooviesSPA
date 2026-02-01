/**
 * @file ReservationDetails.schema.ts
 *
 * @summary
 * Zod schemas for fully populated reservation entities.
 *
 * @description
 * Defines reservation schemas intended for read-heavy use cases
 * such as API responses and administrative views.
 *
 * These schemas:
 * - Extend the base reservation schema with populated relations
 * - Preserve reservation-type–specific seating rules
 * - Apply shared lifecycle refinement via {@link superRefineReservation}
 *
 * Business rules remain identical to non-populated reservations;
 * only relation depth differs.
 */

import {PopulatedShowingSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import {superRefineReservation} from "@/pages/reservation/schema/model/reservation/Reservation.utils.ts";
import {ReservationBaseSchema} from "@/pages/reservation/schema/model/reservation/Reservation.schema.ts";
import {z} from "zod";
import {ReservationTypeConstant} from "@/pages/reservation/constants/ReservationTypeConstant.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {SeatMapWithSeatSchema} from "@/pages/seatmap/schema/model/SeatMap.schema.ts";

/**
 * Base populated reservation schema.
 *
 * @remarks
 * Extends {@link ReservationBaseSchema} by replacing the `showing`
 * reference with a fully populated showing document.
 */
export const ReservationDetailsBaseSchema = ReservationBaseSchema.extend({
    showing: PopulatedShowingSchema,
});

/**
 * General admission populated reservation schema.
 *
 * @remarks
 * General admission reservations do not include seating data.
 */
const GeneralSchemaOption = ReservationDetailsBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[0]),
    selectedSeating: z.null().optional(),
});

/**
 * Reserved seating populated reservation schema.
 *
 * @remarks
 * Includes fully populated seat-map entries with seat details.
 */
const SeatingSchemaOption = ReservationDetailsBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[1]),
    selectedSeating: generateArraySchema(SeatMapWithSeatSchema),
});

/**
 * Fully populated and validated reservation schema.
 *
 * @remarks
 * Discriminates by `reservationType` and applies shared
 * lifecycle-based refinement rules.
 */
export const ReservationDetailsSchema = z
    .discriminatedUnion("reservationType", [GeneralSchemaOption, SeatingSchemaOption])
    .superRefine(superRefineReservation);
