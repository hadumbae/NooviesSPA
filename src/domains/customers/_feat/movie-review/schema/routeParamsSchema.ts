/**
 * @fileoverview Zod validation schema for URL parameters in customer review detail views.
 *
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {ManageCustomerRouteParamsSchema} from "@/domains/customers/_feat/manage-customers";

/** Validation schema for identifying a specific review within a customer's scope via URL. */
export const CustomerReviewRouteParamsSchema = ManageCustomerRouteParamsSchema.extend({
    reviewID: IDStringSchema,
});

/** Type inferred from CustomerReviewRouteParamsSchema for use with useParams hooks. */
export type CustomerReviewRouteParams = z.infer<typeof CustomerReviewRouteParamsSchema>;