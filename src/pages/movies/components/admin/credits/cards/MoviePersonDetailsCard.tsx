import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ParamError} from "@/common/errors/ParamError.ts";
import BooleanFlagLabelSpan from "@/common/components/BooleanFlagLabelSpan.tsx";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import MoviePersonDetailsCardHeader
    from "@/pages/movies/components/admin/credits/cards/MoviePersonDetailsCardHeader.tsx";
import LabelContent from "@/common/components/card-content/LabelContent.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";

interface DetailsProp {
    credit: MovieCreditDetails;
}

const MoviePersonDetailsCard: FC<DetailsProp> = ({credit}) => {
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

    if (department !== "CREW" && department !== "CAST") {
        throw new ParamError({
            fnName: MoviePersonDetailsCard.name,
            paramName: "department",
            message: "Invalid Role Type Department."
        });
    }

    const castLabels = (
        <>
            <LabelContent label="Character" orientation="horizontal">{characterName}</LabelContent>
            <LabelContent label="Billing Order" orientation="horizontal">{billingOrder ?? "None"}</LabelContent>
        </>
    );

    const baseSection = (
        <section className="space-y-2">
            <LabelContent label="Role Type" orientation="horizontal">{roleName}</LabelContent>
            <LabelContent label="Role Displayed As"
                          orientation="horizontal">{displayRoleName ?? roleName}</LabelContent>
            <LabelContent label="Credited As" orientation="horizontal">{creditedAs ?? name}</LabelContent>
            {department === "CAST" && castLabels}
        </section>
    );

    const castFlagSection = (
        <section className="grid grid-cols-2 gap-4">
            <h1 className="sr-only">Cast Boolean Flags</h1>
            <BooleanFlagLabelSpan label="Is Primary?" flag={isPrimary ?? false}/>
            <BooleanFlagLabelSpan label="Is Cameo?" flag={cameo ?? false}/>
            <BooleanFlagLabelSpan label="Is Voice Only?" flag={voiceOnly ?? false}/>
            <BooleanFlagLabelSpan label="Is Motion Capture?" flag={motionCapture ?? false}/>
            <BooleanFlagLabelSpan label="Is Uncredited?" flag={uncredited ?? false}/>
            <BooleanFlagLabelSpan label="Is Archive Footage?" flag={archiveFootage ?? false}/>
        </section>
    );

    return (
        <Card>
            <MoviePersonDetailsCardHeader department={department} credit={credit}/>

            {
                <CardContent className="space-y-5">
                    {baseSection}
                    {department === "CAST" && castFlagSection}
                    {notes && <TextQuote className="text-[10px]">{notes}</TextQuote>}
                </CardContent>
            }
        </Card>
    );
};

export default MoviePersonDetailsCard;
