/** @fileoverview Fieldset component for cast-specific movie credit form fields. */

import {ReactElement} from "react";
import {HookFormInput} from "@/views/common/_feat";
import {HookFormField} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {useFormContext} from "react-hook-form";
import {renderFields} from "@/common/_feat/submit-data";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {DisableFields} from "@/common/_types";
import {MovieCreditFormValues} from "@/domains/movie-credits";

/** Props for the MovieCreditFormCastFieldset component. */
type FieldsetProps = {
    className?: string;
    disableFields?: DisableFields<MovieCreditFormValues>;
};

/** Renders input fields for billing order and character name. Requires wrapping in a Form provider. */
export function MovieCreditFormCastFieldset(
    {className, disableFields}: FieldsetProps
): ReactElement {
    const {control} = useFormContext();

    const fields: HookFormField[] = [
        {
            render: !disableFields?.billingOrder,
            key: "billingOrder",
            element: <HookFormInput
                name="billingOrder"
                label="Billing Order"
                control={control}
                type="number"
                min={1}
                step={1}
                description="Order of credits."
            />
        },
        {
            render: !disableFields?.characterName,
            key: "characterName",
            element: <HookFormInput
                name="characterName"
                label="Character Name"
                control={control}
                type="text"
                description="The name of the character played."
            />
        }
    ]

    return (
        <fieldset className={cn("space-y-3", className)}>
            <h3 className="fieldset-header">Credits Info</h3>
            {renderFields({fields})}
        </fieldset>
    );
}