/**
 * @file SeatSubmitFormDetailsFieldset.tsx
 *
 * @summary
 * A fieldset component responsible for rendering seat “detail” fields—specifically
 * the parent **Theatre** and dependent **Screen** selectors—for the seat submission form.
 *
 * @description
 * This component integrates with `react-hook-form` to:
 * - Display a theatre selector and (conditionally) a screen selector.
 * - Dynamically filter available screens based on the selected theatre.
 * - Render inputs conditionally depending on the `activeFields` configuration
 *   defined by the parent form container.
 *
 * It is intended to be consumed as part of the seat creation/update UI and works
 * in coordination with other fieldset components such as coordinate and status fieldsets.
 */

import {FC, useEffect} from 'react';
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import ScreenHookFormSelect from "@/pages/screens/components/submit-form/inputs/ScreenHookFormSelect.tsx";
import {UseFormReturn} from "react-hook-form";

import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";
import {cn} from "@/common/lib/utils.ts";
import TheatreHookFormSelect from "@/pages/theatres/components/admin/form/theatre-inputs/TheatreHookFormSelect.tsx";

/**
 * Props for {@link SeatSubmitFormDetailsFieldset}.
 *
 * @property form - The `react-hook-form` instance managing the parent form.
 * @property activeFields - A map of active fields; determines whether theatre
 * and screen selectors should be displayed.
 */
type FieldsetProps = {
    /** The react-hook-form instance controlling form state and validation. */
    form: UseFormReturn<SeatFormValues>;

    /**
     * A record describing which fields in the form should be active/visible.
     * This fieldset makes use of:
     * - `theatre`
     * - `screen`
     */
    activeFields: Record<keyof SeatFormValues, boolean>;
};

/**
 * @component SeatSubmitFormDetailsFieldset
 *
 * @description
 * Renders the “Details” fieldset for seat submission, including:
 * - A theatre selector.
 * - A screen selector that appears only when:
 *   - The `screen` field is active, **and**
 *   - A theatre has been selected.
 *
 * The screen selector receives dynamic filters based on the currently selected theatre.
 *
 * @param props - {@link FieldsetProps}
 * @returns A fieldset containing the relevant theatre/screen selectors.
 *
 * @example
 * Rendering both theatre and screen fields:
 * ```tsx
 * <SeatSubmitFormDetailsFieldset
 *   form={form}
 *   activeFields={{ theatre: true, screen: true, x: false, y: false }}
 * />
 * ```
 *
 * @example
 * Rendering only the theatre selector:
 * ```tsx
 * <SeatSubmitFormDetailsFieldset
 *   form={form}
 *   activeFields={{ theatre: true, screen: false }}
 * />
 * ```
 */
const SeatSubmitFormDetailsFieldset: FC<FieldsetProps> = ({form, activeFields}) => {
    // --- Access Context ---
    const {options: {isPanel} = {}} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    // --- Form State ---

    const theatre = form.watch("theatre");
    const screenFilters = {theatre};

    // --- Reset Screen On Theatre Change ---

    useEffect(() => {
        form.resetField("screen");
    }, [theatre]);

    // --- Render ---
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
};

export default SeatSubmitFormDetailsFieldset;
