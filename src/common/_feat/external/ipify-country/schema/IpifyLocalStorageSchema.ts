/**
 * @fileoverview Defines the schema for storing Ipify API responses in local storage.
 */

import {z} from "zod";
import {BooleanValueSchema} from "@/common/_schemas";
import {IpifyPayloadSchema} from "@/common/_feat/external/ipify-country/schema/IpifyPayloadSchema.ts";

/** Zod schema for validating Ipify data persisted to local storage. */
export const IpifyLocalStorageSchema = z.object({
    fetched: BooleanValueSchema,
    payload: IpifyPayloadSchema.nullable(),
});

/** Type definition for the Ipify local storage data structure. */
export type IpifyLocalStorageData = z.infer<typeof IpifyLocalStorageSchema>;