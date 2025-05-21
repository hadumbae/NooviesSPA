import {FC} from 'react';

import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import useMovieSubmitForm from "@/pages/movies/hooks/forms/useMovieSubmitForm.ts";
import useMovieSubmitMutation from "@/pages/movies/hooks/mutations/useMovieSubmitMutation.ts";
import MovieSubmitFormView from "@/pages/movies/components/admin/forms/MovieSubmitFormView.tsx";

interface Props {
    movie?: Movie;
    onSubmit: (movie: Movie) => void
}

const MovieSubmitFormContainer: FC<Props> = ({movie, onSubmit}) => {
    const form = useMovieSubmitForm({movie});
    const mutation = useMovieSubmitMutation({form, _id: movie?._id, onSubmit});

    const onFormSubmit = (values:any) => {
        console.log("Movie Submit Value: ", values);
        mutation.mutate(values);
    }

    return (
        <MovieSubmitFormView
            form={form}
            submitHandler={onFormSubmit}
            mutation={mutation}
        />
    );
};

export default MovieSubmitFormContainer;
