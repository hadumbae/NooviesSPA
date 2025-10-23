import {FC} from 'react';
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import {Control} from "react-hook-form";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";
import ISO6391CodeConstant from "@/common/constants/languages/ISO6391CodeConstant.ts";

interface Props {
    // The name of the form field. Used to register the input with react-hook-form.
    name: string;
    // Label to display above the select field.
    label: string;
    // Optional description or helper text shown below the select input.
    description?: string;
    // Optional placeholder text displayed when no option is selected.
    placeholder?: string;
    // The react-hook-form control object used to manage form state.
    control: Control<any>;
    // Whether the select allows multiple selections (multi-select).
    isMulti: boolean;
}

/**
 * A reusable form component for selecting one or more languages using react-hook-form integration.
 *
 * This component supports both single and multi-select modes, controlled via the `isMulti` prop.
 * Language options are sourced from {@link ISO6391LanguageConstant}, which provides ISO 639-1 codes
 * and their corresponding language names.
 *
 * It wraps {@link HookFormSelect} or {@link HookFormMultiSelect} depending on the mode.
 *
 * @param props - See {@link Props} for available options.
 * @returns A JSX element for language selection in a hook-form-controlled environment.
 */
const LanguageHookFormSelect: FC<Props> = (props) => {
    const options = ISO6391CodeConstant.map((code): ReactSelectOption => ({
        value: code,
        label: ISO6391LanguageConstant[code]
    }));

    return (
        props.isMulti
            ? <HookFormMultiSelect options={options} {...props} />
            : <HookFormSelect options={options} {...props} />
    );
};

export default LanguageHookFormSelect;
