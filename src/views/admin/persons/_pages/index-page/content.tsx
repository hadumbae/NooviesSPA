/**
 * @fileoverview Presentation component for the administrative Person Index page.
 * Orchestrates the layout for the person listing grid, search filters,
 * and pagination, providing a high-level UI for person management.
 */

import {ReactElement, useState} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {IconButton, PageHeader, PaginationRangeButtons} from "@/views/common/_comp";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {PersonIndexCard} from "@/views/admin/persons/_comp";
import {PersonSubmitForm, PersonIndexQueryOptionFormSection, PersonSubmitFormPanel} from "@/views/admin/persons/_feat";
import {Person, useNavigateToPerson} from "@/domains/persons";
import {Plus} from "lucide-react";

/**
 * Props for the {@link PersonIndexPageContent} component.
 */
type ContentProps = {
    persons: Person[];
    page: number;
    perPage: number;
    totalItems: number;
    setPage: (page: number) => void;
};

/**
 * Renders the structural layout for the administrative Person Index.
 */
export function PersonIndexPageContent(
    {persons, page, perPage, totalItems, setPage}: ContentProps
): ReactElement {
    const navigate = useNavigateToPerson();
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const onSubmit = ({slug}: Person) => navigate({
        slug,
        message: "Navigate to details after creating person.",
    });

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Persons"
                subtitle="The actors and crew behind movies."
                actions={
                    <PersonSubmitForm successMessage="Registered." onSubmitSuccess={onSubmit}>
                        <PersonSubmitFormPanel isOpen={isCreating} setIsOpen={setIsCreating}>
                            <IconButton variant="link" icon={Plus}/>
                        </PersonSubmitFormPanel>
                    </PersonSubmitForm>
                }
            />

            <PersonIndexQueryOptionFormSection/>

            {persons.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {persons.map(person => <PersonIndexCard key={person._id} person={person}/>)}
                </div>
            ) : (
                <EmptyArrayContainer
                    className="flex-1"
                    text="There Are No People"
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