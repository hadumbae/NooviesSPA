import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieCredit} from "@/domains/moviecredit/schemas/model/movie-credit-schema/MovieCredit.types.ts";

import {MovieCreditFormValues} from "@/domains/moviecredit/schemas/form/MovieCreditForm.types.ts";
import {MovieCreditFormSchema} from "@/domains/moviecredit/schemas/form/MovieCreditForm.schema.ts";
import useMovieCreditSubmitFormDefaultValues
    from "@/domains/moviecredit/hooks/forms/useMovieCreditSubmitFormDefaultValues.ts";
import {useEffect} from "react";

type SubmitParams = {
    credit?: MovieCredit;
    presetValues?: Partial<MovieCreditFormValues>;
}

export default function useMovieCreditSubmitForm(params?: SubmitParams): UseFormReturn<MovieCreditFormValues> {
    const defaultValues = useMovieCreditSubmitFormDefaultValues(params);

    const form = useForm<MovieCreditFormValues>({
        resolver: zodResolver(MovieCreditFormSchema),
        defaultValues,
    });

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues, form])

    return form;
}