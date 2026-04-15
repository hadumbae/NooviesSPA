/**
 * @fileoverview Summary card component for listing genres within an administrative or index view.
 */

import {ReactElement} from 'react';
import {Clapperboard} from "lucide-react";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {cn} from "@/common/lib/utils.ts";
import usePaginationSearchParams from "@/common/features/fetch-pagination-search-params/hooks/usePaginationSearchParams.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";

/** Props for the {@link GenreIndexCard} component. */
type IndexProps = {
    genre: Genre;
    className?: string;
    orientation?: "horizontal" | "vertical";
};

/**
 * Renders a clickable summary card for a genre, including its name and movie count.
 */
export function GenreIndexCard(
    {genre, orientation = "horizontal", className}: IndexProps
): ReactElement {
    const navigate = useLoggedNavigate();
    const {slug, name, movieCount} = genre;

    const {page, perPage, hasPaginationValues} = usePaginationSearchParams();

    const flexClasses = orientation === "horizontal"
        ? "flex justify-between items-center"
        : "flex flex-col items-center gap-2";

    /**
     * Navigates to the genre details page while preserving the current pagination context.
     */
    const openGenre = (): void => {
        const state = hasPaginationValues ? {page, perPage} : {};

        navigate({
            to: `/admin/genres/get/${slug}`,
            component: "GenreIndexCard",
            options: {state},
        });
    };

    return (
        <Card
            className={cn("hover:bg-accent/50 transition-colors cursor-pointer", className)}
            onClick={openGenre}
        >
            <CardContent className={cn("p-4", flexClasses)}>
                <span className="text-md font-extrabold tracking-tight">{name}</span>

                <section className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm font-medium">{movieCount}</span>
                    <Clapperboard size={15} aria-hidden="true" />
                </section>
            </CardContent>
        </Card>
    );
}