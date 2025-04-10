import {UseFormReturn} from "react-hook-form";
import {PersonSubmit} from "@/pages/persons/schema/PersonSubmitSchema.ts";
import {Person, PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import mutationErrorHandler from "@/common/handlers/mutation/MutationFormErrorHandler.ts";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";

interface IUsePersonSubmitMutation {
    _id?: string;
    form: UseFormReturn<PersonSubmit>;
    onSubmit: (person: Person) => void;
}

export default function usePersonSubmitMutation({_id, form, onSubmit}: IUsePersonSubmitMutation) {
    const submitPersonData = async (data: PersonSubmit) => {

        const repository = PersonRepository;
        const action = _id
            ? () => repository.update({_id, data})
            : () => repository.create({data});

        const {result} = await useFetchErrorHandler({fetchQueryFn: action});
        const parsed = parseResponseData<typeof PersonSchema, Person>({
            schema: PersonSchema,
            data: result,
        });

        console.log("Parsed: ", parsed);

        return parsed;
    }

    const onSuccess = (person: Person) => {
        const message = `Person ${_id ? "updated" : "created"} successfully.`;
        toast.success(message);

        onSubmit(person);
    }

    const onError = mutationErrorHandler({form});

    return useMutation({
        mutationKey: ['single_person_submit'],
        mutationFn: submitPersonData,
        onSuccess,
        onError,
    });
}