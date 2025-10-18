import {FC, ReactNode} from 'react';
import {Movie, MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {Dialog, DialogContent, DialogTrigger} from "@/common/components/ui/dialog.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";
import {Search} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {MovieCreditDetailsExceptPerson} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

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
 * - Movie title, release year, and runtime
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
    const {_id, title, releaseDate, runtime, synopsis} = movie;
    const {department, characterName, roleType: {roleName}} = credit;

    /** Formatted release year or fallback if unreleased */
    const formattedDate = releaseDate?.toFormat("yyyy") ?? "Unreleased";

    /** Display text for the person's credit, depending on department */
    const creditDisplay = department === "CREW" ? roleName : characterName;

    return (
        <Dialog>
            <DialogTrigger>{children ?? "Open"}</DialogTrigger>
            <DialogContent className="space-y-5">
                <section className="flex items-center space-x-2">
                    <h1 className="sr-only">Movie Basic Details : {title}</h1>

                    <div>
                        Poster Image
                    </div>

                    <div className="flex-grow">
                        <h2 className="font-bold text-lg">{title}</h2>
                        <span className="text-xs text-neutral-400">
                            {formattedDate} | {runtime} mins
                        </span>
                    </div>
                </section>

                <section>
                    <h1 className="sr-only">Movie Synopsis</h1>
                    <TextQuote>{synopsis}</TextQuote>
                </section>

                <section>
                    <h1 className="sr-only">Person Credit</h1>
                    <h2 className="text-yellow-500 font-bold">{personName}'s Credit</h2>
                    <p>{creditDisplay}</p>
                </section>

                <section>
                    <LoggedLink
                        to={`/admin/movies/get/${_id}`}
                        className={cn(
                            buttonVariants({variant: "default"}),
                            "w-full bg-primary"
                        )}
                    >
                        <Search size={12}/> <span>Movie</span>
                    </LoggedLink>
                </section>
            </DialogContent>
        </Dialog>
    );
};

export default PersonDetailsCreditMovieDialog;
