/**
 * @fileoverview Star rating selector component for use within react-hook-form fields.
 */

import {ReactElement, useState} from "react";
import {ControllerProps, FieldValues} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {Star} from "lucide-react";
import {HookFormInputProps} from "@/common/type/input/HookFormInputProps.ts";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    RadioGroup,
    RadioGroupItem
} from "@/common/components/ui";

/**
 * Props for the StarRatingSelector component.
 */
type GroupProps<TValues extends FieldValues> = HookFormInputProps<TValues>;

/**
 * A form input component that renders a set of stars for rating selection.
 */
export function StarRatingSelector<TValues extends FieldValues>(
    {control, label, name, className}: GroupProps<TValues>
): ReactElement {
    const [groupHover, setGroupHover] = useState<boolean>(false);
    const [starHover, setStarHover] = useState<number>(0);

    const renderField: ControllerProps<TValues>["render"] = ({field}) => (
        <FormItem className="space-y-2">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                <RadioGroup
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    onMouseEnter={() => setGroupHover(true)}
                    onMouseLeave={() => setGroupHover(false)}
                    className={cn("flex gap-0", className)}
                >
                    {[...Array(5)].map((_, index) => {
                        const itemValue = index + 1;

                        const isSelectedStar = !groupHover && field.value && field.value >= itemValue;
                        const isGroupHovered = starHover > 0 && starHover >= itemValue;

                        return (
                            <FormItem key={`fav-star-option-${itemValue}`} className="flex items-center space-y-0">
                                <FormControl>
                                    <RadioGroupItem value={itemValue.toString()} className="sr-only"/>
                                </FormControl>
                                <FormLabel className="font-normal">
                                    <Star
                                        onMouseEnter={() => setStarHover(itemValue)}
                                        onMouseLeave={() => setStarHover(0)}
                                        className={cn(
                                            "cursor-pointer fill-gray-300 stroke-gray-300",
                                            (isSelectedStar || isGroupHovered) && "fill-yellow-500 stroke-yellow-500",
                                        )}
                                    />
                                </FormLabel>
                            </FormItem>
                        );
                    })}
                </RadioGroup>
            </FormControl>
            <FormMessage/>
        </FormItem>
    );

    return (
        <FormField control={control} name={name} render={renderField}/>
    );
}
