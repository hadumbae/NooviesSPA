import {FC} from 'react';
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";

interface Props {
    genre: Genre;
}

const GenreDescriptionCard: FC<Props> = ({genre}) => {
    const {description} = genre;

    return (
        <Card>
            <CardContent className="p-4">
                <TextQuote>{description}</TextQuote>
            </CardContent>
        </Card>
    );
};

export default GenreDescriptionCard;
