/**
 * @file GenreImageListCard.tsx
 * @description
 * Clickable genre card that navigates to the genre browse page
 * with logged navigation context.
 */

import {Card, CardContent, CardHeader} from "@/common/components/ui/card.tsx";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import {Image} from "lucide-react";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Props for {@link GenreImageListCard}.
 */
type SummaryProps = {
    /**
     * Genre data used for display and navigation.
     */
    genre: Genre;
};

/**
 * Renders a compact genre card with:
 * - An image placeholder
 * - Genre name label
 *
 * Clicking the card navigates to the genre detail page
 * and logs the navigation event with genre context.
 *
 * @param props Component props
 */
const GenreImageListCard = ({genre}: SummaryProps) => {
    const {_id, name, slug} = genre;
    const navigate = useLoggedNavigate();

    const onClick = () => {
        navigate({
            to: `/browse/genres/${slug}`,
            message: "Navigate to genre info.",
            component: GenreImageListCard.name,
            context: {system: "CLIENT", genre: _id, slug, name},
        });
    };

    return (
        <Card className="cursor-pointer" onClick={onClick}>
            <CardHeader className="flex justify-center items-center h-32">
                <Image />
            </CardHeader>

            <CardContent className="py-3 hover:underline">
                {name}
            </CardContent>
        </Card>
    );
};

export default GenreImageListCard;
