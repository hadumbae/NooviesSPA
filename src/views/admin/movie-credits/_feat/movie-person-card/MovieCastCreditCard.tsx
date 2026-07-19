/**
 * @fileoverview Card component for displaying detailed movie credit information for cast members.
 */

import {ReactElement} from 'react';
import {Card, CardContent} from "@/common/components/ui";
import {MovieCreditDetails} from "@/domains/movie-credits";
import {BooleanFlagLabelSpan, LabelContentItem, LabelContentList, TextQuote} from "@/views/common/_comp";
import {
    MoviePersonDetailsCardHeader
} from "@/views/admin/movie-credits/_feat/movie-person-card/MoviePersonDetailsCardHeader.tsx";


/** Props for the MovieCastCreditCard component. */
type DetailsProp = {
    credit: Extract<MovieCreditDetails, { department: "CAST" }>;
}

/** Renders a detailed breakdown of a movie cast credit including role information and cast flags. */
export function MovieCastCreditCard(
    {credit}: DetailsProp
): ReactElement {
    const {
        person: {name},
        roleType: {roleName},
        displayRoleName,
        creditedAs,
        notes,
        billingOrder,
        characterName,
        isPrimary,
        archiveFootage,
        cameo,
        voiceOnly,
        motionCapture,
        uncredited,
        department,
    } = credit;

    const creditRole = displayRoleName ?? roleName;
    const creditName = creditedAs ?? name;

    const labelList: LabelContentItem[] = [
        {key: "roleType", label: "Role Type", content: roleName},
        {key: "displayAs", label: "Role Displayed As", content: creditRole},
        {key: "creditAs", label: "Credited As", content: creditName},
        {key: "character", label: "Character", content: characterName},
        {key: "billingOrder", label: "Billing Order", content: billingOrder?.toString() ?? "None"},
    ];

    return (
        <Card>
            <MoviePersonDetailsCardHeader department={department} credit={credit}/>

            <CardContent className="space-y-5">
                <LabelContentList items={labelList} classNames={{list: "gap-x-5 md:gap-x-16 xl:gap-x-32"}}/>

                <section className="grid grid-cols-2 gap-4">
                    <h1 className="sr-only">Cast Boolean Flags</h1>
                    <BooleanFlagLabelSpan label="Is Primary?" flag={isPrimary}/>
                    <BooleanFlagLabelSpan label="Is Cameo?" flag={cameo}/>
                    <BooleanFlagLabelSpan label="Is Voice Only?" flag={voiceOnly}/>
                    <BooleanFlagLabelSpan label="Is Motion Capture?" flag={motionCapture}/>
                    <BooleanFlagLabelSpan label="Is Uncredited?" flag={uncredited ?? false}/>
                    <BooleanFlagLabelSpan label="Is Archive Footage?" flag={archiveFootage}/>
                </section>

                {notes && <TextQuote className="text-[10px]">{notes}</TextQuote>}
            </CardContent>
        </Card>
    );
}