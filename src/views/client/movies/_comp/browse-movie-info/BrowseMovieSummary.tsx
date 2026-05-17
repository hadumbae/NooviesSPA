import {ReactElement} from "react";
import {MovieDetails} from "@/domains/movies/schema/movie";
import {cn} from "@/common/lib/utils.ts";
import {MovieMetaGenreBadges} from "@/views/admin/movies/_comp/movie-details";
import {BrowseMovieMeta} from "@/views/client/movies/_comp/browse-movie-info/BrowseMovieMeta.tsx";

type SummaryProps = {
    movie: MovieDetails;
    className?: string;
};

export function BrowseMovieSummary(
    {movie, className}: SummaryProps
): ReactElement {
    return (
        <div className={cn("space-y-2", className)}>
            <BrowseMovieMeta movie={movie}/>
            <MovieMetaGenreBadges genres={movie.genres} />
        </div>
    );
}