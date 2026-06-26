/**
 * @fileoverview Fieldset component for the seat submission form handling theatre and screen selection.
 */

import {ReactElement, useEffect} from 'react';
import {useFormContext} from "react-hook-form";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui";
import {cn} from "@/common/lib/utils.ts";
import {ScreenHookFormSelect} from "@/views/admin/theatre-screens/_feat/form-inputs";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {TheatreHookFormSelect} from "@/views/admin/theatres/_feat";
import {SeatFormValues} from "@/domains/seats";

/** Renders the theatre and screen selection fields, ensuring the screen resets when the theatre changes. */
export function SeatSubmitFormDetailsFieldset(
    {className, disableFields, isNestedView}: FormFieldsetProps<SeatFormValues>
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
                <PrimaryHeaderText>Details</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className={cn(
                "grid grid-cols-1 gap-2",
                !isNestedView && "lg:grid-cols-2",
            )}>
                {
                    !disableFields?.theatre &&
                    <TheatreHookFormSelect
                        name="theatre"
                        label="Theatre"
                    />
                }

                {
                    !disableFields?.screen && theatre &&
                    <ScreenHookFormSelect
                        name="screen"
                        label="Screen"
                        filters={screenFilters}
                        control={control}
                    />
                }
            </div>
        </fieldset>
    );
}