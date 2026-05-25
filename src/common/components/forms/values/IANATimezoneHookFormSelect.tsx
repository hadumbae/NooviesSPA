/**
 * @fileoverview A reusable IANA timezone selector integrated with React Hook Form.
 */

/**
 * Props for the IANATimezoneHookFormSelect component.
 */

import {FieldValues} from "react-hook-form";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {getTimeZones} from "@vvo/tzdb";
import {HookFormMultiSelect} from "@/views/common/_comp/form-select/HookFormMultiSelect.tsx";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {ReactElement} from "react";

type FormSelectProps<TValues extends FieldValues> = HookFormInputControlProps<TValues> & {
    isMulti?: boolean;
};

/**
 * A type-safe timezone selection input that supports single and multi-select modes.
 */
export function IANATimezoneHookFormSelect<TValues extends FieldValues>(
    {isMulti, ...rest}: FormSelectProps<TValues>
): ReactElement {
    const timeZones = getTimeZones();

    const options: ReactSelectOption[] = timeZones.map(
        ({name, alternativeName, mainCities}) => ({
            value: name,
            label: `${alternativeName} (${mainCities[0]})`,
        })
    );

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...rest} />
            : <HookFormSelect options={options} {...rest} />
    );
}
