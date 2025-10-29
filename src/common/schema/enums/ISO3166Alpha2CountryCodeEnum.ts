import {z} from "zod";
import ISO3166Alpha2CodeConstant from "@/common/constants/country/ISO3166Alpha2CodeConstant.ts";

/**
 * Zod enum schema representing valid ISO 3166-1 alpha-2 country codes.
 *
 * This enum is built from `ISO3166Alpha2CodeConstant`, which should be an array of two-letter
 * ISO 3166-1 alpha-2 codes (e.g., "US", "GB", "FR").
 *
 * Used to validate country code inputs throughout the application.
 *
 * @example
 * ISO3166Alpha2CodeEnum.parse("US"); // ✅ Valid
 * ISO3166Alpha2CodeEnum.parse("ZZ"); // ❌ Throws ZodError: Invalid Country.
 */
export const ISO3166Alpha2CountryCodeEnum = z.enum(ISO3166Alpha2CodeConstant, {message: "Invalid Country."});

/**
 * Type alias for the inferred TypeScript union of valid ISO 3166-1 alpha-2 codes.
 *
 * This type represents all allowed string literals defined in `ISO3166Alpha2CountryCodeEnum`.
 *
 * @example
 * const country: ISO3166Alpha2CountryCode = "CA"; // ✅
 * const country: ISO3166Alpha2CountryCode = "XX"; // ❌ Type error
 */
export type ISO3166Alpha2CountryCode = z.infer<typeof ISO3166Alpha2CountryCodeEnum>;