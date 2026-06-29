/**
 * @fileoverview Dialog component for displaying detailed movie credit information for a specific person.
 */

import {ReactElement, ReactNode} from 'react';
import {buttonVariants, Dialog, DialogContent, DialogTrigger} from "@/common/components/ui";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {Search} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {Movie, MovieDetails} from "@/domains/movies/_schema/movie";
import {PersonCredit} from "@/domains/movie-credits";

/** Props for the PersonDetailsCreditMovieDialog component. */
type MovieDialogProps = {
    children: ReactNode;
    personName: string;
    movie: Movie | MovieDetails;
    credit: PersonCredit;
}

/**
 * Displays a dialog containing movie metadata and specific credit details for a person.
 */
export function PersonDetailsCreditMovieDialog(
    {children, personName, movie, credit}: MovieDialogProps
): ReactElement {
    const {title, originalTitle, releaseDate, runtime, synopsis, posterImage, slug} = movie;
    const {department, characterName, roleType: {roleName}} = credit;

    const formattedDate = releaseDate?.toFormat("yyyy") ?? "Unreleased";
    const creditDisplay = department === "CREW" ? roleName : characterName;
    const notOriginalTitle = title !== originalTitle;

    return (
        <Dialog>
            <DialogTrigger>{children ?? "Open"}</DialogTrigger>
            <DialogContent className="space-y-5">

                <section className="flex items-center space-x-2">
                    <SROnly text={`Movie Basic Details : ${title}`}/>

                    <MoviePosterImage url={posterImage?.secure_url} className="h-36 aspect-[2/3]"/>

                    <div className="flex-grow flex flex-col space-y-1">
                        <h2 className="primary-text font-bold text-lg">
                            {title}
                            <SROnly text={`Movie Basic Details : ${title}`}/>
                        </h2>

                        {notOriginalTitle && <span className="text-sm text-neutral-400">{originalTitle}</span>}
                        <span className="text-xs text-neutral-400">{formattedDate} | {runtime} mins</span>
                    </div>
                </section>

                <section>
                    <SROnly text="Movie Synopsis"/>
                    <TextQuote>{synopsis}</TextQuote>
                </section>

                <section>
                    <h2 className="text-yellow-500 font-bold">{personName}'s Credit</h2>
                    <p className="secondary-text">{creditDisplay}</p>
                </section>

                <LoggedHoverLink
                    to={`/admin/movies/get/${slug}`}
                    className={cn(buttonVariants({variant: "primary"}), "w-full")}
                >
                    <Search size={12}/> <span>Movie</span>
                </LoggedHoverLink>
            </DialogContent>
        </Dialog>
    );
}
