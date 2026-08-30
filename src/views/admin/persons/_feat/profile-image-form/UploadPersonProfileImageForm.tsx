/**
 * @fileoverview Form component and hook exports for uploading a person's profile image.
 */

import {createForm} from "@/common/_feat";
import {
    ProfileImageSubmitConfig,
    usePersonProfileImageSubmitMutation
} from "@/domains/persons/_feat/submit-profile-image/mutations";
import {
    PersonProfileImageFormData,
    PersonProfileImageFormSchema,
    PersonProfileImageFormValues,
} from "@/domains/persons/_feat/submit-profile-image/form";

const {SubmitForm, useSubmitForm} = createForm<
    PersonProfileImageFormValues,
    PersonProfileImageFormData,
    unknown,
    void,
    ProfileImageSubmitConfig
>({
    formName: "upload-person-profile-image-form",
    schema: PersonProfileImageFormSchema,
    mutation: usePersonProfileImageSubmitMutation,
    defaultValues: {
        profileImage: "",
    },
});

export {
    /** Form component for uploading a person's profile image. */
        SubmitForm as UploadPersonProfileImageForm,
    /** Hook for managing person profile image upload form state. */
        useSubmitForm as useUploadPersonProfileImageForm,
}