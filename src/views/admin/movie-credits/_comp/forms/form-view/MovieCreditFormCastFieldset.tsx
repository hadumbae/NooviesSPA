/** @fileoverview Fieldset component for cast-specific movie credit form fields. */

import {ReactElement} from "react";
import {HeaderTextCSS} from "@/common/constants/css/TextCSS.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {MovieCreditFormDisableFields} from "@/domains/moviecredit/_feat/submit-data";
import {HookFormField} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {useFormContext} from "react-hook-form";
import {renderFields} from "@/common/features/submit-data";
import {cn} from "@/common/lib/utils.ts";

/** Props for the MovieCreditFormCastFieldset component. */
type FieldsetProps = {
    className?: string;
    disableFields?: MovieCreditFormDisableFields;
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
            <h1 className={HeaderTextCSS}>Credits Info</h1>
            {renderFields({fields})}
        </fieldset>
    );
}