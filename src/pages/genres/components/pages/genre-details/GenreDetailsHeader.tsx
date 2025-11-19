import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import GenreDetailsOptions from "@/pages/genres/components/admin/genre-details/GenreDetailsOptions.tsx";
import {Ellipsis} from "lucide-react";
import IconButton from "@/common/components/buttons/IconButton.tsx";

/**
 * Props for the {@link GenreDetailsHeader} component.
 *
 * @property genre - The {@link Genre} entity containing the name and other metadata.
 */
type HeaderProps = {
    genre: Genre;
};

/**
 * Displays the header for a {@link Genre} details page.
 *
 * @remarks
 * Includes the genre’s name, a “Genre” description label, and an options menu
 * for admin actions such as editing or deleting the genre.
 *
 * The layout follows a two-column flexbox with the title on the left
 * and the action button on the right.
 *
 * @example
 * ```tsx
 * <GenreDetailsHeader genre={genre} />
 * ```
 */
const GenreDetailsHeader: FC<HeaderProps> = ({genre}) => {
    const {name} = genre;

    return (
        <header className={cn("flex justify-between items-center")}>
            <section>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>Genre</HeaderDescription>
            </section>

            <section>
                <GenreDetailsOptions>
                    <IconButton>
                        <Ellipsis/>
                    </IconButton>
                </GenreDetailsOptions>
            </section>
        </header>
    );
};

export default GenreDetailsHeader;
