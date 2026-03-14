/**
 * @file TypeScript types inferred from Ipify schemas.
 * @filename IpifyPayload.types.ts
 */

import { z } from "zod";
import {
    IpifyLocalStorageSchema,
    IpifyPayloadSchema,
} from "@/common/schema/api/ipify/IpifyPayload.schema.ts";

/**
 * Type representing a validated Ipify API payload.
 */
export type IpifyPayloadData = z.infer<typeof IpifyPayloadSchema>;

/**
 * Type representing the Ipify data structure stored in local storage.
 */
export type IpifyLocalStorageData = z.infer<typeof IpifyLocalStorageSchema>;