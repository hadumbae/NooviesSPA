import {FC} from 'react';
import useMovieCreditSubmitForm from "@/pages/moviecredit/hooks/forms/useMovieCreditSubmitForm.ts";
import {
    MovieCreditFormValues,
    MovieCreditSubmit
} from "@/pages/moviecredit/schemas/form/MovieCreditSubmitSchema.ts";
import useMovieCreditSubmitMutation from "@/pages/moviecredit/hooks/mutations/useMovieCreditSubmitMutation.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import MovieCreditFormDataContainer
    from "@/pages/movies/components/admin/credits/forms/MovieCreditFormDataContainer.tsx";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

interface ContainerProps {
    movieID: ObjectId;
    credit?: MovieCredit;
    populate?: boolean;

    presetValues?: Partial<MovieCreditSubmit>;
    onSubmit?: (credit: MovieCredit) => void;
    onFail?: (error: Error) => void;

    successToast?: string;
    errorToast?: string;
}

const MoviePersonSubmitFormContainer: FC<ContainerProps> = (params) => {
    const {
        movieID,
        presetValues,
        credit,
        onSubmit,
        onFail,
        populate = false,
        successToast,
        errorToast,
    } = params;

    const form = useMovieCreditSubmitForm({credit, presetValues: {...presetValues, movie: movieID}});
    const disableFields = ['roleType', 'movie'] as (keyof MovieCreditSubmit)[];

    const mutation = useMovieCreditSubmitMutation({onSubmit, onFail, populate, successToast, errorToast});
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

export default MoviePersonSubmitFormContainer;
