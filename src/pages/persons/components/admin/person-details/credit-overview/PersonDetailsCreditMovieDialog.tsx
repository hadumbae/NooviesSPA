import {FC, ReactNode} from 'react';
import {Movie, MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {Dialog, DialogContent, DialogTrigger} from "@/common/components/ui/dialog.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {Search} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {MovieCreditDetailsExceptPerson} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import MoviePosterImage from "@/pages/movies/components/MoviePosterImage.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

type MovieDialogProps = {
    /** The trigger content to open the dialog, e.g., an icon or button. */
    children: ReactNode;

    /** Full name of the person whose credit is being displayed. */
    personName: string;

    /** The movie or movie details associated with this credit. */
    movie: Movie | MovieDetails;

    /** The specific credit of the person in the movie. */
    credit: MovieCreditDetailsExceptPerson;
}

/**
 * Displays a dialog showing detailed information about a person's credit in a movie.
 *
 * Features included in the dialog:
 * - Movie title, release year, poster, and runtime
 * - Movie synopsis
 * - Person's credit display (character name for CAST, role name for CREW)
 * - Link to the full movie page
 *
 * The dialog is triggered via the `children` element and uses `Dialog` from the shared UI library.
 *
 * @example
 * <PersonDetailsCreditMovieDialog
 *   personName="John Doe"
 *   movie={movieData}
 *   credit={creditData}
 * >
 *   <InfoIcon />
 * </PersonDetailsCreditMovieDialog>
 */
const PersonDetailsCreditMovieDialog: FC<MovieDialogProps> = ({children, personName, movie, credit}) => {
    const {_id, title, originalTitle, releaseDate, runtime, synopsis, posterImage} = movie;
    const {department, characterName, roleType: {roleName}} = credit;

    /** Formatted release year or fallback if unreleased */
    const formattedDate = releaseDate?.toFormat("yyyy") ?? "Unreleased";

    /** Display text for the person's credit, depending on department */
    const creditDisplay = department === "CREW" ? roleName : characterName;

    const notOriginalTitle = title !== originalTitle;

    return (
        <Dialog>
            <DialogTrigger>{children ?? "Open"}</DialogTrigger>
            <DialogContent className="space-y-5">

                {/* Basic Movie Details */}

                <section className="flex items-center space-x-2">
                    <SectionHeader srOnly={true}>Movie Basic Details : {title}</SectionHeader>

                    {/* Poster */}

                    <div>
                        <MoviePosterImage src={posterImage?.secure_url}/>
                    </div>

                    {/* Title, Runtime, Release Date */}

                    <div className="flex-grow flex flex-col space-y-1">
                        <h2 className="font-bold text-lg">{title}</h2>
                        {notOriginalTitle && <span className="text-sm text-neutral-400">{originalTitle}</span>}
                        <span className="text-xs text-neutral-400">{formattedDate} | {runtime} mins</span>
                    </div>
                </section>

                {/* Movie Synopsis */}

                <section>
                    <SectionHeader srOnly={true}>Movie Synopsis</SectionHeader>

                    <TextQuote>{synopsis}</TextQuote>
                </section>

                {/* Movie Credit */}

                <section>
                    <SectionHeader srOnly={true}>Person Credit</SectionHeader>

                    <h2 className="text-yellow-500 font-bold">{personName}'s Credit</h2>
                    <p>{creditDisplay}</p>
                </section>

                {/* Link To Movie */}

                <div>
                    <LoggedHoverLink
                        to={`/admin/movies/get/${_id}`}
                        className={cn(
                            buttonVariants({variant: "default"}),
                            "w-full bg-primary"
                        )}
                    >
                        <Search size={12}/> <span>Movie</span>
                    </LoggedHoverLink>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PersonDetailsCreditMovieDialog;
