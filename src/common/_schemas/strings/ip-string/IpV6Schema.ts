/**
 * @fileoverview Zod schema for validating IPv6 address strings.
 */

import {z} from "zod";
import {StringValueSchema} from "@/common/_schemas/strings";

/** Zod schema that validates a string as a valid IPv6 address. */
export const IpV6Schema = StringValueSchema.ip({message: "Must be a valid IP V6 address", version: "v6"});

/** Type representing a validated IPv6 address string. */
export type IpV6String = z.infer<typeof IpV6Schema>;