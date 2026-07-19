/**
 * @fileoverview Card component for displaying detailed movie credit information for crew members.
 */

import {ReactElement} from 'react';
import {Card, CardContent} from "@/views/common/_comp/ui";
import {LabelContentList, TextQuote} from "@/views/common/_comp";
import {MovieCreditDetails} from "@/domains/movie-credits";
import {
    MoviePersonDetailsCardHeader
} from "@/views/admin/movie-credits/_feat/movie-person-card/MoviePersonDetailsCardHeader.tsx";


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
                <LabelContentList classNames={{list: "gap-x-5 md:gap-x-16 xl:gap-x-32"}} items={[
                    {key: "roleType", label: "Role Type", content: roleName},
                    {key: "displayAs", label: "Role Displayed As", content: creditRole},
                    {key: "creditAs", label: "Credited As", content: creditName},
                ]}/>

                {notes && <TextQuote className="text-[10px]">{notes}</TextQuote>}
            </CardContent>
        </Card>
    );
}