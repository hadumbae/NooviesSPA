/**
 * @fileoverview Zod schema and type definition for ISO 639-1 language codes.
 */

import {z} from "zod";
import {ISO6391CodeConstant} from "@/common/_const/languages/ISO6391CodeConstant.ts";

/** Zod enum schema for validating ISO 639-1 language codes. */
export const ISO6391LanguageCodeSchema = z.enum(
    ISO6391CodeConstant,
    {invalid_type_error: "Invalid Language", required_error: "Required."},
);

/** Type representing a valid ISO 639-1 language code. */
export type ISO6391LanguageCode = z.infer<typeof ISO6391LanguageCodeSchema>;