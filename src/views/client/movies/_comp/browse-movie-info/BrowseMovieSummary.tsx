import {ReactElement} from "react";
import {MovieDetails} from "@/domains/movies/schema/movie";
import {cn} from "@/common/lib/utils.ts";
import {MovieMetaGenreBadges, MovieMetaRow} from "@/views/admin/movies/_comp/movie-details";

type SummaryProps = {
    movie: MovieDetails;
    className?: string;
};

export function BrowseMovieSummary(
    {movie, className}: SummaryProps
): ReactElement {
    return (
        <div className={cn("space-y-2", className)}>
            <MovieMetaRow movie={movie}/>
            <MovieMetaGenreBadges genres={movie.genres} />
        </div>
    );
}