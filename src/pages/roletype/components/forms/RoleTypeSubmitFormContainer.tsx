import {FC} from 'react';
import useRoleTypeSubmitForm from "@/pages/roletype/hooks/forms/useRoleTypeSubmitForm.ts";
import {FormMutationEditingParams} from "@/common/type/form/FormMutationResultParams.ts";
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {RoleTypeForm, RoleTypeFormValues} from "@/pages/roletype/schema/submit-form/RoleTypeForm.types.ts";
import useRoleTypeSubmitMutation from "@/pages/roletype/hooks/mutations/useRoleTypeSubmitMutation.ts";
import RoleTypeSubmitFormView from "@/pages/roletype/components/forms/RoleTypeSubmitFormView.tsx";

import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for the RoleTypeSubmitFormContainer component.
 *
 * Combines `FormContainerProps` with an optional `className`.
 *
 * @template TModel - Type of data returned by the mutation (RoleType).
 * @template TEntity - Optional entity type to edit (RoleType).
 * @template TFormValues - Type of the form values (RoleTypeFormValues).
 */
type SubmitFormProps = FormContainerProps<RoleType, RoleType, RoleTypeFormValues> & {
    /** Optional additional CSS classes for the container */
    className?: string;
};

/**
 * A container component for creating or editing RoleType entities.
 *
 * Responsibilities:
 * 1. Initializes the form using `useRoleTypeSubmitForm`, optionally prefilled with `presetValues` or an entity.
 * 2. Sets up the mutation using `useRoleTypeSubmitMutation`, handling creation or editing logic.
 * 3. Handles form submission, calling the mutation and resetting the form afterward.
 * 4. Delegates rendering to `RoleTypeSubmitFormView`, passing in the `form`, `submitHandler`, and mutation object.
 *
 * @param props - Props combining entity data, preset values, mutation params, editing state, disabled fields, and optional CSS classes.
 * @returns JSX element rendering the form view with proper mutation handling.
 *
 * @example
 * ```tsx
 * <RoleTypeSubmitFormContainer
 *   entity={selectedRoleType}
 *   presetValues={{ roleName: "Admin" }}
 *   isEditing={true}
 *   disableFields={['description']}
 *   className="max-w-md"
 * />
 * ```
 */
const RoleTypeSubmitFormContainer: FC<SubmitFormProps> = (props) => {
    const {entity, presetValues, isEditing, disableFields, className, ...mutationProps} = props;

    /** Initialize the form with preset values or existing entity data */
    const form = useRoleTypeSubmitForm({presetValues, roleType: entity});

    /** Prepare mutation parameters, including editing mode and form */
    const isEditingParams: FormMutationEditingParams = isEditing === true
        ? {isEditing: true, _id: entity._id}
        : {isEditing: false};

    const mutationParams = {...isEditingParams, form, ...mutationProps};

    /** Set up the mutation hook for RoleType submission */
    const mutation = useRoleTypeSubmitMutation(mutationParams);

    /**
     * Handles form submission.
     *
     * @param values - The values submitted from the form
     */
    const submitHandler = (values: RoleTypeFormValues) => {
        console.log("Role Type Submit Values: ", values);

        const {mutate} = mutation;
        mutate(values as RoleTypeForm);

        form.reset();
    };

    return (
        <RoleTypeSubmitFormView
            form={form}
            submitHandler={submitHandler}
            mutation={mutation}
            className={className}
            disableFields={disableFields}
        />
    );
};

export default RoleTypeSubmitFormContainer;