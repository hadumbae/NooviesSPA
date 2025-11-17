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
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import GenreQueryOptionFormContainer
    from "@/pages/genres/components/admin/genre-query-options/GenreQueryOptionFormContainer.tsx";

/**
 * Props for {@link GenreIndexPageContent}.
 *
 * @property genres - The list of genre entries to render in the index grid.
 * @property totalItems - Total number of items available, used for pagination control.
 */
type GenreIndexPageContentProps = {
    genres: GenreDetails[];
    totalItems: number;
};

/**
 * Main content component for the **Genre Index Page**.
 *
 * This component assembles all page sections:
 *
 * - **Header:** Displays the page title and a “Create Genre” button.
 * - **Filter Section:** Shows a collapsible filter panel populated from URL search params.
 * - **Genre Grid:** Renders genre cards or a centered empty state message.
 * - **Pagination Controls:** Displays pagination buttons when needed.
 *
 * ## Behavior
 * - Parses search parameters using {@link useParsedSearchParams} with `GenreQueryOptionSchema`.
 * - Determines pagination state using {@link usePaginationSearchParams}.
 * - Detects mobile layout via {@link useIsMobile} to adjust card orientation.
 * - Shows an empty state if no genres exist.
 * - Renders pagination only when `totalItems > perPage`.
 *
 * @example
 * ```tsx
 * <GenreIndexPageContent
 *   genres={genresData}
 *   totalItems={42}
 * />
 * ```
 *
 * @remarks
 * - Designed to be wrapped by higher-level layout routes.
 * - Maintains consistent vertical rhythm through {@link PageFlexWrapper}.
 * - Cards use horizontal layout on desktop and vertical layout on mobile.
 */
const GenreIndexPageContent: FC<GenreIndexPageContentProps> = (props) => {
    // ⚡ State ⚡

    const {totalItems, genres} = props;
    const isMobile = useIsMobile();

    // ⚡ Search Params ⚡

    const {page, perPage, setPage} = usePaginationSearchParams();
    const {searchParams} = useParsedSearchParams({schema: GenreQueryOptionSchema});

    // ⚡ Filter Section ⚡

    const filterSection = (
        <section>
            <SectionHeader srOnly={true}>Filter Genres</SectionHeader>

            <PresetFilterDialog title="Genre Filters" description="Filter and sort your genres.">
                <GenreQueryOptionFormContainer
                    presetValues={searchParams}
                />
            </PresetFilterDialog>
        </section>
    );

    // ⚡ Genre Section ⚡

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
            <span className="text-neutral-400 select-none">
                There Are No Genres
            </span>
        </PageCenter>
    );

    // ⚡ Pagination ⚡

    const paginationButtons =
        (totalItems > perPage) && (
            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalItems}
                setPage={setPage}
            />
        );

    // ⚡ Render ⚡

    return (
        <PageFlexWrapper>
            <GenreIndexHeader/>
            {filterSection}

            {
                genres.length > 0
                    ? hasGenreSection
                    : hasNoGenreSection
            }

            {paginationButtons}
        </PageFlexWrapper>
    );
};

export default GenreIndexPageContent;
