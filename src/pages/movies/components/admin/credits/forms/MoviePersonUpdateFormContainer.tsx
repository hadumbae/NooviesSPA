import {FC} from 'react';
import useMovieCreditSubmitForm from "@/pages/moviecredit/hooks/forms/useMovieCreditSubmitForm.ts";
import {
    MovieCreditFormValues,
    MovieCreditSubmit
} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitSchema.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";
import {PopulatedMovieCredit} from "@/pages/moviecredit/schemas/model/references/MovieCreditPopulatedSchema.ts";
import useMovieCreditUpdateMutation from "@/pages/moviecredit/hooks/mutations/useMovieCreditUpdateMutation.ts";
import MovieCreditFormDataContainer
    from "@/pages/movies/components/admin/credits/forms/MovieCreditFormDataContainer.tsx";

interface ContainerProps {
    credit: PopulatedMovieCredit;
    populate?: boolean;

    onSubmit?: (credit: MovieCredit) => void;
    onFail?: (error: Error) => void;

    successToast?: string;
    errorToast?: string;
}

const MoviePersonUpdateFormContainer: FC<ContainerProps> = (params) => {
    const {credit, onSubmit, onFail, successToast, errorToast, populate = false} = params;
    const {_id, movie: {_id: movieID}, person: {_id: personID}} = credit;

    const presetValues = {movie: movieID, person: personID};

    const form = useMovieCreditSubmitForm({presetValues, credit});
    const disableFields = ['roleType', 'movie'] as (keyof MovieCreditSubmit)[];

    const mutation = useMovieCreditUpdateMutation({_id, onSubmit, onFail, populate, successToast, errorToast});
    const handleSubmit = (values: MovieCreditFormValues) => mutation.mutate(values as MovieCreditSubmit);

    const movieFilters = {_id: movieID};

    return (
        <MovieCreditFormDataContainer
            form={form}
            handleSubmit={handleSubmit}
            mutation={mutation}
            disableFields={disableFields}
            populate={false}
            virtuals={false}
            movieFilters={movieFilters}
        />
    );
};

export default MoviePersonUpdateFormContainer;
