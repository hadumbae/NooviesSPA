import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieEditHeader from "@/pages/movies/components/headers/MovieEditHeader.tsx";
import useFetchMovieParams from "@/pages/movies/hooks/params/useFetchMovieParams.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import {useNavigate} from "react-router-dom";
import {Movie} from "@/pages/movies/schema/MovieSchema.ts";
import MovieSubmitForm from "@/pages/movies/components/MovieSubmitForm.tsx";

const MovieEditPage: FC = () => {
    const navigate = useNavigate();
    const {movieID} = useFetchMovieParams();
    const {data: movie, isPending, isError, error} = useFetchMovie({_id: movieID!});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    const onSubmit = (movie: Movie) => {
        navigate(`/admin/movies/get/${movie._id}`);
    }

    return (
        <PageFlexWrapper>
            <MovieEditHeader movie={movie} />

            <MovieSubmitForm onSubmit={onSubmit} movie={movie} />
        </PageFlexWrapper>
    );
};

export default MovieEditPage;
