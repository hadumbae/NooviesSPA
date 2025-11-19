import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import ISO3166Alpha2CodeConstant from "@/common/constants/country/ISO3166Alpha2CodeConstant.ts";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import {FieldValues} from "react-hook-form";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/**
 * Props for the {@link CountryHookFormSelect} component.
 */
type CountryProps<TValues extends FieldValues> = HookFormInputControlProps<TValues> & {
    isMulti?: boolean;
};

/**
 * `CountryHookFormSelect` is a form component that renders a single-select or multi-select dropdown
 * of countries using ISO 3166-1 alpha-2 codes.
 *
 * It integrates with React Hook Form and dynamically builds the options list from constants.
 *
 * @param props - Configuration for the select input including control and selection mode.
 * @returns A single or multi select dropdown component.
 */
const CountryHookFormSelect = <TValues extends FieldValues>(props: CountryProps<TValues>) => {
    const {isMulti = false, ...rest} = props;

    const options = ISO3166Alpha2CodeConstant.map((code): ReactSelectOption => ({
        value: code,
        label: ISO3166Alpha2CountryConstant[code],
    }));

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...rest} />
            : <HookFormSelect options={options} {...rest} />
    );
};

export default CountryHookFormSelect;
