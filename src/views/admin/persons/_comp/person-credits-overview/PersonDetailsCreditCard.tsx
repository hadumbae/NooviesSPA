/**
 * @fileoverview Card component displaying a person's credit details for a specific movie.
 */

import {ReactElement} from "react";
import {PersonCredit} from "@/domains/movie-credits";
import {Card, CardContent} from "@/common/components/ui";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {Info} from "lucide-react";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink";
import {
    PersonDetailsCreditMovieDialog
} from "@/views/admin/persons/_comp/person-credits-overview/PersonDetailsCreditMovieDialog.tsx";

/** Props for the PersonDetailsCreditCard component. */
type CardProps = {
    personName: string;
    credit: PersonCredit;
};

/** Displays a summary of a movie credit including poster, title, role, and release year. */
export function PersonDetailsCreditCard(
    {credit, personName}: CardProps
): ReactElement {
    const {_id, movie, department} = credit;
    const {title: movieTitle, releaseDate, posterImage, slug: movieSlug} = movie;

    const releaseYear = releaseDate?.toFormat("yyyy") ?? "Unreleased";

    const roleDisplay = department === "CAST"
        ? credit.characterName
        : credit.roleType.roleName;

    return (
        <Card key={_id}>
            <CardContent className="flex items-center p-0">
                <MoviePosterImageDialog className="h-36 rounded-r-none" url={posterImage?.secure_url}/>

                <div className="flex-1 flex items-center space-x-2 py-3 px-5">
                    <div className="flex-1 space-y-2">
                        <LoggedLink to={`/admin/movies/get/${movieSlug}`}>
                            <h3 className="font-medium truncate hover:underline underline-offset-4">
                                {movieTitle}
                            </h3>
                        </LoggedLink>
                        <span className="text-sm text-neutral-400 font-bold truncate">
                            {roleDisplay}
                        </span>
                    </div>

                    <div className="flex space-x-2 items-center justify-end">
                        <span className="secondary-text text-xs font-extrabold select-none">
                            {releaseYear}
                        </span>

                        <PersonDetailsCreditMovieDialog
                            personName={personName}
                            credit={credit}
                            movie={movie}
                        >
                            <Info className="text-blue-200 hover:text-blue-500 cursor-pointer"/>
                        </PersonDetailsCreditMovieDialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}