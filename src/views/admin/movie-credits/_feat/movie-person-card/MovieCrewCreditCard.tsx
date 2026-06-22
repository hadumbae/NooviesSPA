/**
 * @fileoverview Card component for displaying detailed movie credit information for crew members.
 */

import {ReactElement} from 'react';
import {Card, CardContent} from "@/common/components/ui";
import LabelContent from "@/common/components/card-content/LabelContent.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import {
    MoviePersonDetailsCardHeader
} from "@/views/admin/movie-credits/_feat/movie-person-card/MoviePersonDetailsCardHeader.tsx";

import {MovieCreditDetails} from "@/domains/moviecredit";

/** Props for the MoviePersonDetailsCard component. */
type DetailsProp = {
    credit: Extract<MovieCreditDetails, { department: "CREW" }>;
}

/**
 * Renders a detailed breakdown of a movie crew credit including role information and notes.
 */
export function MovieCrewCreditCard(
    {credit}: DetailsProp
): ReactElement {
    const {person: {name}, roleType: {roleName}, displayRoleName, creditedAs, notes, department} = credit;

    const creditRole = displayRoleName ?? roleName;
    const creditName = creditedAs ?? name;

    return (
        <Card>
            <MoviePersonDetailsCardHeader department={department} credit={credit}/>

            <CardContent className="space-y-5">
                <section className="space-y-2">
                    <LabelContent label="Role Type" orientation="horizontal">{roleName}</LabelContent>
                    <LabelContent label="Role Displayed As" orientation="horizontal">{creditRole}</LabelContent>
                    <LabelContent label="Credited As" orientation="horizontal">{creditName}</LabelContent>
                </section>

                {notes && <TextQuote className="text-[10px]">{notes}</TextQuote>}
            </CardContent>
        </Card>
    );
}