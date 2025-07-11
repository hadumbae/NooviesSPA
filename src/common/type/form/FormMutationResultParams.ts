import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {ZodTypeAny} from "zod";

export type FormMutationOnSubmitParams<TData = unknown, TSchema extends ZodTypeAny = ZodTypeAny> = {
    validationSchema?: TSchema;
    successMessage?: string;
    onSubmitSuccess?: (data?: TData) => void;
    errorMessage?: string;
    onSubmitError?: (error?: Error) => void;
}

export type FormMutationResultParams<TData = unknown, TSchema extends ZodTypeAny = ZodTypeAny> = FormMutationOnSubmitParams<TData, TSchema>
& (| {
    isEditing: true;
    _id: ObjectId;
} | {
    isEditing?: false;
    _id?: never;
});