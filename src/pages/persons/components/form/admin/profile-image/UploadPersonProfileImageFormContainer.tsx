import {FC} from 'react';
import usePersonProfileImageSubmitForm from "@/pages/persons/hooks/forms/admin/usePersonProfileImageSubmitForm.ts";
import usePersonProfileImageSubmitMutation
    from "@/pages/persons/hooks/mutations/admin/usePersonProfileImageSubmitMutation.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import UploadPersonProfileImageFormView
    from "@/pages/persons/components/form/admin/profile-image/UploadPersonProfileImageFormView.tsx";
import {PersonProfileImageForm, PersonProfileImageFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Props for `UploadPersonProfileImageFormContainer`.
 *
 * @property personID - The ID of the person whose profile image will be updated.
 * @property className - Optional CSS class to apply to the form view.
 * @property mutationProps - Optional form mutation callbacks (success, error, etc.).
 */
type ContainerProps = MutationOnSubmitParams<Person> & {
    personID: ObjectId;
    className?: string;
};

/**
 * Container component for uploading a person's profile image.
 *
 * @remarks
 * - Sets up the form using `usePersonProfileImageSubmitForm`.
 * - Connects the form to the mutation hook `usePersonProfileImageSubmitMutation`.
 * - Passes the form instance, submit handler, and mutation object to the presentational component
 *   `UploadPersonProfileImageFormView`.
 * - Handles submitting form values to the mutation for updating the person's profile image.
 *
 * @example
 * ```tsx
 * <UploadPersonProfileImageFormContainer
 *   personID={person.id}
 *   onSuccess={() => console.log("Upload successful")}
 * />
 * ```
 */
const UploadPersonProfileImageFormContainer: FC<ContainerProps> = (props) => {
    const {personID, className, ...mutationProps} = props;

    const form = usePersonProfileImageSubmitForm();
    const mutation = usePersonProfileImageSubmitMutation({_id: personID, form, ...mutationProps});

    /**
     * Handles form submission by passing the values to the mutation.
     *
     * @param values - The values submitted from the profile image form.
     */
    const submitImage = (values: PersonProfileImageFormValues) => {
        mutation.mutate(values as PersonProfileImageForm);
    }

    return (
        <UploadPersonProfileImageFormView
            form={form}
            submitHandler={submitImage}
            mutation={mutation}
            className={className}
        />
    );
};

export default UploadPersonProfileImageFormContainer;
