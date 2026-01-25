import { z } from "zod";
import { BooleanValueSchema } from "@/common/schema/boolean/BooleanValueSchema.ts";
import { NumberValueSchema } from "@/common/schema/numbers/number-value/NumberValueSchema.ts";
import { StringValueSchema } from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import { IANATimezoneSchema } from "@/common/schema/date-time/IANATimezone.schema.ts";

/**
 * @file IpAPISchema.ts
 *
 * Zod schema for validating responses from the ipapi.co API.
 *
 * Normalizes:
 * - Strings via {@link StringValueSchema}
 * - Numbers via {@link NumberValueSchema}
 * - Booleans via {@link BooleanValueSchema}
 *
 * Nullable fields reflect optional or unavailable geo/IP data.
 */
export const IpAPISchema = z.object({
    ip: StringValueSchema.ip(),
    network: StringValueSchema.optional(),
    version: StringValueSchema.optional(),

    city: StringValueSchema.nullable(),
    region: StringValueSchema.nullable(),
    region_code: StringValueSchema.nullable(),

    country: StringValueSchema,
    country_name: StringValueSchema,
    country_code: StringValueSchema,
    country_code_iso3: StringValueSchema,
    country_capital: StringValueSchema.nullable(),
    country_tld: StringValueSchema.nullable(),

    continent_code: StringValueSchema,
    in_eu: BooleanValueSchema,

    postal: StringValueSchema.nullable(),
    latitude: NumberValueSchema,
    longitude: NumberValueSchema,

    timezone: IANATimezoneSchema.nullable(),
    utc_offset: StringValueSchema.nullable(),

    country_calling_code: StringValueSchema,
    currency: StringValueSchema.nullable(),
    currency_name: StringValueSchema.nullable(),
    languages: StringValueSchema.nullable(),

    country_area: NumberValueSchema.nullable(),
    country_population: NumberValueSchema.nullable(),

    asn: StringValueSchema.nullable(),
    org: StringValueSchema.nullable(),
});

/**
 * Inferred TypeScript type for {@link IpAPISchema}.
 */
export type IpApiResponse = z.infer<typeof IpAPISchema>;
