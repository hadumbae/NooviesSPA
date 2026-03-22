/**
 * @file Presentational card component for displaying comprehensive Genre metadata.
 * @filename GenreDetailsCard.tsx
 */

import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Props for the {@link GenreDetailsCard} component.
 */
type DetailsProps = {
    /** The genre entity containing the name, description, and movie metrics to render. */
    genre: Genre;
}

/**
 * Renders a structured informational card for a specific Genre.
 * @param props - Component {@link DetailsProps}.
 */
const GenreDetailsCard: FC<DetailsProps> = ({genre}) => {
    const {name, description, movieCount} = genre;

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <section>
                    <h1 className="font-extrabold uppercase text-sm tracking-wider">General Details</h1>
                    <Separator/>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailsCardSpan label="Name" text={name}/>
                    <DetailsCardSpan label="Number Of Movies" text={`${movieCount} movies`}/>
                </section>

                <section>
                    <h1 className="font-extrabold uppercase text-sm tracking-wider">Description</h1>
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