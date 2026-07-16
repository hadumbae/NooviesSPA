/**
 * @fileoverview Zod schema and type definition for image metadata returned by Cloudinary.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas/strings";
import {URLStringSchema} from "@/common/_schemas/strings/simple-strings/URLStringSchema.ts";
import {NonNegativeNumberSchema} from "@/common/_schemas/numbers/non-negative-number/NonNegativeNumberSchema";
import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/** Zod schema for validating Cloudinary image response objects. */
export const CloudinaryImageSchema = z.object({
    public_id: NonEmptyStringSchema,
    secure_url: URLStringSchema,
    version: PositiveNumberSchema,
    width: NonNegativeNumberSchema,
    height: NonNegativeNumberSchema,
    format: NonEmptyStringSchema,
    resource_type: NonEmptyStringSchema,
    bytes: NonNegativeNumberSchema,
    type: NonEmptyStringSchema,
    etag: NonEmptyStringSchema,
    url: URLStringSchema,
    signature: NonEmptyStringSchema,
});

/** Type definition for a Cloudinary image object. */
export type CloudinaryImage = z.infer<typeof CloudinaryImageSchema>;
