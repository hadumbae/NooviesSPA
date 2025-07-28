import {UseFormReturn} from "react-hook-form";
import {PersonSubmit} from "@/pages/persons/schema/PersonSubmitSchema.ts";
import {Person, PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import mutationErrorHandler from "@/common/handlers/mutation/MutationFormErrorHandler.ts";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import handleQueryResponse from "@/common/handlers/query/handleQueryResponse.ts";

export type PersonSubmitParams = {
    form: UseFormReturn<PersonSubmit>;
    onSubmitSuccess?: (person: Person) => void;
    onSubmitError?: (error: Error) => void;
} & (| {
    isEditing: true;
    _id: ObjectId;
} | {
    isEditing?: false;
    _id?: never;
});


export default function usePersonSubmitMutation(params: PersonSubmitParams) {
    const {form, onSubmitSuccess, onSubmitError, isEditing, _id} = params;
    const submitPersonData = async (data: PersonSubmit) => {

        const repository = PersonRepository;
        const action = isEditing
            ? () => repository.update<Person>({_id, data})
            : () => repository.create<Person>({data});

        return handleQueryResponse({action: () => action()});
    }

    const onSuccess = (data: unknown) => {
        const {success, data: person} = PersonSchema.safeParse(data);

        if (!success) {
            toast.error("Invalid response. Please try again.")
        }

        const message = `Person ${isEditing ? "updated" : "created"} successfully.`;
        toast.success(message);

        onSubmitSuccess && onSubmitSuccess(person!);
    }

    const onError = mutationErrorHandler({form, onError: onSubmitError});

    return useMutation({
        mutationKey: ['single_person_submit'],
        mutationFn: submitPersonData,
        onSuccess,
        onError,
    });
}