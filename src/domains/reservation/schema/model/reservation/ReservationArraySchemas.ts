/**
 * @file Schema for collections of fully populated reservation records.
 * @filename ReservationArraySchemas.ts
 */

import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {PopulatedReservationSchema} from "@/domains/reservation/schema/model/reservation/PopulatedReservationSchema.ts";
import {z} from "zod";

/**
 * Validated array schema for {@link PopulatedReservationSchema}.
 * * @remarks
 * Utilizes {@link generateArraySchema} to enforce non-empty array constraints
 * and item-level validation for each populated reservation.
 */
export const ReservationDetailsArraySchema =
    generateArraySchema(PopulatedReservationSchema);

/**
 * Inferred type from {@link ReservationDetailsArraySchema}.
 * * Useful for bulk operations or specialized views that do not require
 * the full metadata provided by {@link PaginatedReservationDetailsSchema}.
 */
export type ReservationDetailsArray =
    z.infer<typeof ReservationDetailsArraySchema>;