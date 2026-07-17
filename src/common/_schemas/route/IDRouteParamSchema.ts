/**
 * @fileoverview Zod schema for validating route parameters containing a unique identifier.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas/strings";

/** Zod schema for a route parameter object containing an _id field. */
export const IDRouteParamSchema = z.object(
    {_id: IDStringSchema},
    {message: "Must be a collection of route parameters."},
);

/** Route parameter object containing an _id field. */
export type IDRouteParamObject = z.infer<typeof IDRouteParamSchema>;
