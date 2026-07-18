/**
 * @fileoverview A multi-select form component for selecting multiple theatres from a fetched list.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {Loader} from "lucide-react";
import {ReactSelectOption} from "@/common/_types/input/ReactSelectOption.ts";
import {QueryDataLoader} from "@/views/common/_feat";
import {HookFormMultiSelect} from "@/views/common/_comp/form-select/HookFormMultiSelect.tsx";
import {HookFormInputControlProps} from "@/common/_types/input/HookFormInputProps.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";

import {Theatre, TheatreQueryOptions, TheatreSchema, useFetchTheatres} from "@/domains/theatres";

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
        schema: generateArraySchema(TheatreSchema),
        queries: filters,
    });

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(theatres: Theatre[]) => {
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