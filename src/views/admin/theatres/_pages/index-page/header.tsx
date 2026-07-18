/**
 * @fileoverview Header section for the Cinema Management dashboard.
 */

import {ReactElement, useState} from 'react';
import {Plus} from "lucide-react";
import {HeaderDescription, HeaderTitle} from "@/views/common/_comp/page-headers";

import {Theatre, useNavigateToTheatre} from "@/domains/theatres";
import {TheatreSubmitForm, TheatreSubmitFormPanel} from "@/views/admin/theatres/_feat";
import {Button} from "@/common/components/ui";

/**
 * Header component for the Theatre index view.
 */
export function TheatreIndexHeader(): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigateToTheatre = useNavigateToTheatre();

    const onSubmitSuccess = (theatre: Theatre) => {
        navigateToTheatre({
            slug: theatre.slug,
            component: TheatreIndexHeader.name,
            message: "Successfully created theatre; moving to the theatre's detail view."
        });
    };

    return (
        <header className="flex justify-between items-center px-1 py-4">
            <section>
                <HeaderTitle>Theatres</HeaderTitle>
                <HeaderDescription>
                    Manage physical cinema locations, total seating capacities, and regional address settings.
                </HeaderDescription>
            </section>

            <TheatreSubmitForm onSubmitSuccess={onSubmitSuccess}>
                <TheatreSubmitFormPanel isOpen={isOpen} setIsOpen={setIsOpen}>
                    <Button variant="link" size="sm" aria-label="Add a new theatre">
                        <Plus/> Theatre
                    </Button>
                </TheatreSubmitFormPanel>
            </TheatreSubmitForm>
        </header>
    );
}