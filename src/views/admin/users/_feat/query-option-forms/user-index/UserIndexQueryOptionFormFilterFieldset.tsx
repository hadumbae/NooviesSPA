/**
 * @fileoverview Fieldset containing filter inputs for the user index query options form.
 */

import {ReactElement} from "react";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {UserIndexQueryOptionFormValues} from "@/domains/users/_feat/submit-query-options";
import {HookFormInput} from "@/views/common/_feat";
import {useFormContext} from "react-hook-form";
import {LabelledFormInput} from "@/views/admin/movies";
import {cn} from "@/common/_feat";

/** Props for the UserIndexQueryOptionFormFilterFieldset component. */
type FieldsetProps = Omit<FormFieldsetProps<UserIndexQueryOptionFormValues>, "isNestedView">;

/**
 * Renders a set of filter inputs for searching users by name, email, or unique code.
 */
export function UserIndexQueryOptionFormFilterFieldset(
    {className, disableFields}: FieldsetProps
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