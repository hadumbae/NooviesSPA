/**
 * @fileoverview Card component linking to a specific genre's full movie catalog.
 */

import {ReactElement} from "react";
import {Link} from "react-router-dom";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {SlugString} from "@/common/_schemas";
import {GenreName} from "@/domains/genres";
import {Plus} from "lucide-react";

/** Props for the HomepageGenreSeeMoreCard component. */
type CardProps = {
    name: GenreName;
    slug: SlugString;
};

/** Displays a call-to-action card that navigates to the full movie listing for a genre. */
export function HomepageGenreSeeMoreCard(
    {name, slug}: CardProps
): ReactElement {
    return (
        <Link to={`/browse/genres/${slug}`}>
            <Card className="overflow-hidden hover:shadow-md h-full">
                <CardContent className="p-3 space-y-4 flex flex-col justify-center items-center h-full">
                    <Plus/>
                    <p className="text-center">See More <br/> {name} Movies</p>
                </CardContent>
            </Card>
        </Link>
    );
}