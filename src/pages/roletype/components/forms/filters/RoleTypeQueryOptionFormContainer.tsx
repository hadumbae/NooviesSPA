import {FC} from 'react';
import useRoleTypeQueryOptionForm from "@/pages/roletype/hooks/forms/useRoleTypeQueryOptionForm.ts";
import {
    RoleTypeQueryOptions,
    RoleTypeQueryOptionsFormValues
} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import RoleTypeQueryOptionFormView from "@/pages/roletype/components/forms/filters/RoleTypeQueryOptionFormView.tsx";
import {SearchParamFormContainerProps} from "@/common/type/form/SearchParamFormProps.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {RoleTypeQueryOptionsSchema} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.schema.ts";

/**
 * Props for {@link RoleTypeQueryOptionFormContainer}.
 *
 * @property presetValues - Optional initial values to prefill the form.
 * @property disableFields - Optional array of field names to hide or disable.
 * @property className - Optional CSS classes applied to the form container.
 */
type FormProps = SearchParamFormContainerProps<RoleTypeQueryOptions>;

/**
 * **RoleTypeQueryOptionFormContainer**
 *
 * Container component for the Role Type query options form.
 *
 * Responsibilities:
 * - Initializes form state via {@link useRoleTypeQueryOptionForm}.
 * - Synchronizes form values with URL search parameters using {@link useParsedSearchParams}.
 * - Handles auto-submission by updating the search parameters when form values change.
 * - Passes form state and handlers to {@link RoleTypeQueryOptionFormView} for rendering.
 *
 * @param props - Props including `presetValues`, `disableFields`, and `className`.
 *
 * @example
 * ```tsx
 * <RoleTypeQueryOptionFormContainer
 *   presetValues={{ roleName: "Admin", department: "IT" }}
 *   disableFields={["department"]}
 *   className="max-w-md"
 * />
 * ```
 *
 * @returns JSX element rendering a controlled filter and sort form for Role Types.
 */
const RoleTypeQueryOptionFormContainer: FC<FormProps> = (props) => {
    const {presetValues, disableFields, className} = props;

    const {searchParams, setSearchParams} = useParsedSearchParams({
        schema: RoleTypeQueryOptionsSchema,
        defaultValues: presetValues,
    });

    const form = useRoleTypeQueryOptionForm({presetValues: searchParams});

    const onSubmit = (values: RoleTypeQueryOptionsFormValues) => {
        setSearchParams(values as RoleTypeQueryOptions);
    };

    return (
        <RoleTypeQueryOptionFormView
            form={form}
            submitHandler={onSubmit}
            disableFields={disableFields}
            className={className}
        />
    );
};

export default RoleTypeQueryOptionFormContainer;
