/**
 * @fileoverview Hook Form select component for theatre screens with integrated data fetching.
 */

import {Control, FieldValues, Path} from "react-hook-form";
import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import {Loader} from "lucide-react";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import {
    TheatreScreenArraySchema
} from "@/domains/theatre-screens/schema/model/TheatreScreenArraySchema.ts";
import {useFetchScreens} from "@/domains/theatre-screens/_feat/crud-hooks";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {TheatreScreen} from "@/domains/theatre-screens/schema/model";
import {ReactElement} from "react";

/**
 * Props for the ScreenHookFormSelect component.
 * @template TSubmit - The type of form values managed by react-hook-form.
 */
type SelectProps<TSubmit extends FieldValues> = {
    name: Path<TSubmit>;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TSubmit>;
    isMulti?: boolean;
    filters?: RequestQueryParams;
};

/**
 * A form select component that fetches theatre screen data and connects to react-hook-form.
 */
export function ScreenHookFormSelect<TSubmit extends FieldValues>(
    props: SelectProps<TSubmit>
): ReactElement {
    const {isMulti = false, filters = {}} = props;

    const query = useFetchScreens({
        queries: filters,
        schema: TheatreScreenArraySchema
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
                        ? <HookFormMultiSelect<TSubmit> options={options} {...props} />
                        : <HookFormSelect<TSubmit> options={options} {...props} />
                );
            }}
        </QueryDataLoader>
    );
}