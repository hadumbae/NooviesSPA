/**
 * @fileoverview Presentation component for the Browse Genres page content.
 *
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {Genre} from "@/domains/genres/_schema";
import {BrowseGenresPageHeader} from "@/views/client/genres/browse-genres-page/header.tsx";
import {GenreImageListCard} from "@/views/client/genres/_comp";

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
            <BrowseGenresPageHeader />

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