import {z} from "zod";
import ISO6391CodeConstant from "@/common/constants/languages/ISO6391CodeConstant.ts";

/**
 * Zod enum schema representing valid ISO 639-1 language codes.
 *
 * This enum is generated from `ISO6391CodeConstant`, which should be a list of valid two-letter
 * ISO 639-1 language codes (e.g., "en", "fr", "es").
 *
 * Used for validating and constraining language code inputs across the application.
 *
 * @example
 * ISO6391CodeEnum.parse("en"); // ✅ Valid
 * ISO6391CodeEnum.parse("xx"); // ❌ Throws ZodError: Invalid Language
 */
export const ISO6391LanguageCodeEnum = z.enum(
    ISO6391CodeConstant,
    {invalid_type_error: "Invalid Language", required_error: "Required."},
);

/**
 * Type alias for the inferred TypeScript union of valid ISO 639-1 codes.
 *
 * This type will be a union of string literals based on the values in `ISO6391LanguageCodeEnum`.
 *
 * @example
 * const lang: ISO6391Code = "de"; // ✅
 * const lang: ISO6391Code = "xx"; // ❌ Type error
 */
export type ISO6391LanguageCode = z.infer<typeof ISO6391LanguageCodeEnum>;