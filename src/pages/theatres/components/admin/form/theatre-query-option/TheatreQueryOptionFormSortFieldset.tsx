/**
 * @file TheatreQueryOptionFormSortFieldset.tsx
 * @description Fieldset component for rendering sorting options within the theatre query option form.
 * Dynamically displays available sort toggles based on the active schema fields.
 */

import { FC } from 'react';
import { UseFormReturn } from "react-hook-form";
import { TheatreQueryOptionFormValues } from "@/pages/theatres/schema/queries/TheatreQueryOptionFormSchema.ts";
import { TheatreQuerySorts } from "@/pages/theatres/schema/queries/TheatreQueryOption.types.ts";
import HookFormSortToggle from "@/common/components/forms/HookFormSortToggle.tsx";

/**
 * Props for {@link TheatreQueryOptionFormSortFieldset}.
 */
type FieldsetProps = {
    /** The form instance from `react-hook-form`. */
    form: UseFormReturn<TheatreQueryOptionFormValues>;

    /**
     * A record of active sort fields derived from the schema.
     * Determines which sort toggles should be displayed.
     */
    activeFields: Record<keyof TheatreQuerySorts, boolean>;
};

/**
 * `TheatreQueryOptionFormSortFieldset` renders a responsive set of
 * sorting toggle controls for theatre query options.
 *
 * - Uses `HookFormSortToggle` components for each sortable field.
 * - Each toggle corresponds to a schema field (e.g., `sortByName`, `sortByCity`).
 * - Displays only the toggles that are marked active in `activeFields`.
 * - Integrates seamlessly with `react-hook-form` for controlled state management.
 *
 * @component
 * @example
 * ```tsx
 * <TheatreQueryOptionFormSortFieldset
 *   form={form}
 *   activeFields={{
 *     sortByName: true,
 *     sortByCity: true,
 *     sortBySeatCapacity: false
 *   }}
 * />
 * ```
 */
const TheatreQueryOptionFormSortFieldset: FC<FieldsetProps> = (props) => {
    const { activeFields, form } = props;

    return (
        <fieldset className="flex flex-wrap space-x-2">
            {activeFields["sortByName"] && (
                <HookFormSortToggle
                    name="sortByName"
                    control={form.control}
                    label="Name"
                />
            )}

            {activeFields["sortBySeatCapacity"] && (
                <HookFormSortToggle
                    name="sortBySeatCapacity"
                    control={form.control}
                    label="Seat Capacity"
                />
            )}

            {activeFields["sortByCity"] && (
                <HookFormSortToggle
                    name="sortByCity"
                    control={form.control}
                    label="City"
                />
            )}

            {activeFields["sortByState"] && (
                <HookFormSortToggle
                    name="sortByState"
                    control={form.control}
                    label="State"
                />
            )}

            {activeFields["sortByCountry"] && (
                <HookFormSortToggle
                    name="sortByCountry"
                    control={form.control}
                    label="Country"
                />
            )}

            {activeFields["sortByPostCode"] && (
                <HookFormSortToggle
                    name="sortByPostCode"
                    control={form.control}
                    label="Post Code"
                />
            )}

            {activeFields["sortByTimezone"] && (
                <HookFormSortToggle
                    name="sortByTimezone"
                    control={form.control}
                    label="Timezone"
                />
            )}
        </fieldset>
    );
};

export default TheatreQueryOptionFormSortFieldset;
