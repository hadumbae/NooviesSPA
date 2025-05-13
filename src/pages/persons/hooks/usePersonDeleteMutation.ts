import {toast} from "react-toastify";
import {ParseError} from "@/common/errors/ParseError.ts";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface IUsePersonDeleteMutationParams {
    onDelete: () => void;
}

export default function usePersonDeleteMutation({onDelete}: IUsePersonDeleteMutationParams) {
    const queryClient = useQueryClient();

    const deletePerson = async ({_id}: {_id: ObjectId}) => {
        const action = () => PersonRepository.delete({_id});
        await useFetchErrorHandler({fetchQueryFn: action});
    }

    const onSuccess = async () => {
        await queryClient.invalidateQueries({queryKey: ['fetch_single_person']});

        toast.success("Person deleted successfully.");
        onDelete();
    }

    const onError = (error: Error | ParseError) => {
        const {message = "Oops. Something went wrong. Please try again."} = error;
        toast.error(message);
    }

    return useMutation({
        mutationKey: ['delete_single_person'],
        mutationFn: deletePerson,
        onSuccess,
        onError,
    });
}