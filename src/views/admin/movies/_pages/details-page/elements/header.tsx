/**
 * @fileoverview Header component for the Movie Details view that displays metadata and administrative actions.
 */

import {Ellipsis} from "lucide-react";
import {HeaderSubtitle, HeaderTitle} from "@/views/common/_comp";
import {IconButton} from "@/views/common/_comp";

import {formatMovieData, MovieDetails} from "@/domains/movies";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp";
import {MovieDetailsDropdown} from "@/views/admin/movies/_pages/details-page/elements/dropdown.tsx";
import {MovieDetailsBreadcrumb} from "@/views/admin/movies/_pages/details-page/elements/breadcrumbs.tsx";

/** Props for the MovieDetailsHeader component. */
type HeaderProps = {
    movie: MovieDetails
}

/**
 * Primary administrative header for a movie profile displaying the poster, titles, and metadata.
 */
export function MovieDetailsHeader({movie}: HeaderProps) {
    const {title, tagline, posterImage, slug} = movie;
    const {formatted: {genreList, yearAndDuration}} = formatMovieData(movie);

    return (
        <header className="flex flex-col">
            <div className="flex justify-between items-center">
                <MovieDetailsBreadcrumb/>

                <MovieDetailsDropdown slug={slug} hasPoster={!!posterImage}>
                    <IconButton icon={Ellipsis}/>
                </MovieDetailsDropdown>
            </div>

            <div className="flex space-x-3">
                <MoviePosterImageDialog
                    url={posterImage?.secure_url}
                    alt="Poster Image"
                    className="aspect-[2/3] h-36"
                />

                <div className="flex-grow grid grid-cols-1 gap-1">
                    <div className="space-y-3 flex flex-col justify-center">
                        <HeaderTitle>{title}</HeaderTitle>
                        <HeaderSubtitle>{tagline}</HeaderSubtitle>
                    </div>

                    <div className="space-y-1 flex flex-col justify-center">
                        <h3 className="text-xs font-medium secondary-text">{yearAndDuration}</h3>
                        <h3 className="text-xs font-medium secondary-text">{genreList}</h3>
                    </div>
                </div>
            </div>
        </header>
    );
}