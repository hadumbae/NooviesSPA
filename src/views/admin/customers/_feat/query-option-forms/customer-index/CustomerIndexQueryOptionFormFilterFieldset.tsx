/**
 * @fileoverview Fieldset for filtering the customer index query options.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {HookFormInput} from "@/views/common/_feat";
import {LabelledFormInput} from "@/views/admin/movies";
import {cn} from "@/common/_feat";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {CustomerIndexQueryOptionFormValues} from "@/domains/customers/_types";

/**
 * Form fieldset for filtering customers by name, email, and unique code.
 * Requires a React Hook Form context.
 */
export function CustomerIndexQueryOptionFormFilterFieldset(
    {className, disableFields}: FormFieldsetProps<CustomerIndexQueryOptionFormValues>
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", className)}>
            {
                !disableFields?.name &&
                <LabelledFormInput label="Name">
                    <HookFormInput name="name" control={control}/>
                </LabelledFormInput>
            }

            {
                !disableFields?.email &&
                <LabelledFormInput label="Email">
                    <HookFormInput name="email" control={control}/>
                </LabelledFormInput>
            }

            {
                !disableFields?.uniqueCode &&
                <LabelledFormInput label="Unique Code" classNames={{
                    container: "col-span-1 md:col-span-2 xl:col-span-1",
                }}>
                    <HookFormInput name="uniqueCode" control={control}/>
                </LabelledFormInput>
            }
        </fieldset>
    );
}