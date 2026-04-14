/**
 * @fileoverview Presentational card component for displaying comprehensive Genre metadata.
 */

import {ReactElement} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";

/** Props for the {@link GenreDetailsCard} component. */
type DetailsProps = {
    /** The genre entity containing the metadata to display. */
    genre: Genre;
};

/**
 * Renders a structured informational card displaying a Genre's core details.
 * Organizes information into sections for general attributes and a long-form description.
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
                    <LabeledGroup label="Name" orientation="vertical">
                        <span className="primary-text font-bold">{name}</span>
                    </LabeledGroup>
                    <LabeledGroup label="Number Of Movies" orientation="vertical">
                        <span className="primary-text font-bold">{`${movieCount} movies`}</span>
                    </LabeledGroup>
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