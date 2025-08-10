import {FC} from 'react';
import usePersonProfileImageSubmitForm from "@/pages/persons/hooks/forms/admin/usePersonProfileImageSubmitForm.ts";
import usePersonProfileImageSubmitMutation
    from "@/pages/persons/hooks/mutations/admin/usePersonProfileImageSubmitMutation.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import UploadPersonProfileImageFormView
    from "@/pages/persons/components/form/admin/profile-image/UploadPersonProfileImageFormView.tsx";
import {PersonProfileImageForm} from "@/pages/persons/schema/forms/PersonForm.types.ts";

interface ContainerProps {
    personID: ObjectId;
    onSubmitSuccess?: (data: unknown) => void;
    successToast?: string;
    onSubmitFailure?: (error: Error) => void;
    failureToast?: string;
}

const UploadPersonProfileImageFormContainer: FC<ContainerProps> = ({personID}) => {
    const form = usePersonProfileImageSubmitForm();
    const mutation = usePersonProfileImageSubmitMutation({_id: personID});

    const submitImage = (values: PersonProfileImageForm) => {
        mutation.mutate(values);
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
