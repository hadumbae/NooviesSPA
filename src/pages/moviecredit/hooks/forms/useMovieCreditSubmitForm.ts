import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    MovieCreditFormValues,
    MovieCreditSubmit,
    MovieCreditSubmitSchema
} from "@/pages/moviecredit/schemas/form/MovieCreditSubmitSchema.ts";
import useMovieCreditSubmitFormDefaultValues
    from "@/pages/moviecredit/hooks/forms/useMovieCreditSubmitFormDefaultValues.ts";
import {useEffect, useRef} from "react";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

interface SubmitParams {
    credit?: MovieCredit;
    presetValues?: Partial<MovieCreditSubmit>;
}

export default function useMovieCreditSubmitForm(params?: SubmitParams): UseFormReturn<MovieCreditFormValues> {
    const {credit, presetValues} = params || {};

    const defaultValues = useMovieCreditSubmitFormDefaultValues({credit, presetValues});

    const form = useForm<MovieCreditFormValues>({
        resolver: zodResolver(MovieCreditSubmitSchema),
        defaultValues,
    });

    const skipRender = useRef<boolean>(true);

    useEffect(() => {
        if (skipRender.current) {
            skipRender.current = false;
            return;
        }

        form.reset(defaultValues);
    }, [defaultValues, form]);

    return form;
}