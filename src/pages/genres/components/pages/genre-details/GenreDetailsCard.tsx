import {FC} from 'react';
import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";

type DetailsProps = {
    genre: GenreDetails;
}

const GenreDetailsCard: FC<DetailsProps> = ({genre}) => {
    const {name, description, movieCount} = genre;

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <section>
                    <h1 className="font-extrabold uppercase">General Details</h1>
                    <Separator/>
                </section>

                <section className="grid grid-cols-2 gap-4">
                    <DetailsCardSpan label="Name" text={name}/>
                    <DetailsCardSpan label="Number Of Movies" text={`${movieCount} movies`}/>
                </section>

                <section>
                    <h1 className="font-extrabold uppercase">Description</h1>
                    <Separator/>
                </section>

                <section>
                    <TextQuote>
                        {description}
                    </TextQuote>
                </section>
            </CardContent>
        </Card>
    );
};

export default GenreDetailsCard;
