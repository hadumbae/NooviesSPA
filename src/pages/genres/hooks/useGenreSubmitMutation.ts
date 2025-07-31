import {useMutation, UseMutationResult} from "@tanstack/react-query";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {UseFormReturn} from "react-hook-form";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import {GenreSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {toast} from "react-toastify";
import MutationErrorHandler from "@/common/handlers/mutation/MutationFormErrorHandler.ts";
import {GenreForm} from "@/pages/genres/schema/form/GenreForm.types.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";

interface Params {
    _id?: string,
    form: UseFormReturn<GenreForm>,
    onSubmit?: (genre: Genre) => void,
}

export default function useGenreSubmitMutation(
    {_id, form, onSubmit}: Params
): UseMutationResult<Genre, Error, GenreForm> {
    const submitGenre = async (values: GenreForm) => {
        const action = _id
            ? () => GenreRepository.update({_id, data: values})
            : () => GenreRepository.create({data: values})

        const {result} = await useFetchErrorHandler({fetchQueryFn: action});
        return parseResponseData<typeof GenreSchema, Genre>({
            schema: GenreSchema,
            data: result,
        });
    }

    const onSuccess = (genre: Genre) => {
        toast.success(`Genre ${_id ? "Updated" : "Created"}`);
        onSubmit && onSubmit(genre);
    }

    const onError = MutationErrorHandler({form});

    return useMutation({
        mutationKey: ['submit_genre_data'],
        mutationFn: submitGenre,
        onSuccess,
        onError,
    })
}