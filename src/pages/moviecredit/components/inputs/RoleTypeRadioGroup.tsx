import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import HookRadioOption from "@/common/type/HookRadioOption.ts";
import HookFormRadioGroup from "@/common/components/forms/HookFormRadioGroup.tsx";

interface RoleTypeProps<TForm extends FieldValues> {
    form: UseFormReturn<TForm>
    name: Path<TForm>;
    label: string;
    className?: string
}

const RoleTypeRadioGroup = <TForm extends FieldValues>({form, name, label, className}: RoleTypeProps<TForm>) => {
    const items: HookRadioOption[] = [
        {label: "Crew", value: "CREW"},
        {label: "Cast", value: "CAST"},
    ];

    return (
        <HookFormRadioGroup form={form} label={label} name={name} items={items} className={className} />
    );
};

export default RoleTypeRadioGroup;
