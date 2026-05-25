/**
 * @fileoverview A reusable language selector integrated with React Hook Form using ISO 639-1 codes.
 */

import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {HookFormMultiSelect} from "@/views/common/_comp/form-select/HookFormMultiSelect.tsx";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ISO6391LanguageLabels as ISO6391LanguageConstant} from "@/common/constants/languages/ISO6391LanguageLabels.ts";
import ISO6391CodeConstant from "@/common/constants/languages/ISO6391CodeConstant.ts";
import {FieldValues} from "react-hook-form";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {ReactElement} from "react";

/** Props for the LanguageHookFormSelect component. */
type HookSelectProps<TValues extends FieldValues> = HookFormInputControlProps<TValues> & {
    isMulti?: boolean;
};

/** A form-connected language select input supporting single and multi-select modes. */
export function LanguageHookFormSelect<TValues extends FieldValues>(
    props: HookSelectProps<TValues>
): ReactElement {
    const {isMulti = false, ...rest} = props;

    const options = ISO6391CodeConstant.map((code): ReactSelectOption => ({
        value: code,
        label: ISO6391LanguageConstant[code]
    }));

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...rest} />
            : <HookFormSelect options={options} {...rest} />
    );
}
