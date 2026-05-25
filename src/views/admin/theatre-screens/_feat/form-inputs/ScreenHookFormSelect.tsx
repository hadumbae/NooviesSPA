/**
 * @fileoverview Hook Form select component for theatre screens with integrated data fetching.
 */

import {FieldValues} from "react-hook-form";
import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import {Loader} from "lucide-react";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {HookFormMultiSelect} from "@/views/common/_comp/form-select/HookFormMultiSelect.tsx";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {useFetchScreens} from "@/domains/theatre-screens/_feat/crud-hooks";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {TheatreScreen, TheatreScreenSchema} from "@/domains/theatre-screens/schema/model";
import {ReactElement} from "react";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/**
 * Props for the ScreenHookFormSelect component.
 */
type SelectProps<TSubmit extends FieldValues> = HookFormInputControlProps<TSubmit> & {
    isMulti?: boolean;
    filters?: RequestQueryParams;
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