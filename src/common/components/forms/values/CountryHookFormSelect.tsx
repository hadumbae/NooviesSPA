/**
 * @fileoverview Form component for selecting countries using ISO 3166-1 alpha-2 codes.
 */

import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import ISO3166Alpha2CodeConstant from "@/common/constants/country/ISO3166Alpha2CodeConstant.ts";
import {FieldValues} from "react-hook-form";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {ReactElement} from "react";
import {HookFormMultiSelect, HookFormSelect} from "@/views/common/_comp/form-select";

/** Props for the CountryHookFormSelect component. */
type CountryProps<TValues extends FieldValues> = HookFormInputControlProps<TValues> & {
    isMulti?: boolean;
};

/**
 * A form component that renders a single-select or multi-select dropdown of countries.
 */
export function CountryHookFormSelect<TValues extends FieldValues>(
    {isMulti = false, ...rest}: CountryProps<TValues>
): ReactElement {
    const options = ISO3166Alpha2CodeConstant.map((code): ReactSelectOption => ({
        value: code,
        label: ISO3166Alpha2CountryConstant[code],
    }));

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...rest} />
            : <HookFormSelect options={options} {...rest} />
    );
}
