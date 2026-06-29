/**
 * @fileoverview Card component for displaying detailed movie credit information for cast members.
 */

import {ReactElement} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import BooleanFlagLabelSpan from "@/common/components/BooleanFlagLabelSpan.tsx";
import {
    MoviePersonDetailsCardHeader
} from "@/views/admin/movie-credits/_feat/movie-person-card/MoviePersonDetailsCardHeader.tsx";
import LabelContent from "@/common/components/card-content/LabelContent.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";

import {MovieCreditDetails} from "@/domains/movie-credits/_schemas/model/MovieCreditDetailsSchema.ts";

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

    return (
        <Card>
            <MoviePersonDetailsCardHeader department={department} credit={credit}/>

            <CardContent className="space-y-5">
                <section className="space-y-2">
                    <LabelContent label="Role Type" orientation="horizontal">{roleName}</LabelContent>
                    <LabelContent label="Role Displayed As" orientation="horizontal">{creditRole}</LabelContent>
                    <LabelContent label="Credited As" orientation="horizontal">{creditName}</LabelContent>
                    <LabelContent label="Character" orientation="horizontal">{characterName}</LabelContent>
                    <LabelContent label="Billing Order" orientation="horizontal">{billingOrder ?? "None"}</LabelContent>
                </section>

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