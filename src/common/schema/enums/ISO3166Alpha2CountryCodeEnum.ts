/**
 * @fileoverview Zod schema and type definition for ISO 3166-1 alpha-2 country codes.
 */

import {z} from "zod";
import {ISO3166Alpha2CodeConstant} from "@/common/_const";

/** Zod enum schema for validating ISO 3166-1 alpha-2 country codes. */
export const ISO3166Alpha2CountryCodeEnum = z.enum(ISO3166Alpha2CodeConstant, {message: "Invalid Country."});

/** Type representing a valid ISO 3166-1 alpha-2 country code. */
export type ISO3166Alpha2CountryCode = z.infer<typeof ISO3166Alpha2CountryCodeEnum>;