/**
 * @fileoverview Header component for the reservation page displaying movie metadata and navigation.
 */

import {ReactElement} from "react";
import {Redo} from "lucide-react";
import {CloudinaryImage} from "@/common/_schemas/cloudinary-image/CloudinaryImageSchema.ts";
import {IconButton} from "@/views/common/_comp";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {buildString} from "@/common/_feat/formatters/buildString.ts";
import {MoviePosterImage} from "@/views/admin/movies/_comp";
import {HeaderDescription, HeaderTitle, SROnly} from "@/views/common/_comp";

/** Props for the MyReservationPageHeader component. */
type HeaderProps = {
    movieTitle: string;
    releaseYear: string;
    genreNames: string;
    posterImage?: CloudinaryImage | null;
    isSpecialEvent?: boolean;
};

/**
 * Renders the reservation page header including the movie poster, title, and metadata.
 */
export function MyReservationPageHeader(
    {movieTitle, posterImage, releaseYear, genreNames, isSpecialEvent}: HeaderProps
): ReactElement {
    const navigate = useLoggedNavigate();

    const navigateToProfile = () => {
        navigate({
            level: "log",
            to: "/account/reservations",
            component: MyReservationPageHeader.name,
            message: "Navigate back to reservations.",
        });
    };

    const metaString = buildString(
        [releaseYear, isSpecialEvent && "Special Event", genreNames],
        " | ",
    );

    return (
        <header className="flex items-center space-x-3">
            <section>
                <SROnly text="Poster Image"/>
                <MoviePosterImage url={posterImage?.secure_url} className="h-24"/>
            </section>

            <section className="flex-1 flex flex-col gap-2">
                <SROnly text="Reservation Meta"/>
                <HeaderTitle>{movieTitle}</HeaderTitle>
                <HeaderDescription>{metaString}</HeaderDescription>
            </section>

            <section>
                <SROnly text="My Profile Button"/>
                <IconButton onClick={navigateToProfile}>
                    <Redo/>
                </IconButton>
            </section>
        </header>
    );
}
