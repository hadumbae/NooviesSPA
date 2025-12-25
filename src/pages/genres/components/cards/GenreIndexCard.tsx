import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import {Clapperboard} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Props for the `GenreIndexCard` component.
 *
 * @property genre - The genre details object containing metadata such as `_id`, `name`, and `movieCount`.
 * @property className - Optional additional CSS class names for styling.
 * @property orientation - Layout orientation of the card. Can be `"horizontal"` (default) or `"vertical"`.
 */
type IndexProps = {
    genre: GenreDetails;
    className?: string;
    orientation?: "horizontal" | "vertical";
}

/**
 * `GenreIndexCard` is a reusable UI component that displays summary information
 * about a movie genre, including its name and movie count. It is rendered as a clickable card.
 *
 * When clicked, the card navigates the user to a detailed admin view for the genre, preserving
 * pagination parameters (`page` and `perPage`) in the navigation state.
 *
 * The layout of the card can be displayed either horizontally or vertically based on the `orientation` prop.
 *
 * @param props - See {@link IndexProps}
 * @returns A styled card component representing a genre index item.
 *
 * @example
 * ```tsx
 * <GenreIndexCard
 *   genre={{ _id: "123", name: "Action", movieCount: 42 }}
 *   orientation="vertical"
 * />
 * ```
 */
const GenreIndexCard: FC<IndexProps> = ({genre, orientation = "horizontal"}) => {
    // ⚡ State ⚡

    const navigate = useLoggedNavigate();
    const {slug, name, movieCount} = genre;

    const {page, perPage, hasPaginationValues} = usePaginationSearchParams();

    // ⚡ CSS ⚡

    const flexClasses = orientation === "horizontal"
        ? "flex justify-between items-center"
        : "flex flex-col items-center";

    // ⚡ Handler ⚡

    const openGenre = () => {
        const state = hasPaginationValues ? {page, perPage} : {};

        navigate({
            to: `/admin/genres/get/${slug}`,
            component: GenreIndexCard.name,
            options: {state},
        });
    }

    // ⚡ Render ⚡

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
