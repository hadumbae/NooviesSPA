/**
 * @fileoverview Provides a list of IANA timezone options for use in select inputs.
 */

import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {getTimeZones} from "@vvo/tzdb";

const timeZones = getTimeZones();

/** A list of timezone options formatted for React Select components. */
export const IANATimezoneOptions: ReactSelectOption[] = timeZones.map(
    ({name, alternativeName, mainCities}) => ({
        value: name,
        label: `${alternativeName} (${mainCities[0]})`,
    })
);