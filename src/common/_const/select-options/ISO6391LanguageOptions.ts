/**
 * @fileoverview Provides select options for ISO 639-1 language codes.
 */

import {ISO6391CodeConstant} from "@/common/_const/languages/ISO6391CodeConstant.ts";
import {ReactSelectOption} from "@/common/_types/input/ReactSelectOption.ts";
import {ISO6391LanguageLabels as ISO6391LanguageConstant} from "@/common/_const/languages/ISO6391LanguageLabels.ts";

/** List of language options formatted for React Select components. */
export const ISO6391LanguageOptions = ISO6391CodeConstant.map((code): ReactSelectOption => ({
    value: code,
    label: ISO6391LanguageConstant[code]
}));