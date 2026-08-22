/**
 * @fileoverview Form select input component for choosing a role type.
 */

import {ReactElement} from "react";
import {HookFormInputControlProps, ReactSelectOption, RequestOptions} from "@/common/_types";
import {generateArraySchema} from "@/common/_feat";
import {QueryDataLoader} from "@/views/common/_feat";
import {AnimatedLoader, HookFormSelect} from "@/views/common/_comp";
import {FieldValues} from "react-hook-form";
import {RoleType, RoleTypeQueryFilters, RoleTypeSchema, useFetchRoleTypes} from "@/domains/roletypes";

type SelectProps<TFormValues extends FieldValues> = Omit<HookFormInputControlProps<TFormValues>, "control"> & {
    filters?: Partial<RoleTypeQueryFilters>;
    config?: RequestOptions;
};

/**
 * Form select component for picking a role type from fetched options.
 */
export function RoleTypeFormSelect<TFormValues extends FieldValues>(
    {filters, config, ...inputProps}: SelectProps<TFormValues>
): ReactElement {
    const query = useFetchRoleTypes({
        schema: generateArraySchema(RoleTypeSchema),
        queries: filters,
        config,
    });

    return (
        <QueryDataLoader query={query} loaderComponent={AnimatedLoader}>
            {(roleTypes: RoleType[]) => {
                const options = roleTypes.map((p): ReactSelectOption => ({value: p._id, label: p.roleName}));

                return (
                    <HookFormSelect
                        {...inputProps}
                        options={options}
                    />
                )
            }}
        </QueryDataLoader>
    );
}