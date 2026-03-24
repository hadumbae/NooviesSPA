/**
 * @file Presentational layer for the Genre Index administrative view.
 * @filename GenreIndexPageContent.tsx
 */

import {FC} from 'react';
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import GenreIndexCard from "@/views/admin/genres/components/cards/GenreIndexCard.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import GenreIndexHeader from "@/views/admin/genres/pages/genre-index-page/headers/GenreIndexHeader.tsx";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {GenreQueryOptionSchema} from "@/domains/genres/schema/filters/GenreQueryOptions.schema.ts";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import GenreQueryOptionFormContainer
    from "@/views/admin/genres/components/form/genre-query-options/GenreQueryOptionFormContainer.tsx";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Props for the {@link GenreIndexPageContent} component.
 */
type GenreIndexPageContentProps = {
    /** Current active page number from the URL state. */
    page: number;
    /** Maximum items displayed per page. */
    perPage: number;
    /** Callback to update the pagination state in the URL. */
    setPage: (page: number) => void;
    /** Collection of genre entities to display in the grid. */
    genres: Genre[];
    /** Total count of genres matching current filters for pagination logic. */
    totalItems: number;
};

/**
 * Renders the main administrative interface for browsing and filtering genres.
 * @param props - Data and pagination controls from the parent page container.
 */
const GenreIndexPageContent: FC<GenreIndexPageContentProps> = (props) => {
    const isMobile = useIsMobile();
    const {totalItems, genres, page, perPage, setPage} = props;

    const {searchParams} = useParsedSearchParams({
        schema: GenreQueryOptionSchema
    });

    const hasGenreSection = (
        <PageSection className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {genres.map((genre: Genre) => (
                <GenreIndexCard
                    orientation={isMobile ? "vertical" : "horizontal"}
                    genre={genre}
                    key={genre._id}
                />
            ))}
        </PageSection>
    );

    const hasNoGenreSection = (
        <PageCenter>
            <span className={cn(SecondaryTextBaseCSS, "select-none capitalize")}>
                There Are No Genres
            </span>
        </PageCenter>
    );

    const listContent = genres.length > 0
        ? hasGenreSection
        : hasNoGenreSection;

    return (
        <PageFlexWrapper>
            <GenreIndexHeader/>

            <section>
                <SectionHeader srOnly={true}>Filter Genres</SectionHeader>

                <PresetFilterDialog title="Genre Filters" description="Filter and sort your genres.">
                    <GenreQueryOptionFormContainer
                        presetValues={searchParams}
                    />
                </PresetFilterDialog>
            </section>

            {listContent}

            {
                totalItems > perPage &&
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            }
        </PageFlexWrapper>
    );
};

export default GenreIndexPageContent;