import {FieldValues, UseFormReturn} from "react-hook-form";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import {ZodType} from "zod";

import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import mutationErrorHandler from "@/common/handlers/mutation/MutationFormErrorHandler.ts";
import {IRequestRepository} from "@/common/repositories/request-repository/IRequestRepository.ts";

interface Params<TData, TSchema extends ZodType, TSubmit extends FieldValues> {
    _id?: string,
    repository: IRequestRepository,

    entityName: string,
    mutationKey: unknown[],

    form: UseFormReturn<TSubmit>,
    schema: TSchema,
    onSubmit?: (data: TData) => void,
}

export default function mutationFormSubmitHandler<TData, TSchema extends ZodType, TSubmit extends FieldValues>(
    {
        _id, repository,
        entityName, mutationKey,
        form,  schema, onSubmit,
    } : Params<TData, TSchema, TSubmit>
) {
    const submitData = async (values: TSubmit) => {
        const action = _id
            ? () => repository.update({_id, data: values})
            : () => repository.create({data: values})

        const {result} = await useFetchErrorHandler({fetchQueryFn: action});
        return parseResponseData<TSchema, TData>({schema, data: result});
    }

    const onSuccess = (data: TData) => {
        toast.success(`${entityName} ${_id ? "Updated" : "Created"}`);
        onSubmit && onSubmit(data);
    }

    const onError = mutationErrorHandler({form});

    return useMutation({mutationFn: submitData, mutationKey, onSuccess, onError});
}