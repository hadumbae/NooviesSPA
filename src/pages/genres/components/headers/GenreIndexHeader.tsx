import { FC } from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import { Plus } from "lucide-react";
import GenreSubmitFormPanel from "@/pages/genres/components/form/GenreSubmitFormPanel.tsx";
import { Button } from "@/common/components/ui/button.tsx";

/**
 * Header section for the Genre index page.
 *
 * This component displays:
 * - A title and description for the page.
 * - A **Create Genre** button wrapped in {@link GenreSubmitFormPanel},
 *   which opens the genre creation form when clicked.
 *
 * Layout:
 * - Uses a flex container to position the header text on the left and
 *   the create button on the right.
 *
 * @example
 * ```tsx
 * <GenreIndexHeader />
 * ```
 *
 * @remarks
 * - The create button uses the `link` variant for a subtle appearance.
 * - The button is enhanced with a {@link Plus} icon from `lucide-react`.
 * - This component is intended to be used at the top of the Genre index page.
 */
const GenreIndexHeader: FC = () => {
    return (
        <header className="flex justify-between items-center">
            <section>
                <HeaderTitle>Genres</HeaderTitle>
                <HeaderDescription>The genres of the movies.</HeaderDescription>
            </section>

            <GenreSubmitFormPanel>
                <Button variant="link" className="text-neutral-400 hover:text-black">
                    <Plus /> Create
                </Button>
            </GenreSubmitFormPanel>
        </header>
    );
};

export default GenreIndexHeader;
