/**
 * @fileoverview Layout component for query option forms that organizes filter and sort fieldsets.
 */

import {ComponentType, ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {
    cn,
    FormViewProps,
    QueryOptionFormViewClassNames,
    useAutoFormSubmit,
    useQueryOptionFormContext
} from "@/common/_feat";
import {DisableFields, HideFields} from "@/common/_types/form";
import {Separator} from "@/views/common/_comp/ui";

type QueryOptionFormLayoutProps<TValues extends FieldValues> = {
    filterFieldset: ComponentType<FormViewProps<TValues>>;
    sortFieldset: ComponentType<FormViewProps<TValues>>;
    disableFields?: DisableFields<TValues>;
    hideFields?: HideFields<TValues>;
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
        hideFields,
        classNames,
        autoSubmitTimeout = 450
    } = params;

    const {submitHandler} = useQueryOptionFormContext();
    useAutoFormSubmit({submitHandler, timeout: autoSubmitTimeout});

    return (
        <div className={cn("space-y-4", classNames?.container)}>
            <FilterFieldset hideFields={hideFields} disableFields={disableFields} className={classNames?.filters}/>
            <Separator/>
            <SortFieldset hideFields={hideFields} disableFields={disableFields} className={classNames?.sorts}/>
        </div>
    );
}