/**
 * @fileoverview Zod schema and type definition for IP address strings.
 */

import {z} from "zod";
import {StringValueSchema} from "@/common/_schemas/strings/simple-strings";

/** Zod schema for a trimmed IP address string. */
export const IpSchema = StringValueSchema.ip({message: "Must be a valid IP address."});

/** Type representing a valid IP address string. */
export type IpString = z.infer<typeof IpSchema>;
