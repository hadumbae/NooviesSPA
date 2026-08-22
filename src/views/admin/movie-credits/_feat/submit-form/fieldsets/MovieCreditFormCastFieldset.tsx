/** @fileoverview Fieldset component for cast-specific movie credit form fields. */

import {ReactElement} from "react";
import {HookFormInput} from "@/views/common/_feat";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";
import {useFormContext} from "react-hook-form";
import {createFormFieldConfig, FormViewProps, renderFields} from "@/common/_feat/submit-data";
import {cn, useBaseFormContext} from "@/common/_feat";
import {MovieCreditFormValues} from "@/domains/movie-credits";

/** Renders input fields for billing order and character name. Requires wrapping in a Form provider. */
export function MovieCreditFormCastFieldset(
    {className, disableFields, hideFields}: FormViewProps<MovieCreditFormValues>
): ReactElement {
    const {control} = useFormContext();
    const {isPending} = useBaseFormContext();

    const field = createFormFieldConfig({disableFields, hideFields, extraDisabled: isPending});

    const fields: ConditionalRenderConfig[] = [
        field({
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
        }),
        field({
            key: "characterName",
            element: <HookFormInput
                name="characterName"
                label="Character Name"
                control={control}
                type="text"
                description="The name of the character played."
            />
        }),
    ];

    return (
        <fieldset className={cn("space-y-3", className)}>
            <h3 className="fieldset-header">Credits Info</h3>
            {renderFields({fields})}
        </fieldset>
    );
}