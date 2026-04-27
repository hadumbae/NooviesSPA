/** @fileoverview Fieldset component for cast-specific boolean flags in the movie credit form. */

import {ReactElement} from "react";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import {useFormContext} from "react-hook-form";
import {MovieCreditFormDisableFields} from "@/domains/moviecredit/_feat/submit-data";
import {HookFormField} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {HeaderTextCSS} from "@/common/constants/css/TextCSS.ts";
import {renderFields} from "@/common/features/submit-data";
import {cn} from "@/common/lib/utils.ts";

/** Props for the MovieCreditFormCastFlagFieldset component. */
type FieldsetProps = {
    className?: string;
    disableFields?: MovieCreditFormDisableFields;
};

/** Renders a grid of checkbox inputs for cast attributes like primary, uncredited, or voice roles. */
export function MovieCreditFormCastFlagFieldset(
    {className, disableFields}: FieldsetProps
): ReactElement {
    const {control} = useFormContext();

    const fields: HookFormField[] = [
        {
            render: !disableFields?.isPrimary,
            key: "isPrimary",
            element: <HookFormCheckbox name="isPrimary" label="Is Primary?" control={control}/>

        },
        {
            render: !disableFields?.uncredited,
            key: "uncredited",
            element: <HookFormCheckbox name="uncredited" label="Is Uncredited?" control={control}/>

        },
        {
            render: !disableFields?.cameo,
            key: "cameo",
            element: <HookFormCheckbox name="cameo" label="Is Cameo?" control={control}/>

        },
        {
            render: !disableFields?.archiveFootage,
            key: "archiveFootage",
            element: <HookFormCheckbox name="archiveFootage" label="Is Archive Footage?" control={control}/>

        },
        {
            render: !disableFields?.voiceOnly,
            key: "voiceOnly",
            element: <HookFormCheckbox name="voiceOnly" label="Is Voice Only?" control={control}/>

        },
        {
            render: !disableFields?.motionCapture,
            key: "motionCapture",
            element: <HookFormCheckbox name="motionCapture" label="Is Motion Captured?" control={control}/>

        },
    ];

    return (
        <fieldset className={cn("space-y-3", className)}>
            <h1 className={HeaderTextCSS}>Flags</h1>

            <div className="grid grid-cols-2 gap-2">
                {renderFields({fields})}
            </div>
        </fieldset>
    );
}