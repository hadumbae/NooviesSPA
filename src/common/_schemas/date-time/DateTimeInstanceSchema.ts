/**
 * @fileoverview Zod schema for validating Luxon DateTime instances.
 */

import {z} from "zod";
import {DateTime} from "luxon";

/** Zod schema that ensures a value is a valid Luxon DateTime instance. */
export const DateTimeInstanceSchema = z.custom<DateTime<true>>(
    date => date instanceof DateTime && date.isValid,
    {message: "Must be an instance of Luxon's DateTime."},
);