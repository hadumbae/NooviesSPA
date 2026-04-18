import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieCredit} from "@/domains/moviecredit/schemas/model/movie-credit-schema/MovieCredit.types.ts";

import {MovieCreditFormValues} from "@/domains/moviecredit/_feat/submit-data/MovieCreditForm.types.ts";
import {MovieCreditFormSchema} from "@/domains/moviecredit/_feat/submit-data/MovieCreditForm.schema.ts";
import useMovieCreditSubmitFormDefaultValues
    from "@/domains/moviecredit/_feat/submit-data/useMovieCreditSubmitFormDefaultValues.ts";
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