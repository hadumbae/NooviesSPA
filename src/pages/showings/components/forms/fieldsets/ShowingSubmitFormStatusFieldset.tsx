/**
 * @file ShowingSubmitFormStatusFieldset.tsx
 * @description
 * Fieldset component responsible for displaying and managing all status- and pricing-related
 * fields for the Showing submission form.
 *
 * Includes:
 * - Ticket price input
 * - Active/inactive toggle
 * - Special event toggle
 * - Showing status select
 *
 * Each field is conditionally rendered using the `activeFields` map, allowing parent
 * forms to dynamically enable or disable individual fields based on context.
 *
 * Uses `react-hook-form` for controlled input management.
 *
 * @module ShowingSubmitFormStatusFieldset
 */

import {FC} from 'react';
import {UseFormReturn} from "react-hook-form";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import ShowingStatusHookFormSelect from "@/pages/showings/components/inputs/ShowingStatusHookFormSelect.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";

/**
 * Props for `ShowingSubmitFormStatusFieldset`.
 *
 * @property form - The React Hook Form instance controlling the showing form.
 * @property activeFields - A field activation map determining which fields render.
 */
type FieldsetProps = {
    form: UseFormReturn<ShowingFormValues>;
    activeFields: Record<keyof ShowingFormValues, boolean>;
}

/**
 * A fieldset providing status- and price-related inputs for the Showing submission form.
 *
 * Includes four optional fields:
 * - **ticketPrice** — Base ticket price for the showing
 * - **isActive** — Whether the showing is active
 * - **isSpecialEvent** — Whether the showing is part of a special event
 * - **status** — Current workflow/status value (e.g., DRAFT, PUBLISHED, CANCELLED)
 *
 * The visibility of each field is controlled via `activeFields`.
 *
 * @param {FieldsetProps} props - Controlled form instance and field activation settings.
 * @returns {JSX.Element} A grid of status and pricing inputs.
 *
 * @example Rendering all fields
 * ```tsx
 * <ShowingSubmitFormStatusFieldset
 *   form={form}
 *   activeFields={{
 *     ticketPrice: true,
 *     isActive: true,
 *     isSpecialEvent: true,
 *     status: true,
 *   }}
 * />
 * ```
 *
 * @example Rendering only checkboxes
 * ```tsx
 * <ShowingSubmitFormStatusFieldset
 *   form={form}
 *   activeFields={{
 *     ticketPrice: false,
 *     isActive: true,
 *     isSpecialEvent: true,
 *     status: false,
 *   }}
 * />
 * ```
 */
const ShowingSubmitFormStatusFieldset: FC<FieldsetProps> = ({form, activeFields}) => {
    return (
        <fieldset className="space-y-3">
            <div>
                <PrimaryHeaderText>Status</PrimaryHeaderText>
                <Separator />
            </div>

            <div className="grid grid-cols-2 gap-2">
                {/* Ticket Price */}
                {activeFields.ticketPrice && (
                    <HookFormInput
                        name="ticketPrice"
                        label="Ticket Price"
                        control={form.control}
                        description="The base price of the showing."
                        type="number"
                        min={1}
                        step={0.01}
                        className="col-span-2"
                    />
                )}

                {/* Is Active */}
                {activeFields.isActive && (
                    <HookFormCheckbox
                        name="isActive"
                        label="Is Active?"
                        control={form.control}
                    />
                )}

                {/* Is Special Event */}
                {activeFields.isSpecialEvent && (
                    <HookFormCheckbox
                        name="isSpecialEvent"
                        label="Is Special Event?"
                        control={form.control}
                    />
                )}

                {/* Can Reserve Seats */}
                <HookFormCheckbox
                    name="config.canReserveSeats"
                    label="Can Reserve Seats?"
                    control={form.control}
                />

                {/* Status Select */}
                {activeFields.status && (
                    <ShowingStatusHookFormSelect
                        name="status"
                        label="Status"
                        control={form.control}
                        description="The current status of the showing."
                        className="col-span-2"
                    />
                )}
            </div>
        </fieldset>
    );
};

export default ShowingSubmitFormStatusFieldset;
