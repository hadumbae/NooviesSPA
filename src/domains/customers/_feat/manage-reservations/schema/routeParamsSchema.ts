/**
 * @fileoverview This file defines the Zod schema and TypeScript type for route parameters related to customer movie reservations.
 */

import {z} from "zod"
import {ManageCustomerRouteParamsSchema} from "@/domains/customers/_feat/manage-customers";

/**
 * This Zod schema defines the route parameters for customer movie reservations.
 */
export const CustomerReservationsRouteParamsSchema = ManageCustomerRouteParamsSchema.extend({});

/**
 * This type represents the inferred route parameters for customer movie reservations.
 */
export type CustomerReservationsRouteParams = z.infer<typeof CustomerReservationsRouteParamsSchema>