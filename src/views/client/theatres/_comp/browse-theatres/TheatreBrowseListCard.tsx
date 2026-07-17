/**
 * @fileoverview Card component for displaying a theatre and its recent movie showings in the browse list.
 */

import {ReactElement} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui";
import {buildString} from "@/common/_feat/formatters/buildString.ts";
import {ISO3166Alpha2ShortCountryConstant} from "@/common/_const";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {TheatreWithRecentShowings} from "@/domains/theatres";
import {BrowseTheatreShowingSelector} from "@/views/client/showings/_comp";

/** Props for the TheatreBrowseListCard component. */
type BrowseProps = {
    theatre: TheatreWithRecentShowings;
};

/** Renders a theatre card with location metadata and a list of selectable showings. */
export function TheatreBrowseListCard({theatre}: BrowseProps): ReactElement {
    const {name, location, slug, showings} = theatre;
    const {city, state, country} = location;

    const locationString = buildString(
        [city, state, ISO3166Alpha2ShortCountryConstant[country]],
        ", "
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <LoggedLink to={`/browse/theatres/${slug}`} className="hover-underline">
                        {name}
                    </LoggedLink>
                </CardTitle>
                <CardDescription>{locationString}</CardDescription>
            </CardHeader>

            <CardContent>
                <section className="grid grid-cols-1 gap-2">
                    {showings.map((showing) => (
                        <BrowseTheatreShowingSelector
                            key={showing._id}
                            className="rounded-container-border"
                            showing={showing}
                            timezone={theatre.location.timezone}
                        />
                    ))}
                </section>
            </CardContent>
        </Card>
    );
}


