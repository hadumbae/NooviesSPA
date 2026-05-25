/**
 * @fileoverview A multi-select form component for selecting multiple theatres from a fetched list.
 *
 */

import {FieldValues} from "react-hook-form";
import {Loader} from "lucide-react";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {useFetchTheatres} from "@/domains/theatres/_feat/crud-hooks";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {TheatreArray, TheatreArraySchema} from "@/domains/theatres/schema/theatre/TheatreArraySchema.ts";
import {TheatreQueryOptions} from "@/domains/theatres/_feat/handle-query-options/TheatreQueryOptionSchema.ts";
import {ReactElement} from "react";
import {
    HookFormMultiSelect
} from "@/views/common/_comp/form-select/HookFormMultiSelect.tsx";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/** Props for the TheatreHookFormMultiSelect component. */
type HookProps<TSubmit extends FieldValues> = HookFormInputControlProps<TSubmit> & {
    filters?: TheatreQueryOptions;
};

/**
 * A react-hook-form multi-select component that automatically fetches theatre options.
 */
export function TheatreHookFormMultiSelect<TSubmit extends FieldValues>(
    props: HookProps<TSubmit>
): ReactElement {
    const {disabled, filters} = props;

    const query = useFetchTheatres({
        schema: TheatreArraySchema,
        queries: filters,
    });

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(theatres: TheatreArray) => {
                const options: ReactSelectOption[] = theatres.map(
                    (theatre): ReactSelectOption => ({label: theatre.name, value: theatre._id}),
                );

                return (
                    <HookFormMultiSelect<TSubmit>
                        {...props}
                        options={options}
                        disabled={disabled}
                    />
                );
            }}
        </QueryDataLoader>
    );
}