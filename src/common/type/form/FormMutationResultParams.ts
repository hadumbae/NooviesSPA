import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export type FormMutationOnSubmitParams<TData = any> = {
    successMessage?: string;
    onSubmitSuccess?: (data: TData) => void;
    errorMessage?: string;
    onSubmitError?: (error: Error) => void;
}

export type FormMutationResultParams<TData = any> = FormMutationOnSubmitParams<TData>
& (| {
    isEditing: true;
    _id: ObjectId;
} | {
    isEditing?: false;
    _id?: never;
});