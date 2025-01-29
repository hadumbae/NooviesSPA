import {FC} from 'react';
import LanguageConstant from "@/common/constants/LanguageConstant.ts";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import {Control} from "react-hook-form";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";

interface Props {
    name: string,
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<any>;
    isMulti: boolean;
}

const LanguageHookFormSelect: FC<Props> = (props) => {
    const options = LanguageConstant.map((lang): ReactSelectOption => ({value: lang, label: lang}));

    return (
        props.isMulti
            ? <HookFormMultiSelect options={options} {...props} />
            : <HookFormSelect options={options} {...props} />
    );
};

export default LanguageHookFormSelect;
