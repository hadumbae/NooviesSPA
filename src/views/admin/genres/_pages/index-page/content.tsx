/**
 * @fileoverview Presentation component for the administrative genre index page.
 */

import {ReactElement, useState} from 'react';
import {PageHeader, PaginationRangeButtons} from "@/views/common/_comp";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {useIsMobile} from "@/common/_feat/handle-ui/useIsMobile.tsx";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {GenreIndexCard} from "@/views/admin/genres/_comp";
import {Button} from "@/common/components/ui";
import {Plus} from "lucide-react";
import {Genre, GenreQueryOptionSchema, useNavigateToGenreDetails} from "@/domains/genres";
import {
    GenreQueryOptionForm,
    GenreQueryOptionFormDialog,
    GenreSubmitForm,
    GenreSubmitFormPanel
} from "@/views/admin/genres/_feat";

/** Props for the GenreIndexPageContent component. */
type GenreIndexPageContentProps = {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    genres: Genre[];
    totalItems: number;
};

/**
 * Renders the administrative grid view for genres including search filters and pagination.
 */
export function GenreIndexPageContent(
    {totalItems, genres, page, perPage, setPage}: GenreIndexPageContentProps
): ReactElement {
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const isMobile = useIsMobile();
    const navigate = useNavigateToGenreDetails();
    const {searchParams} = useParsedSearchParams({schema: GenreQueryOptionSchema});

    const onSuccess = (genre: Genre) => {
        setIsCreating(false);
        navigate({slug: genre.slug, message: "Navigate after creation."});
    }

    return (
        <PageFlexWrapper>
            <PageHeader title="Genres" description="Manage the categorization of movies." actions={
                <GenreSubmitForm
                    resetConfig={{resetOnSuccess: true}}
                    onSubmitConfig={{onSubmitSuccess: onSuccess, successMessage: "Created."}}
                >
                    <GenreSubmitFormPanel isOpen={isCreating} setIsOpen={setIsCreating}>
                        <Button variant="link" className="hover-link" onClick={() => setIsCreating(true)}>
                            <Plus className="mr-2 h-4 w-4"/> Create
                        </Button>
                    </GenreSubmitFormPanel>
                </GenreSubmitForm>
            }/>

            <GenreQueryOptionForm presetValues={searchParams}>
                <GenreQueryOptionFormDialog/>
            </GenreQueryOptionForm>


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