/**
 * @file ShowingSubmitFormDateTimeFieldset.tsx
 * @description
 * Fieldset component responsible for displaying and managing all date and time
 * inputs for the Showing submission form.
 *
 * Includes:
 * - Start date
 * - Start time
 * - End date
 * - End time
 *
 * Each field is conditionally rendered according to the `activeFields` configuration,
 * allowing parent forms to dynamically enable or disable specific time-related fields.
 *
 * Uses `react-hook-form` for form state and validation.
 *
 * @module ShowingSubmitFormDateTimeFieldset
 */

import {FC} from 'react';
import {UseFormReturn} from "react-hook-form";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";

/**
 * Props for `ShowingSubmitFormDateTimeFieldset`.
 *
 * @property form - The React Hook Form instance managing `ShowingFormValues`.
 * @property activeFields - Map controlling which inputs should be displayed.
 */
type FieldsetProps = {
    form: UseFormReturn<ShowingFormValues>;
    activeFields: Record<keyof ShowingFormValues, boolean>;
}

/**
 * A fieldset providing date and time inputs for the Showing submission form.
 *
 * Includes four optional fields:
 * - **startAtDate** — Show start date
 * - **startAtTime** — Show start time
 * - **endAtDate** — Show end date
 * - **endAtTime** — Show end time
 *
 * These inputs are displayed only if enabled in `activeFields`, allowing the parent
 * form to control which scheduling fields are required for a particular showing configuration.
 *
 * @param {FieldsetProps} props - Includes the controlled form instance and active-field toggles.
 * @returns {JSX.Element} A responsive grid of date and time inputs.
 *
 * @example
 * ```tsx
 * <ShowingSubmitFormDateTimeFieldset
 *   form={form}
 *   activeFields={{
 *     startAtDate: true,
 *     startAtTime: true,
 *     endAtDate: false,
 *     endAtTime: false
 *   }}
 * />
 * ```
 *
 * @example Rendering all fields
 * ```tsx
 * <ShowingSubmitFormDateTimeFieldset
 *   form={form}
 *   activeFields={{
 *     startAtDate: true,
 *     startAtTime: true,
 *     endAtDate: true,
 *     endAtTime: true
 *   }}
 * />
 * ```
 */
const ShowingSubmitFormDateTimeFieldset: FC<FieldsetProps> = ({form, activeFields}) => {
    return (
        <fieldset className="space-y-3">
            <div>
                <PrimaryHeaderText>Date & Time</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className="grid grid-cols-2 gap-3">

                {/* Start Date */}
                {activeFields.startAtDate && (
                    <HookFormInput
                        name="startAtDate"
                        label="Starting Date"
                        type="date"
                        control={form.control}
                        description="Date the showing starts."
                    />
                )}

                {/* Start Time */}
                {activeFields.startAtTime && (
                    <HookFormInput
                        name="startAtTime"
                        label="Starting Time"
                        type="time"
                        control={form.control}
                        description="Time the showing starts."
                    />
                )}

                {/* End Date */}
                {activeFields.endAtDate && (
                    <HookFormInput
                        name="endAtDate"
                        label="Ending Date"
                        type="date"
                        control={form.control}
                        description="Date the showing ends."
                    />
                )}

                {/* End Time */}
                {activeFields.endAtTime && (
                    <HookFormInput
                        name="endAtTime"
                        label="Ending Time"
                        type="time"
                        control={form.control}
                        description="Time the showing ends."
                    />
                )}
            </div>
        </fieldset>
    );
};

export default ShowingSubmitFormDateTimeFieldset;
