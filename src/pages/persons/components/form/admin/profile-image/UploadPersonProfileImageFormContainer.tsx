import {FC} from 'react';
import usePersonProfileImageSubmitForm from "@/pages/persons/hooks/forms/admin/usePersonProfileImageSubmitForm.ts";
import usePersonProfileImageSubmitMutation
    from "@/pages/persons/hooks/mutations/admin/usePersonProfileImageSubmitMutation.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {PersonProfileImageSubmitObject} from "@/pages/persons/schema/admin/PersonProfileImageSubmitSchema.ts";
import UploadPersonProfileImageFormView
    from "@/pages/persons/components/form/admin/profile-image/UploadPersonProfileImageFormView.tsx";

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

    const submitImage = (values: PersonProfileImageSubmitObject) => {
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
