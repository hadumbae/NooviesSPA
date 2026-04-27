/** @fileoverview Card component for displaying cast-specific movie credit details. */

import {ReactElement} from "react";
import getInitials from "@/common/utility/formatters/getInitials.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";
import {MovieCreditDetails} from "@/domains/moviecredit/schemas";

/** Props for the MovieCreditOverviewCard component. */
type CardProps = {
    credit: Extract<MovieCreditDetails, { department: "CAST" }>;
};

/** Renders a card displaying character names and person details for cast members. */
export function MovieCreditCastOverviewCard(
    {credit}: CardProps
): ReactElement {
    const {
        _id,
        characterName,
        person: {name: personName, slug: personSlug, profileImage},
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
                    >
                        {personName}
                    </LoggedAnchor>
                </section>
            </CardContent>
        </Card>
    );
}