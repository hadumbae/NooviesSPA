import {FC} from 'react';
import useMovieCreditSubmitForm from "@/pages/moviecredit/hooks/forms/useMovieCreditSubmitForm.ts";
import {
    MovieCreditFormValues,
    MovieCreditSubmit
} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitSchema.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";
import useMovieCreditSubmitMutation from "@/pages/moviecredit/hooks/mutations/useMovieCreditSubmitMutation.ts";
import MovieCreditSubmitFormView from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormView.tsx";
import useFetchMovieAndPersons from "@/pages/moviecredit/hooks/queries/useFetchMovieAndPersons.ts";
import {Loader} from "lucide-react";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface ContainerProps {
    movieID: ObjectId;
    populate?: boolean;

    presetValues?: Partial<MovieCreditSubmit>;
    onSubmit?: (credit: MovieCredit) => void;
    onFail?: (error: Error) => void;

    successToast?: string;
    errorToast?: string;
}

const MoviePersonSubmitFormContainer: FC<ContainerProps> = (params) => {
    const {movieID, presetValues, onSubmit, onFail, populate = false, successToast, errorToast} = params;

    // Form

    const form = useMovieCreditSubmitForm({presetValues: {...presetValues, movie: movieID}});
    const mutation = useMovieCreditSubmitMutation({onSubmit, onFail, populate, successToast, errorToast});
    const handleSubmit = (values: MovieCreditFormValues) => mutation.mutate(values as MovieCreditSubmit);

    // Data

    const inputQuery = useFetchMovieAndPersons({movieID, populate: false, virtuals: false});
    const {data, isPending, isError, queryError, parseError} = inputQuery;

    // Returns

    if (isPending) return <Loader className="animate-spin"/>;
    if (isError) return <ErrorMessageDisplay error={queryError!}/>;
    if (parseError) return <ErrorMessageDisplay error={parseError}/>;

    const {movie, persons} = data;
    const disableFields = ['roleType', 'movie'] as (keyof MovieCreditSubmit)[];

    return (
        <MovieCreditSubmitFormView
            form={form}
            submitHandler={handleSubmit}
            mutation={mutation}
            movies={[movie!]}
            persons={persons!}
            disableFields={disableFields}
        />
    );
};

export default MoviePersonSubmitFormContainer;
