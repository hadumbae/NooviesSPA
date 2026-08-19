/**
 * @fileoverview Fieldset component for the seat submission form handling theatre and screen selection.
 */

import {ReactElement, useEffect} from 'react';
import {useFormContext} from "react-hook-form";
import {Separator} from "@/views/common/_comp/ui";
import {cn} from "@/common/_feat";
import {ScreenHookFormSelect} from "@/views/admin/theatre-screens/_feat/form-inputs";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {TheatreHookFormSelect} from "@/views/admin/theatres/_feat";
import {SeatFormValues} from "@/domains/seats";

type ViewProps = FormFieldsetProps<SeatFormValues> & {
    isNestedView?: boolean;
}

/** Renders the theatre and screen selection fields, ensuring the screen resets when the theatre changes. */
export function SeatSubmitFormDetailsFieldset(
    {className, disableFields, hideFields, isNestedView}: ViewProps
): ReactElement {
    const {control, watch, resetField} = useFormContext();

    const theatre = watch("theatre");
    const screenFilters = {theatre};

    useEffect(() => {
        resetField("screen");
    }, [theatre, resetField]);

    return (
        <fieldset className={cn("space-y-4", className)}>
            <div>
                <h3 className="fieldset-header">Details</h3>
                <Separator/>
            </div>

            <div className={cn(
                "grid grid-cols-1 gap-2",
                !isNestedView && "lg:grid-cols-2",
            )}>
                {
                    !hideFields?.theatre &&
                    <TheatreHookFormSelect
                        name="theatre"
                        label="Theatre"
                        disabled={disableFields?.theatre}
                    />
                }

                {
                    !hideFields?.screen && theatre &&
                    <ScreenHookFormSelect
                        name="screen"
                        label="Screen"
                        filters={screenFilters}
                        control={control}
                        disabled={disableFields?.screen}
                    />
                }
            </div>
        </fieldset>
    );
}