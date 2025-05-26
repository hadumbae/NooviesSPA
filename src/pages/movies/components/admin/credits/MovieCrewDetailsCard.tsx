import {FC} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {PopulatedMovieCredit} from "@/pages/moviecredit/schemas/model/populated/MovieCreditPopulatedSchema.ts";
import {ParamError} from "@/common/errors/ParamError.ts";

interface DetailsProp {
    credit: PopulatedMovieCredit;
}

const MovieCrewDetailsCard: FC<DetailsProp> = ({credit}) => {
    const {roleType} = credit;

    if (roleType === "CAST") {
        throw new ParamError({
            fnName: MovieCrewDetailsCard.name,
            paramName: "roleType",
            message: "Invalid Role Type. Must be 'CREW'.",
        });
    }

    const {job, notes, person: {name}} = credit;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{job}</CardDescription>
            </CardHeader>

            {
                notes && <CardContent>
                    {notes}
                </CardContent>
            }
        </Card>
    );
};

export default MovieCrewDetailsCard;
