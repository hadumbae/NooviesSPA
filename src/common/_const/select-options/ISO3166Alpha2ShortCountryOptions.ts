/**
 * @fileoverview Form select options mapping ISO 3166-1 alpha-2 country codes to short country names.
 */

import {ReactSelectOption} from "@/common/_types/input/ReactSelectOption.ts";
import {ISO3166Alpha2CodeConstant, ISO3166Alpha2ShortCountryConstant} from "@/common/_const/country";

/** Select dropdown options for choosing a country by ISO 3166-1 alpha-2 code. */
export const ISO3166Alpha2ShortCountryOptions = ISO3166Alpha2CodeConstant.map((code): ReactSelectOption => ({
    value: code,
    label: ISO3166Alpha2ShortCountryConstant[code],
}));