/**
 * @fileoverview Provides select options for ISO 3166-1 alpha-2 country codes.
 */

import ISO3166Alpha2CodeConstant from "@/common/constants/country/ISO3166Alpha2CodeConstant.ts";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";

/** Array of select options mapping ISO 3166-1 alpha-2 codes to their country names. */
export const ISO3166Alpha2CountryOptions = ISO3166Alpha2CodeConstant.map((code): ReactSelectOption => ({
    value: code,
    label: ISO3166Alpha2CountryConstant[code],
}));