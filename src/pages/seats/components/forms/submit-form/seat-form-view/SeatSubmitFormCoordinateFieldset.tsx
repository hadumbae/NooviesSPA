/**
 * @file SeatSubmitFormCoordinateFieldset.tsx
 *
 * @summary
 * A presentational fieldset component for displaying and managing seat coordinate
 * fields (`x` and `y`) within a seat submission form. The component renders one or
 * both fields depending on the provided `activeFields` configuration and integrates
 * tightly with `react-hook-form`.
 *
 * @description
 * This module provides the `SeatSubmitFormCoordinateFieldset` component, which:
 *
 * - Displays coordinate inputs for a seat: `x` and/or `y`.
 * - Uses `react-hook-form` for form state and validation via the provided `form` prop.
 * - Dynamically adjusts layout (`1` or `2` columns) based on active fields.
 * - Wraps the coordinate inputs in a semantic `<fieldset>`.
 * - Uses shared UI primitives such as `PrimaryHeaderText`, `Separator`, and `HookFormInput`.
 *
 * It is intended to be consumed by higher-level seat creation/edit forms.
 */

import {FC} from 'react';
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {UseFormReturn} from "react-hook-form";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";

/**
 * Props for {@link SeatSubmitFormCoordinateFieldset}.
 *
 * @template TFormValues
 * @property form - The `react-hook-form` instance controlling the parent form.
 * @property activeFields - A mapping of which coordinate fields should be rendered.
 *
 * Only `x` and `y` matter here, but the type is aligned with the full `SeatFormValues` shape
 * for consistency with other fieldsets.
 */
type FieldsetProps = {
    /** The react-hook-form instance controlling the seat submission form. */
    form: UseFormReturn<SeatFormValues>;

    /**
     * An object indicating which fields in `SeatFormValues` are currently active
     * and should be rendered. For this fieldset, only `x` and `y` are used.
     */
    activeFields: Record<keyof SeatFormValues, boolean>;
};

/**
 * @component SeatSubmitFormCoordinateFieldset
 *
 * @description
 * Renders the coordinate input fields (`x` and/or `y`) for the seat submission form.
 * The layout automatically adjusts to one or two columns depending on how many
 * fields are active.
 *
 * @param props - {@link FieldsetProps}
 * @returns A fieldset containing coordinate inputs bound to `react-hook-form`.
 *
 * @example
 * ```tsx
 * <SeatSubmitFormCoordinateFieldset
 *   form={form}
 *   activeFields={{ x: true, y: true, name: false, row: false }}
 * />
 * ```
 *
 * @example
 * Rendering only `x`:
 * ```tsx
 * <SeatSubmitFormCoordinateFieldset
 *   form={form}
 *   activeFields={{ x: true, y: false }}
 * />
 * ```
 */
const SeatSubmitFormCoordinateFieldset: FC<FieldsetProps> = ({activeFields, form}) => {
    const hasActiveField = activeFields["x"] && activeFields["y"];

    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText>Coordinates</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className={cn("grid gap-2", hasActiveField ? "grid-cols-2" : "grid-cols-1")}>
                {
                    activeFields["x"] &&
                    <HookFormInput
                        name="x"
                        label="X Coordinate"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                }

                {
                    activeFields["y"] &&
                    <HookFormInput
                        name="y"
                        label="Y Coordinate"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                }
            </div>
        </fieldset>
    );
};

export default SeatSubmitFormCoordinateFieldset;
