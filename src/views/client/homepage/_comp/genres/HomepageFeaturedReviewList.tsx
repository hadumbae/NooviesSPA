/**
 * @fileoverview Component for displaying featured movie cards and a see-more link grouped by genre.
 */

import {ReactElement} from "react";
import {GenreSummary} from "@/domains/genres/_schema/genre/GenreSummarySchema.ts";
import {HomepageMovieCard} from "@/views/client/homepage/_comp/movies/HomepageMovieCard.tsx";
import {Link} from "react-router-dom";
import {HomepageGenreSeeMoreCard} from "@/views/client/homepage/_comp/genres/HomepageGenreSeeMoreCard.tsx";

/** Props for the HomepageFeaturedReviewList component. */
type ListProps = {
    genre: GenreSummary;
};

/** Displays a list of movie cards along with a link to view all titles in a given genre. */
export function HomepageFeaturedReviewList(
    {genre}: ListProps
): ReactElement {
    const {name, slug, movies} = genre;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="primary-text font-extrabold italic uppercase">{name}</h3>
                <Link to={`/browse/genres/${slug}`}>
                    <span className="secondary-text hover:primary-text hover:underline hover:-outline-offset-2">
                        View `{name}`
                    </span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <HomepageMovieCard key={movie._id} movie={movie} />
                ))}

                <HomepageGenreSeeMoreCard name={name} slug={slug} />
            </div>
        </div>
    );
}