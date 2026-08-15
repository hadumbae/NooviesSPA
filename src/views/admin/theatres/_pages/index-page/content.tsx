/**
 * @fileoverview Presentation component for the Theatre Index page content.
 */

import {ReactElement, useState} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {Button} from "@/views/common/_comp/ui";
import {PageHeader, PaginationRangeButtons} from "@/views/common/_comp";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {useSetAdminPageTitle} from "@/common/_feat/handle-pages";

import {Theatre, TheatreDetails, useNavigateToTheatre} from "@/domains/theatres";
import {TheatreIndexCard} from "@/views/admin/theatres/_comp";
import {Plus} from "lucide-react";
import {
    TheatreIndexQueryOptionsFormSection,
    TheatreSubmitForm,
    TheatreSubmitFormPanel
} from "@/views/admin/theatres/_feat";

/** Props for the TheatreIndexPageContent component. */
type ContentProps = {
    theatres: TheatreDetails[];
    totalItems: number;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/**
 * Renders the primary grid layout and controls for managing theatres.
 */
export function TheatreIndexPageContent(
    {theatres, page, perPage, setPage, totalItems}: ContentProps
): ReactElement {
    useSetAdminPageTitle({presetTitle: "Theatre Index"});

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const navigateToTheatre = useNavigateToTheatre();

    const navigateOnCreate = (theatre: Theatre) => {
        navigateToTheatre({
            slug: theatre.slug,
            component: TheatreIndexPageContent.name,
            message: "Successfully created theatre; moving to the theatre's detail view."
        });
    };


    return (
        <PageFlexWrapper>
            <PageHeader
                title="Theatres"
                description="Manage physical cinema locations, total seating capacities, and regional address settings."
                actions={
                    <TheatreSubmitForm onSubmitSuccess={navigateOnCreate}>
                        <TheatreSubmitFormPanel isOpen={isSubmitting} setIsOpen={setIsSubmitting}>
                            <Button variant="link" size="sm" aria-label="Add a new theatre">
                                <Plus/> Theatre
                            </Button>
                        </TheatreSubmitFormPanel>
                    </TheatreSubmitForm>
                }
            />

            <TheatreIndexQueryOptionsFormSection/>

            {theatres.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {theatres.map((theatre) => (
                        <TheatreIndexCard
                            key={theatre._id}
                            theatre={theatre}
                        />
                    ))}
                </div>
            ) : (
                <EmptyArrayContainer
                    className="flex-1"
                    text="There are no theatres."
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