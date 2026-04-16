/**
 * @fileoverview Presentation component for the Browse Genres page content.
 * Responsible for the layout and responsive grid mapping of genre data.
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import GenreImageListCard from "@/views/client/genres/_comp/GenreImageListCard.tsx";
import {Genre} from "@/domains/genres/schema";
import {BrowseGenresPageHeader} from "@/views/client/genres/browse-genres-page/header.tsx";

/**
 * Props for the {@link BrowseGenresPageContent} component.
 */
type ContentProps = {
    genres: Genre[];
};

/**
 * Renders the actual content of the genres page once data is successfully loaded.
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