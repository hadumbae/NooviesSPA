import {FC} from 'react';
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import getInitials from "@/common/utility/formatters/getInitials.ts";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";
import {MovieCreditDetailsArray} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.types.ts";

/**
 * Props for the `MovieDetailsCreditOverview` component.
 */
export type OverviewProps = {
    /** The unique identifier of the movie for which to display credits. */
    movieID: ObjectId;
    /** An array of movie credit details, including character and person info. */
    credits: MovieCreditDetailsArray;
}

/**
 * Displays a compact overview of the cast for a given movie.
 *
 * @remarks
 * - Shows a "See All Credits" link that navigates to the full cast page.
 * - If no credits are available, a placeholder message is displayed.
 * - Each cast member is shown as a card with:
 *   - Avatar image or initials
 *   - Character name
 *   - Person name linking to their admin detail page
 *
 * @example
 * ```tsx
 * <MovieDetailsCreditOverview
 *   movieID="64c12f7e2b4c8e00123abcde"
 *   credits={movieCreditsArray}
 * />
 * ```
 */
const MovieDetailsCreditOverview: FC<OverviewProps> = ({movieID, credits}) => {

    /**
     * Link element linking to the full cast page.
     */
    const creditLink = (
        <LoggedLink
            to={`/admin/movies/get/${movieID}/people/cast`}
            component={MovieDetailsCreditOverview.name}
            message="Navigate to the movie's `CAST` credits page."
            className="text-neutral-400 hover:text-black"
        >
            See All Credits
        </LoggedLink>
    );

    const hasCast = credits.length > 0;

    /**
     * Rendered when the movie has no cast.
     */
    const noCastSection = (
        <section>
            <h1 className="sr-only">Movie Has No Cast</h1>
            <div className="h-40 flex flex-col justify-center items-center space-y-5">
                <span className="text-neutral-600 select-none">
                    There Are No Casts
                </span>
                {creditLink}
            </div>
        </section>
    );

    /**
     * Rendered when the movie has cast members.
     */
    const hasCastSection = (
        <section className="space-y-4">
            <h1 className="sr-only">Movie Cast Overview List</h1>

            <div className="grid grid-cols-2 gap-2">
                {credits.map((credit: MovieCreditDetails) => {
                    const {_id, characterName, person: {_id: personID, name: personName, profileImage}} = credit;

                    const initials = getInitials(personName);
                    const profileImageLink = profileImage?.secure_url;

                    return (
                        <Card key={_id}>
                            <CardContent className="p-4 flex items-center">
                                <section>
                                    <h1 className="sr-only">Person Profile Image : {personName}</h1>
                                    <Avatar>
                                        <AvatarImage src={profileImageLink} />
                                        <AvatarFallback>{initials}</AvatarFallback>
                                    </Avatar>
                                </section>

                                <section className="flex flex-col space-x-3 space-y-1">
                                    <h1 className="sr-only">Character Details: {characterName}</h1>

                                    <span className="text-lg font-bold">
                                        {characterName}
                                    </span>

                                    <LoggedAnchor
                                        target="_blank"
                                        href={`/admin/persons/get/${personID}`}
                                        className="text-sm hover:underline hover:underline-offset-4"
                                        message="Navigate to person's detail page."
                                        component={MovieDetailsCreditOverview.name}
                                    >
                                        {personName}
                                    </LoggedAnchor>
                                </section>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="flex justify-end">
                {creditLink}
            </div>
        </section>
    );

    return (
        <section className="space-y-4">
            <h1 className="text-lg font-bold">Cast Overview</h1>
            {hasCast ? hasCastSection : noCastSection}
        </section>
    );
};

export default MovieDetailsCreditOverview;
