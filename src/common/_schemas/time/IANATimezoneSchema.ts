/**
 * @fileoverview Zod schema and type definition for IANA time zones.
 */

import {z} from "zod";
import {timeZonesNames} from "@vvo/tzdb";

/** Zod schema for validating IANA time zone strings against the tzdb database. */
export const IANATimezoneSchema = z.enum(timeZonesNames as [string, ...string[]], {message: "Invalid Time Zone."});

/** Type representing a valid IANA time zone string. */
export type IANATimezone = z.infer<typeof IANATimezoneSchema>;