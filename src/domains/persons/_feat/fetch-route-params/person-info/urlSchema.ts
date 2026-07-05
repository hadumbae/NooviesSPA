/**
 * @fileoverview Zod schema and type definitions for person information route parameters.
 */

import {z} from "zod";
import {SlugStringSchema} from "@/common/_schemas";

/** Zod schema for validating person information route parameters. */
export const PersonInfoURLParamsSchema = z.object({
    slug: SlugStringSchema,
});

/** Type definition for person information route parameters. */
export type PersonInfoURLParams = z.infer<typeof PersonInfoURLParamsSchema>;