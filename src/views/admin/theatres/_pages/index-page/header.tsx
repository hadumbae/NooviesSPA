/**
 * @fileoverview Header section for the Cinema Management dashboard.
 */

import {ReactElement, useState} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {LinkButton} from "@/views/common/_comp/submit-form";
import {Plus} from "lucide-react";

import {Theatre, useNavigateToTheatre} from "@/domains/theatres";
import {TheatreSubmitForm, TheatreSubmitFormPanel} from "@/views/admin/theatres/_feat";

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
                    <LinkButton size="sm" aria-label="Add a new theatre">
                        <Plus/> Theatre
                    </LinkButton>
                </TheatreSubmitFormPanel>
            </TheatreSubmitForm>
        </header>
    );
}