/**
 * @fileoverview Factory for creating collapsible query option form sections.
 */

import {ReactElement, useState} from "react";
import {QueryOptionFormContainerProps, QueryOptionFormViewProps, QueryOptionsContextValues} from "@/common/_feat";
import {QueryOptionsFormCollapsible} from "@/views/common/_feat";
import {FieldValues} from "react-hook-form";

type SectionConfig<TFormValues extends FieldValues, TOptions extends FieldValues> = {
    queryOptionForm: (props: QueryOptionFormContainerProps<TFormValues, TOptions>) => ReactElement;
    useQueryOptionsContext: () => QueryOptionsContextValues<TOptions>;
    formView: (props: QueryOptionFormViewProps<TFormValues>) => ReactElement;
};

type SectionProps<TFormValues extends FieldValues> = QueryOptionFormViewProps<TFormValues> & {
    disableClear?: boolean;
};

/** Creates a component that integrates query options context with a collapsible form view. */
export function createQueryOptionFormSection<TFormValues extends FieldValues, TOptions extends FieldValues>(
    {queryOptionForm: QueryOptionForm, useQueryOptionsContext, formView: FormView}: SectionConfig<TFormValues, TOptions>
): (props: SectionProps<TFormValues>) => ReactElement {
    return function QueryOptionFormSection(
        {disableFields, classNames, disableClear = false}: SectionProps<TFormValues>
    ): ReactElement {
        const [isOpen, setIsOpen] = useState(false);
        const {values, setValues, activeOptions} = useQueryOptionsContext();

        return (
            <QueryOptionForm queryOptions={values} setQueryOptions={setValues} activeOptions={activeOptions}>
                <QueryOptionsFormCollapsible isOpen={isOpen} setIsOpen={setIsOpen} disableClear={disableClear}>
                    <FormView disableFields={disableFields} classNames={classNames}/>
                </QueryOptionsFormCollapsible>
            </QueryOptionForm>
        );
    };
}