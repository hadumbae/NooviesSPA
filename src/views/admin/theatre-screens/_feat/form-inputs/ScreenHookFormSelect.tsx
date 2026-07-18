/**
 * @fileoverview Hook Form select component for theatre screens with integrated data fetching.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {Loader} from "lucide-react";
import {ReactSelectOption} from "@/common/_types/input/ReactSelectOption.ts";
import {HookFormMultiSelect} from "@/views/common/_comp/form-select/HookFormMultiSelect.tsx";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {QueryDataLoader} from "@/views/common/_feat";
import {TheatreScreen, TheatreScreenSchema} from "@/domains/theatre-screens/_schema/model";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {HookFormInputControlProps} from "@/common/_types/input/HookFormInputProps.ts";
import {TheatreScreenQueryFilters, useFetchScreens} from "@/domains/theatre-screens";

/**
 * Props for the ScreenHookFormSelect component.
 */
type SelectProps<TSubmit extends FieldValues> = HookFormInputControlProps<TSubmit> & {
    isMulti?: boolean;
    filters?: TheatreScreenQueryFilters;
};

/**
 * A form select component that fetches theatre screen data and connects to react-hook-form.
 */
export function ScreenHookFormSelect<TSubmit extends FieldValues>(
    {isMulti = false, filters, ...rest}: SelectProps<TSubmit>
): ReactElement {
    const query = useFetchScreens({
        queries: filters,
        schema: generateArraySchema(TheatreScreenSchema)
    });

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(screens: TheatreScreen[]) => {
                const options: ReactSelectOption[] = screens.map(
                    ({_id, name, screenType}): ReactSelectOption => ({
                        value: _id,
                        label: `${name} (${screenType})`
                    }),
                );

                return (
                    isMulti
                        ? <HookFormMultiSelect<TSubmit> options={options} {...rest} />
                        : <HookFormSelect<TSubmit> options={options} {...rest} />
                );
            }}
        </QueryDataLoader>
    );
}