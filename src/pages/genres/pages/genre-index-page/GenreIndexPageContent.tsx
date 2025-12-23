import {FC} from 'react';
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import GenreIndexCard from "@/pages/genres/components/cards/GenreIndexCard.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import GenreIndexHeader from "@/pages/genres/components/headers/GenreIndexHeader.tsx";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {GenreQueryOptionSchema} from "@/pages/genres/schema/filters/GenreQueryOptions.schema.ts";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import GenreQueryOptionFormContainer
    from "@/pages/genres/components/admin/genre-query-options/GenreQueryOptionFormContainer.tsx";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for {@link GenreIndexPageContent}.
 */
type GenreIndexPageContentProps = {
    /** Current page number (URL-derived). */
    page: number;

    /** Items per page (URL-derived). */
    perPage: number;

    /** Updates the current page in URL search params. */
    setPage: (page: number) => void;

    /** List of genres to render. */
    genres: GenreDetails[];

    /** Total number of genres available. */
    totalItems: number;
};

/**
 * **GenreIndexPageContent**
 *
 * Presentational content for the Genre Index page.
 *
 * ## Responsibilities
 * - Renders page header and filter controls
 * - Displays genre cards or an empty state
 * - Shows pagination controls when required
 *
 * ## Behavior
 * - Filter state is derived from URL search params
 * - Layout adapts based on viewport (mobile vs desktop)
 * - Pagination controls render only when `totalItems > perPage`
 *
 * @remarks
 * - Contains no data fetching logic
 * - Expects validated and paginated data from parent
 */
const GenreIndexPageContent: FC<GenreIndexPageContentProps> = (props) => {
    // --- State ---
    const isMobile = useIsMobile();
    const {totalItems, genres, page, perPage, setPage} = props;

    const {searchParams} = useParsedSearchParams({
        schema: GenreQueryOptionSchema
    });

    // --- List ---
    const hasGenreSection = (
        <PageSection className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {genres.map((genre: GenreDetails) => (
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

    // --- Render ---

    return (
        <PageFlexWrapper>
            {/* Header */}
            <GenreIndexHeader/>

            {/* Filters */}
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
