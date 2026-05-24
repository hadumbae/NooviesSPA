/**
 * @file Showings page query form view component.
 * @filename TheatreShowingQueryFormView.tsx
 */

import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {ShowingsPageQueryStrings} from "@/domains/movies/_feat/client-view-data";
import {ReactElement} from "react";
import {DisableFields} from "@/common/types";

/**
 * Props for {@link TheatreShowingQueryFormView}.
 */
type FormProps = {
    disableFields?: DisableFields<ShowingsPageQueryStrings>;
    className?: string;
};

/**
 * View component for showings query inputs.
 */
export function TheatreShowingQueryFormView(
    {disableFields, className}: FormProps
): ReactElement {
    const {submitHandler} = useBaseFormContext();
    const {control} = useFormContext();

    if (!submitHandler) {
        throw new Error("`TheatreShowingQueryFormView` requires a submitHandler.");
    }

    useAutoFormSubmit({submitHandler});

    return (
        <div className={cn("space-y-4", className)}>
            {
                !disableFields?.near && (
                    <HookFormInput
                        name="near"
                        type="text"
                        label="Location"
                        control={control}
                        className="col-span-2 md:col-span-4"
                    />
                )
            }

            {
                !disableFields?.page && (
                    <HookFormInput
                        name="page"
                        type="number"
                        min={1}
                        label="Showings Page"
                        control={control}
                        className="md:col-span-2"
                    />
                )
            }
        </div>
    );
}