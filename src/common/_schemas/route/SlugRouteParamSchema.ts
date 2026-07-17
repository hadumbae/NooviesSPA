/**
 * @fileoverview Zod schema for validating route parameters containing a slug.
 */

import {z} from "zod";
import {SlugStringSchema} from "@/common/_schemas/strings";

/** Schema for a route parameter object with a slug field. */
export const SlugRouteParamSchema = z.object(
    {slug: SlugStringSchema},
    {message: "Must be a collection of route parameters."},
);

/** Type definition for a route parameter object with a slug field. */
export type SlugRouteParamObject = z.infer<typeof SlugRouteParamSchema>;
