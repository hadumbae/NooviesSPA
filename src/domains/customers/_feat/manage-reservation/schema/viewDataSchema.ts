/**
 * @fileoverview Defines Zod schemas for customer movie reservation view data.
 */

import {z} from "zod";
import {LeanUserWithEmailSchema} from "@/domains/users/_schema/user";
import {AdminReservationSchema} from "@/domains/reservations/_schema";

/**
 * Zod schema for the composite data displayed in a customer's movie reservation view.
 */
export const CustomerReservationViewSchema = z.object({
    customer: LeanUserWithEmailSchema,
    reservation: AdminReservationSchema,
});

/** Type for the composite data displayed in a customer's movie reservation view. */
export type CustomerReservationViewData = z.infer<typeof CustomerReservationViewSchema>;
