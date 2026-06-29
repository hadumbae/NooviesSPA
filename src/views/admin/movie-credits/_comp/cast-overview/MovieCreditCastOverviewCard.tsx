/**
 * @fileoverview Card component for displaying cast-specific movie credit details.
 */

import {ReactElement} from "react";
import getInitials from "@/common/utility/formatters/getInitials.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";
import {MovieCreditDetails} from "@/domains/movie-credits/_schemas";
import {SROnly} from "@/views/common/_comp/screen-readers";

/** Props for the MovieCreditOverviewCard component. */
type CardProps = {
    credit: Extract<MovieCreditDetails, { department: "CAST" }>;
};

/** Card component that displays character names and person details for cast members. */
export function MovieCreditCastOverviewCard(
    {credit: {_id, characterName, person: {name: personName, slug: personSlug, profileImage}}}: CardProps
): ReactElement {
    const initials = getInitials(personName);
    const profileImageLink = profileImage?.secure_url;

    return (
        <Card key={_id}>
            <CardContent className="p-4 flex items-center">
                <section>
                    <SROnly text={`Person Profile Image: ${personName}`}/>

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
                        className="text-sm hover-underline"
                        message="Navigate to person's detail page."
                    >
                        {personName}
                    </LoggedAnchor>
                </section>
            </CardContent>
        </Card>
    );
}