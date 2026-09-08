/**
 * @fileoverview Clickable genre card that navigates to the genre browse page.
 */

import {Card, CardContent, CardHeader} from "@/views/common/_comp/ui/card.tsx";
import {Genre} from "@/domains/genres/_schema";
import {GenreImageBanner} from "@/views/admin/genres/_comp";
import {ReactElement} from "react";
import {Link} from "react-router-dom";

/** Props for the GenreImageListCard component. */
type SummaryProps = {
    genre: Genre;
};

/**
 * Renders a compact genre card that navigates to the genre detail page on click.
 */
export function GenreImageListCard(
    {genre: {name, slug, image}}: SummaryProps
): ReactElement {
    return (
        <Link to={`/browse/genres/${slug}`}>
            <Card className="cursor-pointer">
                <CardHeader className="rounded-t-xl p-0">
                    <GenreImageBanner
                        className="rounded-b-none w-full h-52"
                        image={image}
                        genreName={name}
                    />
                </CardHeader>

                <CardContent className="py-3">
                    {name}
                </CardContent>
            </Card>
        </Link>
    );
}
