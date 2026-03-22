/**
 * @file Summary card component for listing genres within an administrative or index view.
 * @filename GenreIndexCard.tsx
 */

import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Clapperboard} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Props for the {@link GenreIndexCard} component.
 */
type IndexProps = {
    /** The genre entity containing display metadata. */
    genre: Genre;
    /** Optional CSS classes for custom styling. */
    className?: string;
    /** The visual flow of the card content. Defaults to `"horizontal"`. */
    orientation?: "horizontal" | "vertical";
}

/**
 * Renders a clickable summary card for a genre, including its name and movie count.
 * @param props - Component {@link IndexProps}.
 */
const GenreIndexCard: FC<IndexProps> = ({genre, orientation = "horizontal"}) => {
    const navigate = useLoggedNavigate();
    const {slug, name, movieCount} = genre;

    const {page, perPage, hasPaginationValues} = usePaginationSearchParams();

    const flexClasses = orientation === "horizontal"
        ? "flex justify-between items-center"
        : "flex flex-col items-center";

    const openGenre = () => {
        const state = hasPaginationValues ? {page, perPage} : {};

        navigate({
            to: `/admin/genres/get/${slug}`,
            component: GenreIndexCard.name,
            options: {state},
        });
    }

    return (
        <Card className="hover:cursor-pointer" onClick={openGenre}>
            <CardContent className={cn("p-4", flexClasses)}>
                <span className="text-md font-extrabold">{name}</span>

                <section className="flex items-center gap-2 text-neutral-400">
                    <span>{movieCount}</span>
                    <Clapperboard size={15}/>
                </section>
            </CardContent>
        </Card>
    );
};

export default GenreIndexCard;