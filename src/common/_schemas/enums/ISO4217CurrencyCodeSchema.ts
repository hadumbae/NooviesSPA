/**
 * @fileoverview Zod schema for ISO 4217 currency codes.
 */

import { z } from "zod";
import ISO4217CurrencyCodesConstant from "@/common/_const/currency/ISO4217CurrencyCodesConstant.ts";

/** Zod enum schema for validating ISO 4217 currency codes. */
export const ISO4217CurrencyCodeSchema = z.enum(
    ISO4217CurrencyCodesConstant,
    {
        required_error: "Required.",
        invalid_type_error: "Invalid value. Must be an ISO 4217 currency code.",
    }
);

/** Type representing a valid ISO 4217 currency code. */
export type ISO4217CurrencyCode = z.infer<typeof ISO4217CurrencyCodeSchema>;