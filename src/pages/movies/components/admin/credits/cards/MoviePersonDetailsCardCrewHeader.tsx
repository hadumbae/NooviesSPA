import {FC} from 'react';
import {CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import MoviePersonCardOptions from "@/pages/movies/components/admin/credits/cards/MoviePersonCardOptions.tsx";
import {ParamError} from "@/common/errors/ParamError.ts";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

interface CastProps {
    credit: MovieCreditDetails;
}

const MoviePersonDetailsCardCrewHeader: FC<CastProps> = ({credit}) => {
    if (credit.roleType !== "CREW") {
        throw new ParamError({
            fnName: MoviePersonDetailsCardCrewHeader.name,
            paramName: "credit.roleType",
            message: "Role Type must be CAST."
        });
    }

    const {job, person: {name}} = credit

    return (
        <CardHeader>
            <CardTitle className="flex justify-between items-center">
                <span>{name}</span>
                <MoviePersonCardOptions credit={credit}/>
            </CardTitle>
            <CardDescription>{job}</CardDescription>
        </CardHeader>
    );
};

export default MoviePersonDetailsCardCrewHeader;
