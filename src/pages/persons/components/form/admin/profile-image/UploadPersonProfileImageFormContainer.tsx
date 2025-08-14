import {FC} from 'react';
import usePersonProfileImageSubmitForm from "@/pages/persons/hooks/forms/admin/usePersonProfileImageSubmitForm.ts";
import usePersonProfileImageSubmitMutation
    from "@/pages/persons/hooks/mutations/admin/usePersonProfileImageSubmitMutation.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import UploadPersonProfileImageFormView
    from "@/pages/persons/components/form/admin/profile-image/UploadPersonProfileImageFormView.tsx";
import {PersonProfileImageForm, PersonProfileImageFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";

/**
 * Props for the {@link UploadPersonProfileImageFormContainer} component.
 *
 * Extends {@link FormMutationOnSubmitParams} but overrides `onSubmitSuccess` and `onSubmitError`
 * to allow type-safe handling of `Person` results and errors.
 */
type ContainerProps = Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    /**
     * The ObjectId of the person whose profile image is being uploaded.
     */
    personID: ObjectId;

    /**
     * Callback invoked after a successful image upload.
     * @param person - The updated `Person` object returned by the server.
     */
    onSubmitSuccess?: (person: Person) => void;

    /**
     * Callback invoked if an error occurs during image upload.
     * @param error - The error object encountered.
     */
    onSubmitError?: (error: unknown) => void;
};

/**
 * Container component for submitting a new profile image for a person.
 *
 * Handles:
 * - Creating a form instance via `usePersonProfileImageSubmitForm`.
 * - Performing the submission mutation via `usePersonProfileImageSubmitMutation`.
 * - Passing form state and mutation handlers to {@link UploadPersonProfileImageFormView}.
 *
 * @param props - {@link ContainerProps}
 */
const UploadPersonProfileImageFormContainer: FC<ContainerProps> = ({personID, ...mutationProps}) => {
    const form = usePersonProfileImageSubmitForm();
    const mutation = usePersonProfileImageSubmitMutation({_id: personID, form, ...mutationProps});

    const submitImage = (values: PersonProfileImageFormValues) => {
        mutation.mutate(values as PersonProfileImageForm);
    }

    return (
        <UploadPersonProfileImageFormView
            form={form}
            submitHandler={submitImage}
            mutation={mutation}
        />
    );
};

export default UploadPersonProfileImageFormContainer;
