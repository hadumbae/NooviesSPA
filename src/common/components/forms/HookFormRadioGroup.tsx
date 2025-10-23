import {RadioGroup, RadioGroupItem} from "@/common/components/ui/radio-group.tsx";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/common/components/ui/form.tsx";
import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import HookRadioOption from "@/common/type/input/HookRadioOption.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the `HookFormRadioGroup` component.
 *
 * @template TForm - The form field values type, typically inferred from `useForm<T>()`.
 */
interface GroupProps<TForm extends FieldValues> {
    /** React Hook Form instance used for controlling the field. */
    form: UseFormReturn<TForm>;

    /** The label displayed above the radio group. */
    label: string;

    /** The name of the form field, mapped to the form schema. */
    name: Path<TForm>;

    /** The list of options to render as radio buttons. */
    items: HookRadioOption[];

    /** Optional additional class names applied to the radio group container. */
    className?: string;
}

/**
 * A generic form-integrated radio group component built with ShadCN and React Hook Form.
 *
 * Automatically binds to form state, handles validation errors, and renders styled radio options.
 *
 * @template TForm - The form data shape, constrained by `FieldValues`.
 *
 * @example
 * ```tsx
 * <HookFormRadioGroup
 *   form={form}
 *   label="Gender"
 *   name="gender"
 *   items={[
 *     { label: "Male", value: "male" },
 *     { label: "Female", value: "female" }
 *   ]}
 * />
 * ```
 */
const HookFormRadioGroup = <TForm extends FieldValues>(props: GroupProps<TForm>) => {
    const {form, label, name, items, className} = props;

    return (
        <FormField control={form.control} name={name} render={({field}) => (
            <FormItem className="space-y-3">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        className={cn(className)}
                    >
                        {
                            items.map((item) => <FormItem
                                key={`radio-option-${label}-${item.label}`}
                                className="flex items-center space-x-3 space-y-0"
                            >
                                <FormControl>
                                    <RadioGroupItem value={item.value}/>
                                </FormControl>
                                <FormLabel className="font-normal">
                                    {item.label}
                                </FormLabel>
                            </FormItem>)
                        }
                    </RadioGroup>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
        />
    );
};

export default HookFormRadioGroup;
