/**
 * @fileoverview View component for the showings page query form.
 */

import {ReactElement} from "react";
import {HookFormInput} from "@/views/common/_feat";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {DisableFields} from "@/common/_types";
import {ShowingsPageQueryStrings} from "@/domains/movies";

/** Props for the TheatreShowingQueryFormView component. */
export type FormProps = {
    disableFields?: DisableFields<ShowingsPageQueryStrings>;
    className?: string;
};

/**
 * Renders input fields for filtering movie showings by location and page.
 */
export function TheatreShowingQueryFormView(
    {disableFields, className}: FormProps
): ReactElement {
    const {submitHandler} = useBaseFormContext();
    const {control} = useFormContext();

    if (!submitHandler) {
        throw new Error(`'${TheatreShowingQueryFormView.name}' requires a submitHandler.`);
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