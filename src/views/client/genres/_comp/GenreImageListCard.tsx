/**
 * @fileoverview Clickable genre card that navigates to the genre browse page.
 */

import {Card, CardContent, CardHeader} from "@/common/components/ui/card.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {Genre} from "@/domains/genres/schema";
import {GenreImageBanner} from "@/views/admin/genres/_comp";
import {ReactElement} from "react";

/** Props for the GenreImageListCard component. */
type SummaryProps = {
    genre: Genre;
};

/**
 * Renders a compact genre card that navigates to the genre detail page on click.
 */
export function GenreImageListCard({genre}: SummaryProps): ReactElement {
    const {_id, name, slug, image} = genre;
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
            <CardHeader className="rounded-t-xl p-0">
                <GenreImageBanner
                    className="rounded-b-none w-full h-52"
                    image={image}
                    genreName={name}
                />
            </CardHeader>

            <CardContent className="py-3 hover:underline">
                {name}
            </CardContent>
        </Card>
    );
}
