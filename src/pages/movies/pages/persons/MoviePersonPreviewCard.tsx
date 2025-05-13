import {FC} from 'react';
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Link} from "react-router-dom";

interface PreviewCardProps {
    person: Person;
}

const MoviePersonPreviewCard: FC<PreviewCardProps> = ({person}) => {
    const {name} = person;

    return (
        <Card>
            <CardContent className="p-3">
                <Link to={"/"}>
                    {name}
                </Link>
            </CardContent>
        </Card>
    );
};

export default MoviePersonPreviewCard;
