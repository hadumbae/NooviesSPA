import {FC} from 'react';
import {Control} from "react-hook-form";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import ISO3166Alpha2CodeConstant from "@/common/constants/country/ISO3166Alpha2CodeConstant.ts";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";

/**
 * Props for the {@link CountryHookFormSelect} component.
 */
interface CountryProps {
    /** Name of the form field. */
    name: string;

    /** Label displayed above the select input. */
    label: string;

    /** Optional description shown below the select input. */
    description?: string;

    /** Placeholder text for the select input. */
    placeholder?: string;

    /** React Hook Form control object for managing form state. */
    control: Control<any>;

    /** Determines whether the select input allows multiple selections. */
    isMulti: boolean;
}

/**
 * `CountryHookFormSelect` is a form component that renders a single-select or multi-select dropdown
 * of countries using ISO 3166-1 alpha-2 codes.
 *
 * It integrates with React Hook Form and dynamically builds the options list from constants.
 *
 * @param props - Configuration for the select input including control and selection mode.
 * @returns A single or multi select dropdown component.
 */
const CountryHookFormSelect: FC<CountryProps> = (props) => {
    const options = ISO3166Alpha2CodeConstant.map((code): ReactSelectOption => ({
        value: code,
        label: ISO3166Alpha2CountryConstant[code],
    }));

    return (
        props.isMulti
            ? <HookFormMultiSelect options={options} {...props} />
            : <HookFormSelect options={options} {...props} />
    );
};

export default CountryHookFormSelect;
