/**
 * @fileoverview Route parameter schemas for customer reservation details and paths.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {ManageCustomerRouteParamsSchema} from "@/domains/customers/_feat/manage-customers";

/** Schema for validating customer reservation route parameters. */
export const CustomerReservationRouteParamsSchema = ManageCustomerRouteParamsSchema.extend({
    reservationID: IDStringSchema,
});

/** Route parameters parsed from a customer reservation URL path. */
export type CustomerReservationRouteParams = z.infer<typeof CustomerReservationRouteParamsSchema>;