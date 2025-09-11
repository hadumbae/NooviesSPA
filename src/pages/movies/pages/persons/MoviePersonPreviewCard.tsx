import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {InvalidParamError} from "@/common/errors/InvalidParamError.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

interface PreviewCardProps {
    credit: MovieCredit;
}

const MoviePersonPreviewCard: FC<PreviewCardProps> = ({credit}) => {
    // TODO Update Movie Person To Movie Credit
    const {roleType} = credit;

    if (roleType !== "CREW" && roleType !== "CAST") {
        throw new InvalidParamError({
            data: credit,
            message: `Credit with invalid role type. [Role Type: ${roleType}]`,
        });
    }

    if (roleType === "CREW") {
        const {job} = credit;
        return (
            <Card>
                <CardContent className="p-3">
                    <Link to={"/"}>
                        {job}
                    </Link>
                </CardContent>
            </Card>
        );
    }

    if (roleType === "CAST") {
        const {billingOrder, characterName} = credit;
        return (
            <Card>
                <CardContent className="p-3">
                    <Link to={"/"}>
                        {billingOrder}: {characterName}
                    </Link>
                </CardContent>
            </Card>
        );
    }
};

export default MoviePersonPreviewCard;
