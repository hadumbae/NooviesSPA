/**
 * @fileoverview Defines schemas and types for the user details route parameters.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";

/** Zod schema for validating user details route parameters. */
export const UserDetailsRouteParamsSchema = z.object({
   userID: IDStringSchema,
});

/** Type definition for user details route parameters. */
export type UserDetailsRouteParams = z.infer<typeof UserDetailsRouteParamsSchema>;