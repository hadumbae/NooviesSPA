/**
 * @fileoverview Discriminated union schema for fully populated reservation records.
 */

/** Populated schema for General Admission variants. */
import {superRefineReservation} from "@/domains/reservation/schema/model/reservations/ReservationSchemaUtilities.ts";
import {z} from "zod";
import {ReservationTypeConstant} from "@/domains/reservation/schema/model/fields/ReservationTypeConstant.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {SeatMapWithSeatSchema} from "@/domains/seatmap/schema/model/SeatMap.schema.ts";
import {
    PopulatedReservationBaseSchema
} from "@/domains/reservation/schema/model/populated-reservations/PopulatedReservationBaseSchema.ts";

const GeneralSchemaOption = PopulatedReservationBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[0]),
    selectedSeating: z.null().optional(),
});

const SeatingSchemaOption = PopulatedReservationBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[1]),
    selectedSeating: generateArraySchema(SeatMapWithSeatSchema),
});

/**
 * Discriminated union schema for reservations with fully resolved relational data.
 */
export const PopulatedReservationSchema = z
    .discriminatedUnion("reservationType", [GeneralSchemaOption, SeatingSchemaOption])
    .superRefine(superRefineReservation);

/** Inferred type for a reservation with its related entities fully resolved. */
export type PopulatedReservation = z.infer<typeof PopulatedReservationSchema>;