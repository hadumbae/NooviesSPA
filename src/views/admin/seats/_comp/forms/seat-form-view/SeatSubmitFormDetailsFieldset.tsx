/**
 * @fileoverview Fieldset component for the seat submission form handling theatre and screen selection.
 */

import {ReactElement, useEffect} from 'react';
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {UseFormReturn} from "react-hook-form";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatFormContext} from "@/domains/seats/context/form/SeatFormContext.ts";
import {cn} from "@/common/lib/utils.ts";
import TheatreHookFormSelect from "@/domains/theatres/components/admin/form/theatre-inputs/TheatreHookFormSelect.tsx";
import {ScreenHookFormSelect} from "@/views/admin/theatre-screens/_feat/form-inputs";

/** Props for the SeatSubmitFormDetailsFieldset component. */
type FieldsetProps = {
    form: UseFormReturn<SeatFormValues>;
    activeFields: Record<keyof SeatFormValues, boolean>;
};

/**
 * Renders the "Details" fieldset for seat management.
 */
export function SeatSubmitFormDetailsFieldset(
    {form, activeFields}: FieldsetProps
): ReactElement {
    const {options: {isPanel} = {}} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    const theatre = form.watch("theatre");
    const screenFilters = {theatre};

    /** Effect: Reset the screen field whenever the theatre is changed to ensure data integrity. */
    useEffect(() => {
        form.resetField("screen");
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
                    activeFields["theatre"] &&
                    <TheatreHookFormSelect
                        name="theatre"
                        label="Theatre"
                        control={form.control}
                    />
                }

                {
                    activeFields["screen"] && theatre &&
                    <ScreenHookFormSelect
                        name="screen"
                        label="Screen"
                        filters={screenFilters}
                        control={form.control}
                    />
                }
            </div>
        </fieldset>
    );
}