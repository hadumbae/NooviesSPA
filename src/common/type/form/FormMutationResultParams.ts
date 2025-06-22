import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export type FormMutationResultParams = {
    successMessage?: string;
    onSubmitSuccess?: (seat: Seat) => void;
    errorMessage?: string;
    onSubmitError?: (error: Error) => void;
} & ( | {
    isEditing: true;
    _id: ObjectId;
} | {
    isEditing?: false;
    _id?: never;
});