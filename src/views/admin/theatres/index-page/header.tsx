/**
 * @fileoverview Header section for the Cinema Management dashboard.
 * * This component serves as the primary navigation and action hub for the
 * Theatres list. It provides users with clear context about the current
 * view and a direct way to register new physical cinema locations.
 */

import { ReactElement } from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import { Plus } from "lucide-react";
import { Theatre } from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import { Button } from "@/common/components/ui/button.tsx";
import { HoverLinkCSS } from "@/common/constants/css/ButtonCSS.ts";
import TheatreSubmitFormPanel from "@/views/admin/theatres/_feat/submit-data/TheatreSubmitFormPanel.tsx";
import useNavigateToTheatre from "@/domains/theatres/hooks/navigation/navigate-to-theatre/useNavigateToTheatre.ts";

/**
 * Header component that introduces the "Theatres" section of the admin portal.
 */
export function TheatreIndexHeader(): ReactElement {
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

            <TheatreSubmitFormPanel onSubmitSuccess={onSubmitSuccess}>
                <Button
                    variant="link"
                    size="sm"
                    className={HoverLinkCSS}
                    aria-label="Add a new theatre"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Theatre
                </Button>
            </TheatreSubmitFormPanel>
        </header>
    );
}