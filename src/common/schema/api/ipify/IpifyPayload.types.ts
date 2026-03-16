/**
 * @file TypeScript types inferred from Ipify payload schemas.
 * @filename IpifyPayload.types.ts
 */

import { z } from "zod";
import {
    IpifyLocalStorageSchema,
    IpifyLocationSchema,
    IpifyPayloadSchema,
} from "@/common/schema/api/ipify/IpifyPayload.schema.ts";

/**
 * Inferred type for {@link IpifyLocationSchema}.
 */
export type IpifyLocation = z.infer<typeof IpifyLocationSchema>;

/**
 * Inferred type for {@link IpifyPayloadSchema}.
 */
export type IpifyPayloadData = z.infer<typeof IpifyPayloadSchema>;

/**
 * Inferred type for {@link IpifyLocalStorageSchema}.
 */
export type IpifyLocalStorageData = z.infer<typeof IpifyLocalStorageSchema>;