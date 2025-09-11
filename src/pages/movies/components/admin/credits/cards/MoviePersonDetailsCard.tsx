import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ParamError} from "@/common/errors/ParamError.ts";
import BooleanFlagLabelSpan from "@/common/components/BooleanFlagLabelSpan.tsx";
import MoviePersonDetailsCardCastHeader
    from "@/pages/movies/components/admin/credits/cards/MoviePersonDetailsCardCastHeader.tsx";
import MoviePersonDetailsCardCrewHeader
    from "@/pages/movies/components/admin/credits/cards/MoviePersonDetailsCardCrewHeader.tsx";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

interface DetailsProp {
    credit: MovieCreditDetails;
}

const MoviePersonDetailsCard: FC<DetailsProp> = ({credit}) => {
    const {notes, cameo, voiceOnly, motionCapture, uncredited, department} = credit;

    if (department !== "CREW" && department !== "CAST") {
        throw new ParamError({
            fnName: MoviePersonDetailsCard.name,
            paramName: "roleType",
            message: "Invalid Role Type."
        });
    }

    return (
        <Card>
            {department === "CAST" && <MoviePersonDetailsCardCastHeader credit={credit}/>}
            {department === "CREW" && <MoviePersonDetailsCardCrewHeader credit={credit}/>}

            {
                (department === "CAST" || notes) &&
                <CardContent className="space-y-5">
                    {
                        department === "CAST" &&
                        <section className="grid grid-cols-2 gap-4">
                            <BooleanFlagLabelSpan label="Is Cameo?" flag={cameo}/>
                            <BooleanFlagLabelSpan label="Is Voice Only?" flag={voiceOnly}/>
                            <BooleanFlagLabelSpan label="Is Motion Capture?" flag={motionCapture}/>
                            <BooleanFlagLabelSpan label="Is Uncredited?" flag={!!uncredited}/>
                        </section>
                    }

                    {notes && <section className="text-justify">{notes}</section>}
                </CardContent>
            }
        </Card>
    );
};

export default MoviePersonDetailsCard;
