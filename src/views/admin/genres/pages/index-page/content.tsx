/**
 * @fileoverview Presentation component for the Genre Index page.
 * Orchestrates the administrative grid view for genres, including
 * search/filter dialogs, responsive card layouts, and pagination.
 */

import {ReactElement} from 'react';
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {GenreIndexHeader} from "@/views/admin/genres/pages/index-page/header.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {GenreIndexCard} from "@/views/admin/genres/_comp";
import {GenreQueryOptionForm, GenreQueryOptionFormDialog} from "@/views/admin/genres/_feat/query-form";
import {Genre, GenreQueryOptionSchema} from "@/domains/genres/schema";

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
export function GenreIndexPageContent(
    {totalItems, genres, page, perPage, setPage}: GenreIndexPageContentProps
): ReactElement {
    const isMobile = useIsMobile();
    const {searchParams} = useParsedSearchParams({schema: GenreQueryOptionSchema});

    return (
        <PageFlexWrapper>
            <GenreIndexHeader/>

            <section>
                <SROnly text="Filter Genres"/>

                <GenreQueryOptionForm presetValues={searchParams}>
                    <GenreQueryOptionFormDialog />
                </GenreQueryOptionForm>
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

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalItems}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}