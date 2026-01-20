/**
 * @file MovieDetailsCreditOverview.tsx
 *
 * @summary
 * Displays a compact, card-based overview of a movie’s cast.
 *
 * @description
 * Renders a summarized cast section for a movie, intended for detail or admin
 * pages where a full credit list would be excessive.
 *
 * Behavior:
 * - Shows a grid of cast member cards when credits exist
 * - Displays a placeholder state when no cast is available
 * - Provides a persistent “See All Credits” navigation link
 *
 * Each cast card includes:
 * - Avatar image (with initials fallback)
 * - Character name
 * - Person name linking to the admin person detail page
 *
 * All navigation interactions are logged via `LoggedHoverLink` and
 * `LoggedAnchor` for audit and analytics purposes.
 */

import {FC} from 'react';
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import getInitials from "@/common/utility/formatters/getInitials.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";
import {MovieCreditDetailsArray} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

/**
 * Props for {@link MovieDetailsCreditOverview}.
 */
export type OverviewProps = {
    /**
     * Unique identifier (slug) of the movie.
     * Used for constructing navigation routes.
     */
    slug: ObjectId;

    /**
     * Array of movie cast credit records.
     */
    credits: MovieCreditDetailsArray;
};

/**
 * Compact cast overview component for a movie.
 *
 * @param props - Component props
 * @returns Rendered cast overview section
 *
 * @example
 * ```tsx
 * <MovieDetailsCreditOverview
 *   slug={movie.slug}
 *   credits={credits}
 * />
 * ```
 */
const MovieDetailsCreditOverview: FC<OverviewProps> = ({slug, credits}) => {
    /**
     * Shared navigation link to the full cast page.
     */
    const creditLink = (
        <LoggedHoverLink
            to={`/admin/movies/get/${slug}/people/cast`}
            component={MovieDetailsCreditOverview.name}
            message="Navigate to the movie's CAST credits page."
            className="text-neutral-400 hover:text-black"
        >
            See All Credits
        </LoggedHoverLink>
    );

    const hasCast = credits.length > 0;

    /**
     * Rendered when no cast credits exist.
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
     * Rendered when cast credits are available.
     */
    const hasCastSection = (
        <section className="space-y-4">
            <SectionHeader srOnly>
                Movie Cast Overview List
            </SectionHeader>

            <div className="grid grid-cols-2 gap-2">
                {credits.map((credit: MovieCreditDetails) => {
                    const {
                        _id,
                        characterName,
                        person: {
                            name: personName,
                            slug: personSlug,
                            profileImage,
                        },
                    } = credit;

                    const initials = getInitials(personName);
                    const profileImageLink = profileImage?.secure_url;

                    return (
                        <Card key={_id}>
                            <CardContent className="p-4 flex items-center">
                                <section>
                                    <h1 className="sr-only">
                                        Person Profile Image: {personName}
                                    </h1>
                                    <Avatar>
                                        <AvatarImage src={profileImageLink}/>
                                        <AvatarFallback>{initials}</AvatarFallback>
                                    </Avatar>
                                </section>

                                <section className="flex flex-col space-x-3 space-y-1">
                                    <h1 className="sr-only">
                                        Character Details: {characterName}
                                    </h1>

                                    <span className="text-lg font-bold">
                                        {characterName}
                                    </span>

                                    <LoggedAnchor
                                        target="_blank"
                                        href={`/admin/persons/get/${personSlug}`}
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
            <SectionHeader>Cast Overview</SectionHeader>
            {hasCast ? hasCastSection : noCastSection}
        </section>
    );
};

export default MovieDetailsCreditOverview;
