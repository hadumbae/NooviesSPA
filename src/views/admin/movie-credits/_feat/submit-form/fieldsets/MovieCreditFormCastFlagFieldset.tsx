/** @fileoverview Fieldset component for cast-specific boolean flags in the movie credit form. */

import {ReactElement} from "react";
import {HookFormCheckbox} from "@/views/common/_feat";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";
import {createFormFieldConfig, FormViewProps, renderFields} from "@/common/_feat/submit-data";
import {cn, useBaseFormContext} from "@/common/_feat";
import {MovieCreditFormValues} from "@/domains/movie-credits";

/** Renders a grid of checkbox inputs for cast attributes like primary, uncredited, or voice roles. */
export function MovieCreditFormCastFlagFieldset(
    {className, disableFields, hideFields}: FormViewProps<MovieCreditFormValues>
): ReactElement {
    const {isPending} = useBaseFormContext();
    const field = createFormFieldConfig({disableFields, hideFields, extraDisabled: isPending});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "isPrimary",
            element: <HookFormCheckbox name="isPrimary" label="Is Primary?"/>
        }),
        field({
            key: "uncredited",
            element: <HookFormCheckbox name="uncredited" label="Is Uncredited?"/>
        }),
        field({
            key: "cameo",
            element: <HookFormCheckbox name="cameo" label="Is Cameo?"/>
        }),
        field({
            key: "archiveFootage",
            element: <HookFormCheckbox name="archiveFootage" label="Is Archive Footage?"/>
        }),
        field({
            key: "voiceOnly",
            element: <HookFormCheckbox name="voiceOnly" label="Is Voice Only?"/>
        }),
        field({
            key: "motionCapture",
            element: <HookFormCheckbox name="motionCapture" label="Is Motion Captured?"/>
        }),
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