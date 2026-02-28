/**
 * @file Star-based rating selector integrated with React Hook Form.
 * StarRatingSelector.ts
 */

import {RadioGroup, RadioGroupItem} from "@/common/components/ui/radio-group.tsx";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/common/components/ui/form.tsx";
import {FieldValues} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {HookFormInputProps} from "@/common/type/input/HookFormInputProps.ts";
import {Star} from "lucide-react";
import {ReactElement, useState} from "react";

/**
 * Props for StarRatingSelector.
 */
type GroupProps<TValues extends FieldValues> = HookFormInputProps<TValues>;

/**
 * Star-based rating input component.
 *
 * Renders a 1–5 selectable rating with hover feedback,
 * bound to React Hook Form via FormField.
 */
const StarRatingSelector = <TValues extends FieldValues>(
    {control, label, name, className}: GroupProps<TValues>
): ReactElement => {

    const [groupHover, setGroupHover] = useState<boolean>(false);
    const [starHover, setStarHover] = useState<number>(0);

    return (
        <FormField control={control} name={name} render={({field}) => (
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
        )}/>
    );
};

export default StarRatingSelector;