/**
 * @fileoverview Header component for the Genre index page.
 * Provides page titles and the orchestration for the Genre creation panel.
 */

import {ReactElement, useState} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Plus} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import {GenreSubmitForm, GenreSubmitFormPanel} from "@/views/admin/genres/_feat/submit-form";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import {useNavigateToGenreDetails} from "@/domains/genres/_feat/navigation";

/**
 * Renders the top-level header for the Genre management section.
 */
export function GenreIndexHeader(): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigateToGenreDetails({component: GenreIndexHeader.name});

    const onSuccess = (genre: Genre) => {
        setIsOpen(false);
        navigate({slug: genre.slug, message: "Navigate after creation."});
    }

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>Genres</HeaderTitle>
                <HeaderDescription>Manage the categorization of movies.</HeaderDescription>
            </div>

            <GenreSubmitForm resetOnSuccess={true} onSubmitSuccess={onSuccess}>
                <GenreSubmitFormPanel isOpen={isOpen} setIsOpen={setIsOpen}>
                    <Button
                        variant="link"
                        className={HoverLinkCSS}
                        onClick={() => setIsOpen(true)}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Create
                    </Button>
                </GenreSubmitFormPanel>
            </GenreSubmitForm>
        </header>
    );
}