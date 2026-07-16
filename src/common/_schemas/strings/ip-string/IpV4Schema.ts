/**
 * @fileoverview Zod schema for validating IPv4 address strings.
 */

import {z} from "zod";
import {StringValueSchema} from "@/common/_schemas/strings";

/** Zod schema that validates a string as a version 4 IP address. */
export const IpV4Schema = StringValueSchema.ip({message: "Must be a valid IP V4 address", version: "v4"});

/** Type representing a validated IPv4 address string. */
export type IpV4String = z.infer<typeof IpV4Schema>;