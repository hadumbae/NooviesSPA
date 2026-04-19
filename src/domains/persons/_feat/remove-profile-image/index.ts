import {RemoveProfileImageConfig} from "@/domains/persons/_feat/remove-profile-image/repositories/repository.types.ts";
import {deleteRemoveProfileImage} from "@/domains/persons/_feat/remove-profile-image/repositories/repository.ts";
import {
    usePersonProfileImageRemoveMutation
} from "@/domains/persons/_feat/remove-profile-image/mutations/usePersonProfileImageRemoveMutation.ts";
import {
    PersonRemoveProfileImageMutationKeys
} from "@/domains/persons/_feat/remove-profile-image/mutations/mutationKeys.ts";


export {
    deleteRemoveProfileImage,
    usePersonProfileImageRemoveMutation,
    PersonRemoveProfileImageMutationKeys,
}

export type {
    RemoveProfileImageConfig,
}

