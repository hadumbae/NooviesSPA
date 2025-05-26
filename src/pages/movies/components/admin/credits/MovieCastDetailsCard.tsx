import {FC} from 'react';
import {Card, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {PopulatedMovieCredit} from "@/pages/moviecredit/schemas/model/populated/MovieCreditPopulatedSchema.ts";
import {ParamError} from "@/common/errors/ParamError.ts";
import MovieCastDetailsCardContent from "@/pages/movies/components/admin/credits/MovieCastDetailsCardContent.tsx";

interface DetailsProp {
    credit: PopulatedMovieCredit;
}

const MovieCastDetailsCard: FC<DetailsProp> = ({credit}) => {
    const {roleType} = credit;

    if (roleType === "CREW") {
        throw new ParamError({
            fnName: MovieCastDetailsCard.name,
            paramName: "roleType",
            message: "Invalid Role Type. Must be 'CAST'.",
        });
    }

    const {person: {name}, notes, characterName, cameo, voiceOnly, motionCapture, uncredited} = credit;

    const flags = {cameo, voiceOnly, motionCapture, uncredited};

    return (
        <Card>
            <CardHeader>
                <CardTitle>{characterName}</CardTitle>
                <CardDescription>{name}</CardDescription>
            </CardHeader>

            <MovieCastDetailsCardContent notes={notes} flags={flags}  />
        </Card>
    );
};

export default MovieCastDetailsCard;
