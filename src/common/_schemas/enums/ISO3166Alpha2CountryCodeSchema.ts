/**
 * @fileoverview Zod schema and type definition for ISO 3166-1 alpha-2 country codes.
 */

import {z} from "zod";
import {ISO3166Alpha2CodeConstant} from "@/common/_const/country";
import {ZodEnumParamHandler} from "@/common/_feat/validation-handlers/ZodEnumParamHandler.ts";

/** Zod enum schema for validating ISO 3166-1 alpha-2 country codes. */
export const ISO3166Alpha2CountryCodeSchema = z.enum(ISO3166Alpha2CodeConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Country Code",
    invalidType: "Must Be A Valid Country Code"
}));

/** Type representing a valid ISO 3166-1 alpha-2 country code. */
export type ISO3166Alpha2CountryCode = z.infer<typeof ISO3166Alpha2CountryCodeSchema>;