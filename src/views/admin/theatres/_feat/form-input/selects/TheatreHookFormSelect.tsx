/**
 * @fileoverview A form select component that fetches and displays theatre options.
 */

import {FieldValues} from "react-hook-form";
import {Loader} from "lucide-react";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {useFetchTheatres} from "@/domains/theatres/_feat/crud-hooks";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {TheatreArray, TheatreArraySchema} from "@/domains/theatres/schema/theatre/TheatreArraySchema.ts";
import {TheatreQueryOptions} from "@/domains/theatres/_feat/handle-query-options/TheatreQueryOptionSchema.ts";
import {ReactElement} from "react";
import {Theatre} from "@/domains/theatres/schema/theatre";
import {FormSelectOnChangeHandler} from "@/common/types";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {FormSelectValueHandler} from "@/common/types/form/value";

/** Props for the TheatreHookFormSelect component. */
type HookProps<TSubmit extends FieldValues> = HookFormInputControlProps<TSubmit> & {
    filters?: TheatreQueryOptions;
    onValueChange?: (theatre: Theatre | null) => void;
};

/** A controlled select input that populates its options from the theatre fetch query. */
export function TheatreHookFormSelect<TSubmit extends FieldValues>(
    {onValueChange, filters, ...rest}: HookProps<TSubmit>
): ReactElement {
    const query = useFetchTheatres({
        schema: TheatreArraySchema,
        queries: filters,
    });

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(theatres: TheatreArray) => {
                const options: ReactSelectOption<Theatre>[] = theatres.map(
                    (theatre): ReactSelectOption<Theatre> => ({label: theatre.name, value: theatre}),
                );

                const handleOnChange: FormSelectOnChangeHandler<TSubmit, Theatre> = (val, field) => {
                    field.onChange(val?.value._id);
                    onValueChange?.(val?.value ?? null);
                };

                const handleValue: FormSelectValueHandler<TSubmit, Theatre> = (options, field) => {
                    return options.find(o => o.value._id === field.value) ?? null;
                };


                return (
                    <HookFormSelect<TSubmit, Theatre>
                        {...rest}
                        handleOnChange={handleOnChange}
                        handleValue={handleValue}
                        options={options}
                    />
                );
            }}
        </QueryDataLoader>
    );
}