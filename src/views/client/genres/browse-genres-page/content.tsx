/**
 * @fileoverview Presentation component for the Browse Genres page content.
 *
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {GenreImageListCard} from "@/views/client/genres/_comp";
import {PageHeader} from "@/views/common/_comp";
import {Genre} from "@/domains/genres";

/** Props for the BrowseGenresPageContent component. */
type ContentProps = {
    genres: Genre[];
};

/**
 * Renders the responsive grid of genre cards for the browse page.
 */
export function BrowseGenresPageContent(
    {genres}: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <PageHeader
                title="Genres"
                description="Browse all the genres available!"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {genres.map((genre) => (
                    <GenreImageListCard
                        key={genre._id}
                        genre={genre}
                    />
                ))}
            </div>
        </PageFlexWrapper>
    );
}