/**
 * @fileoverview Defines the schema and type for the Ipify API response payload.
 */

import {z} from "zod";
import {IpSchema, NonEmptyStringSchema} from "@/common/_schemas/strings";
import {IpifyLocationSchema} from "@/common/_feat/external/ipify-country/schema/IpifyLocationSchema.ts";

/** Zod schema for validating the root Ipify API response object. */
export const IpifyPayloadSchema = z.object({
    ip: IpSchema,
    location: IpifyLocationSchema,
    isp: NonEmptyStringSchema,
});

/** Data type inferred from the IpifyPayloadSchema. */
export type IpifyPayloadData = z.infer<typeof IpifyPayloadSchema>;