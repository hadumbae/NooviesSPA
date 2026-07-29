/**
 * @fileoverview Zod schema and type definitions for customer management route parameters.
 */

import {z} from "zod"
import {IDStringSchema} from "@/common/_schemas";

/** Zod schema for validating customer management route parameters. */
export const ManageCustomerRouteParamsSchema = z.object({
    customerID: IDStringSchema,
});

/** Type definition inferred from ManageCustomerRouteParamsSchema. */
export type ManageCustomerRouteParams = z.infer<typeof ManageCustomerRouteParamsSchema>