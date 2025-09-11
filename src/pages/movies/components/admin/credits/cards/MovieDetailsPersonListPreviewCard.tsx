import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ParamError} from "@/common/errors/ParamError.ts";
import {cn} from "@/common/lib/utils.ts";
import {Link} from "react-router-dom";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

interface DetailsProp {
    credit: MovieCreditDetails;
    className?: string;
}

const MovieDetailsPersonListPreviewCard: FC<DetailsProp> = ({credit, className}) => {
    const {roleType, person: {_id: personID, name}} = credit;

    let secondaryText;

    switch (roleType) {
        case "CAST":
            secondaryText = credit.characterName;
            break;
        case "CREW":
            secondaryText = credit.job;
            break;
        default:
            throw new ParamError({
                fnName: MovieDetailsPersonListPreviewCard.name,
                paramName: "roleType",
                message: "Invalid Role Type."
            });
    }

    return (
        <Card>
            <CardContent className={cn(
                "p-2 space-y-2",
                "flex flex-col justify-center items-center",
                className,
            )}>
                <Link to={`/admin/persons/get/${personID}`} className="font-bold  hover:underline" target="_blank">
                    {name}
                </Link>

                <h2 className="text-sm text-neutral-400">
                    {secondaryText}
                </h2>
            </CardContent>
        </Card>
    );
};

export default MovieDetailsPersonListPreviewCard;
