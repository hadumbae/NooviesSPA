/**
 * @fileoverview Fieldset component for the seat submission form handling theatre and screen selection.
 */

import {ReactElement, useEffect} from 'react';
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {useFormContext} from "react-hook-form";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import TheatreHookFormSelect from "@/views/admin/theatres/_feat/form-input/TheatreHookFormSelect.tsx";
import {ScreenHookFormSelect} from "@/views/admin/theatre-screens/_feat/form-inputs";
import {FormViewProps} from "@/common/features/submit-data/formTypes.ts";

/** Props for the SeatSubmitFormDetailsFieldset component. */
type FieldsetProps = Pick<FormViewProps<SeatFormValues>, "disableFields"> & {
    isPanel?: boolean;
};

/**
 * Renders the theatre and screen selection fields, ensuring the screen resets when theatre changes.
 * Requires wrapping in a SeatFormContext provider.
 */
export function SeatSubmitFormDetailsFieldset(
    {disableFields, isPanel}: FieldsetProps
): ReactElement {
    const {control, watch, resetField} = useFormContext();

    const theatre = watch("theatre");
    const screenFilters = {theatre};

    useEffect(() => {
        resetField("screen");
    }, [theatre]);

    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText>Details</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className={cn(
                "grid grid-cols-1 gap-2",
                !isPanel && "lg:grid-cols-2",
            )}>
                {
                    !disableFields?.theatre &&
                    <TheatreHookFormSelect
                        name="theatre"
                        label="Theatre"
                        control={control}
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