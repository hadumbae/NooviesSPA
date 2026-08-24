/**
 * @fileoverview Form view component for rendering theatre location query options input fields.
 */

import {ReactElement} from "react";
import {
    cn,
    createFormFieldConfig,
    FormViewProps,
    renderFields,
    useAutoFormSubmit,
    useQueryOptionFormContext
} from "@/common/_feat";
import {TheatreLocationQueryOptionsFormValues} from "@/domains/theatres";
import {HookFormInput} from "@/views/common/_feat";
import {useFormContext} from "react-hook-form";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";
import {HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2ShortCountryOptions} from "@/common/_const";

/** Renders input fields for configuring theatre location query options within a form context. */
export function TheatreLocationQueryOptionsFormView(
    {className, hideFields, disableFields}: FormViewProps<TheatreLocationQueryOptionsFormValues>
): ReactElement {
    const {control} = useFormContext();
    const field = createFormFieldConfig({hideFields, disableFields});

    const {submitHandler} = useQueryOptionFormContext();
    useAutoFormSubmit({submitHandler, timeout: 450});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "target",
            element: <HookFormInput
                name="target"
                label="Location"
                placeholder="City, State, or Post Code"
                control={control}
            />
        }),
        field({
            key: "country",
            element: <HookFormSelect
                name="country"
                label="Country"
                placeholder="Country"
                options={ISO3166Alpha2ShortCountryOptions}
            />
        }),
    ];

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
            {renderFields({fields})}
        </div>
    );
}