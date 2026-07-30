/**
 * @fileoverview Defines Zod schemas for customer movie reservation view data.
 */

import {z} from "zod";
import {AdminReservationSchema} from "@/domains/reservations/_schema";
import {LeanUserWithEmailSchema} from "@/domains/users/_schema/user";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";

/**
 * Zod schema for the data displayed in the customer movie reservations view.
 */
export const CustomerReservationsViewDataSchema = z.object({
    customer: LeanUserWithEmailSchema,
    reservations: generatePaginationSchema(AdminReservationSchema),
});

/**
 * Type definition for the data displayed in the customer movie reservations view.
 */
export type CustomerReservationsViewData = z.infer<
    typeof CustomerReservationsViewDataSchema
>;