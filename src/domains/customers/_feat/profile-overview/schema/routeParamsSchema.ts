/**
 * @fileoverview Defines the validation schema and type for customer profile overview route parameters.
 */

import {z} from "zod"
import {ManageCustomerRouteParamsSchema} from "@/domains/customers/_feat/manage-customers";

/** Validation schema for customer profile overview route parameters. */
export const CustomerProfileOverviewRouteParamsSchema = ManageCustomerRouteParamsSchema.extend({});

/** Route parameters for the customer profile overview. */
export type CustomerProfileOverviewRouteParams = z.infer<typeof CustomerProfileOverviewRouteParamsSchema>