/**
 * @fileoverview Presentational card component for displaying comprehensive Genre metadata.
 */

import {ReactElement} from 'react';
import {Genre} from "@/domains/genres/_schema";
import {LabelContent} from "@/views/common/_comp";
import {Card, CardContent, Separator} from "@/views/common/_comp/ui";
import {TextQuote} from "@/views/common/_comp/text-display/text-blocks/TextQuote.tsx";

/** Props for the {@link GenreDetailsCard} component. */
type DetailsProps = {
    genre: Genre;
};

/**
 * Renders a structured informational card displaying a Genre's core details.
 */
export function GenreDetailsCard(
    {genre: {name, description, movieCount}}: DetailsProps
): ReactElement {
    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <div>
                    <h2 className="font-extrabold uppercase text-sm tracking-wider">General Details</h2>
                    <Separator className="mt-1"/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LabelContent label="Name">
                        <span className="primary-text font-bold">{name}</span>
                    </LabelContent>

                    <LabelContent label="Number Of Movies">
                        <span className="primary-text font-bold">{`${movieCount} movies`}</span>
                    </LabelContent>
                </div>

                <div>
                    <h2 className="font-extrabold uppercase text-sm tracking-wider">Description</h2>
                    <Separator className="mt-1"/>
                </div>

                <TextQuote>
                    {description}
                </TextQuote>
            </CardContent>
        </Card>
    );
}