/**
 * @fileoverview A form select component that fetches and displays theatre options.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {Loader} from "lucide-react";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/common/_types/input/ReactSelectOption.ts";
import {QueryDataLoader} from "@/views/common/_feat";
import {FormSelectOnChangeHandler} from "@/common/_types";
import {HookFormInputControlProps} from "@/common/_types/input/HookFormInputProps.ts";
import {FormSelectValueHandler} from "@/common/_types/form/value";
import {generateArraySchema} from "@/common/_feat/validation-builders";

import {useFetchTheatres, Theatre, TheatreSchema, TheatreQueryOptions} from "@/domains/theatres";

/** Props for the TheatreHookFormSelect component. */
type HookProps<TSubmit extends FieldValues> = Omit<HookFormInputControlProps<TSubmit>, "control"> & {
    filters?: TheatreQueryOptions;
    onValueChange?: (theatre: Theatre | null) => void;
};

/** A controlled select input that populates its options from the theatre fetch query. */
export function TheatreHookFormSelect<TSubmit extends FieldValues>(
    {onValueChange, filters, ...rest}: HookProps<TSubmit>
): ReactElement {
    const query = useFetchTheatres({
        schema: generateArraySchema(TheatreSchema),
        queries: filters,
    });

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(theatres: Theatre[]) => {
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