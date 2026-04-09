/**
 * @file Zod schema for validating Luxon DateTime instances.
 * @filename DateTimeInstanceSchema.ts
 */

import {z} from "zod";
import {DateTime} from "luxon";

/**
 * A Zod schema that validates whether a value is a Luxon `DateTime` instance.
 * ---
 */
export const DateTimeInstanceSchema = z.custom<DateTime<true>>(
    date => date instanceof DateTime && date.isValid,
    {message: "Must be an instance of Luxon's DateTime."},
);