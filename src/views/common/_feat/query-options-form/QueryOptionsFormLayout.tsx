/**
 * @fileoverview Layout component for query option forms that organizes filter and sort fieldsets.
 */

import {ComponentType, ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {
    cn,
    FormFieldsetProps,
    QueryOptionFormViewClassNames,
    useAutoFormSubmit,
    useQueryOptionFormContext
} from "@/common/_feat";
import {DisableFields} from "@/common/_types/form";
import {Separator} from "@/views/common/_comp/ui";

type QueryOptionFormLayoutProps<TValues extends FieldValues> = {
    filterFieldset: ComponentType<FormFieldsetProps<TValues>>;
    sortFieldset: ComponentType<FormFieldsetProps<TValues>>;
    disableFields?: DisableFields<TValues>;
    classNames?: QueryOptionFormViewClassNames,
    autoSubmitTimeout?: number
}

/**
 * Renders a layout for query option forms.
 */
export function QueryOptionFormLayout<TValues extends FieldValues>(
    params: QueryOptionFormLayoutProps<TValues>
): ReactElement {
    const {
        filterFieldset: FilterFieldset,
        sortFieldset: SortFieldset,
        disableFields,
        classNames,
        autoSubmitTimeout = 450
    } = params;

    const {submitHandler} = useQueryOptionFormContext();
    useAutoFormSubmit({submitHandler, timeout: autoSubmitTimeout});

    return (
        <div className={cn("space-y-4", classNames?.container)}>
            <FilterFieldset disableFields={disableFields} className={classNames?.filters}/>
            <Separator/>
            <SortFieldset disableFields={disableFields} className={classNames?.sorts}/>
        </div>
    );
}