/**
 * @fileoverview Presentation component for the Genre Index page.
 * Orchestrates the administrative grid view for genres, including
 * search/filter dialogs, responsive card layouts, and pagination.
 */

import {FC} from 'react';
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import GenreIndexCard from "@/views/admin/genres/components/cards/GenreIndexCard.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import GenreIndexHeader from "@/views/admin/genres/pages/genre-index-page/headers/GenreIndexHeader.tsx";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {GenreQueryOptionSchema} from "@/domains/genres/schema/filters/GenreQueryOptions.schema.ts";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import GenreQueryOptionFormContainer
    from "@/views/admin/genres/components/form/genre-query-options/GenreQueryOptionFormContainer.tsx";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

type GenreIndexPageContentProps = {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    genres: Genre[];
    totalItems: number;
};

/**
 * Renders the primary genre management interface.
 */
const GenreIndexPageContent: FC<GenreIndexPageContentProps> = (props) => {
    const isMobile = useIsMobile();
    const {totalItems, genres, page, perPage, setPage} = props;

    const {searchParams} = useParsedSearchParams({
        schema: GenreQueryOptionSchema
    });

    return (
        <PageFlexWrapper>
            <GenreIndexHeader />

            <section>
                <SectionHeader srOnly={true}>Filter Genres</SectionHeader>

                <PresetFilterDialog
                    title="Genre Filters"
                    description="Filter and sort your genres."
                >
                    <GenreQueryOptionFormContainer
                        presetValues={searchParams}
                    />
                </PresetFilterDialog>
            </section>

            {genres.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {genres.map((genre: Genre) => (
                        <GenreIndexCard
                            orientation={isMobile ? "vertical" : "horizontal"}
                            genre={genre}
                            key={genre._id}
                        />
                    ))}
                </div>
            ) : (
                <EmptyArrayContainer
                    text="There are no genres."
                    className="flex-1"
                />
            )}

            {totalItems > perPage && (
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            )}
        </PageFlexWrapper>
    );
};

export default GenreIndexPageContent;