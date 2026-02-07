/**
 * @file ReservationRelated.schema.ts
 *
 * Collection of derived schemas related to reservations.
 * Provides array and paginated variants of reservation details.
 */

import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {ReservationDetailsSchema} from "@/pages/reservation/schema/model/reservation/ReservationDetails.schema.ts";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";

/**
 * Schema representing an array of reservation details.
 */
export const ReservationDetailsArraySchema =
    generateArraySchema(ReservationDetailsSchema);

/**
 * Schema representing a paginated collection of reservation details.
 */
export const PaginatedReservationDetailsSchema =
    generatePaginationSchema(ReservationDetailsSchema);
