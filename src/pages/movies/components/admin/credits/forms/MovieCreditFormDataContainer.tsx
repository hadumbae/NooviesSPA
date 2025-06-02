import {FC} from 'react';
import {
    MovieCreditFormValues,
    MovieCreditSubmit
} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitSchema.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";
import MovieCreditSubmitFormView from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormView.tsx";
import {Loader} from "lucide-react";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import useFetchMoviesAndPersons from "@/pages/moviecredit/hooks/queries/useFetchMoviesAndPersons.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";

interface ContainerProps {
    form: UseFormReturn<MovieCreditFormValues>;
    handleSubmit: SubmitHandler<MovieCreditFormValues>;
    mutation: UseMutationResult<MovieCredit, Error, MovieCreditSubmit>;
    disableFields?: (keyof MovieCreditSubmit)[],
    populate?: boolean;
    virtuals?: boolean;
    personFilters?: QueryFilters;
    movieFilters?: QueryFilters;
}

const MovieCreditFormDataContainer: FC<ContainerProps> = (params) => {
    const {
        form,
        handleSubmit,
        mutation,
        disableFields = [],
        populate = false,
        virtuals = false,
        movieFilters = {},
        personFilters = {},
    } = params;

    const inputQuery = useFetchMoviesAndPersons({populate, virtuals, movieFilters, personFilters});
    const {data, isPending, isError, queryError, parseError} = inputQuery;

    if (isPending) return <Loader className="animate-spin"/>;
    if (isError) return <ErrorMessageDisplay error={queryError!}/>;
    if (parseError) return <ErrorMessageDisplay error={parseError}/>;

    const {movies, persons} = data;

    return (
        <MovieCreditSubmitFormView
            form={form}
            submitHandler={handleSubmit}
            mutation={mutation}
            movies={movies!}
            persons={persons!}
            disableFields={disableFields}
        />
    );
};

export default MovieCreditFormDataContainer;
