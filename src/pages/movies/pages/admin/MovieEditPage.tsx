import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieEditHeader from "@/pages/movies/components/headers/MovieEditHeader.tsx";
import useFetchMovieParams from "@/pages/movies/hooks/params/useFetchMovieParams.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {useNavigate} from "react-router-dom";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import MovieSubmitFormContainer from "@/pages/movies/components/admin/forms/MovieSubmitFormContainer.tsx";
import MovieEditBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MovieEditBreadcrumb.tsx";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";

const MovieEditPage: FC = () => {
    const navigate = useNavigate();
    const movieParams = useFetchMovieParams();
    if (!movieParams) return <PageLoader />;

    const {movieID} = movieParams;
    const {data, isPending, isError, error} = useFetchMovie({_id: movieID});
    const {success, data: movie, error: parseError} = useValidateData({isPending, data, schema: MovieSchema});

    if (isPending) return <PageLoader />;
    if (isError) return <PageHTTPError error={error} />;
    if (!success) return <PageParseError error={parseError} />;

    const onSubmit = (movie: Movie) => {
        navigate(`/admin/movies/get/${movie._id}`);
    }

    return (
        <PageFlexWrapper>
            <MovieEditBreadcrumb movie={movie} />

            <MovieEditHeader movie={movie} />

            <MovieSubmitFormContainer onSubmit={onSubmit} movie={movie} />
        </PageFlexWrapper>
    );
};

export default MovieEditPage;
