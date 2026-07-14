/** @fileoverview Fieldset component for cast-specific boolean flags in the movie credit form. */

import {ReactElement} from "react";
import {HookFormCheckbox} from "@/views/common/_feat";
import {HookFormField} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {renderFields} from "@/common/_feat/submit-data";
import {cn} from "@/common/lib/utils.ts";
import {DisableFields} from "@/common/types";
import {MovieCreditFormValues} from "@/domains/movie-credits";

/** Props for the MovieCreditFormCastFlagFieldset component. */
type FieldsetProps = {
    className?: string;
    disableFields?: DisableFields<MovieCreditFormValues>;
};

/** Renders a grid of checkbox inputs for cast attributes like primary, uncredited, or voice roles. */
export function MovieCreditFormCastFlagFieldset(
    {className, disableFields}: FieldsetProps
): ReactElement {
    const fields: HookFormField[] = [
        {
            render: !disableFields?.isPrimary,
            key: "isPrimary",
            element: <HookFormCheckbox name="isPrimary" label="Is Primary?"/>

        },
        {
            render: !disableFields?.uncredited,
            key: "uncredited",
            element: <HookFormCheckbox name="uncredited" label="Is Uncredited?"/>

        },
        {
            render: !disableFields?.cameo,
            key: "cameo",
            element: <HookFormCheckbox name="cameo" label="Is Cameo?"/>

        },
        {
            render: !disableFields?.archiveFootage,
            key: "archiveFootage",
            element: <HookFormCheckbox name="archiveFootage" label="Is Archive Footage?"/>

        },
        {
            render: !disableFields?.voiceOnly,
            key: "voiceOnly",
            element: <HookFormCheckbox name="voiceOnly" label="Is Voice Only?"/>

        },
        {
            render: !disableFields?.motionCapture,
            key: "motionCapture",
            element: <HookFormCheckbox name="motionCapture" label="Is Motion Captured?"/>

        },
    ];

    return (
        <fieldset className={cn("space-y-3", className)}>
            <h3 className="fieldset-header">Flags</h3>

            <div className="grid grid-cols-2 gap-2">
                {renderFields({fields})}
            </div>
        </fieldset>
    );
}