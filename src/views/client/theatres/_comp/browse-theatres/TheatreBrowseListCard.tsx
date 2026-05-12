/**
 * @fileoverview Card component for displaying a theatre and its recent movie showings in the browse list.
 */

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import buildString from "@/common/utility/buildString.ts";
import ISO3166Alpha2ShortCountryConstant from "@/common/constants/country/ISO3166Alpha2ShortCountryConstant.ts";
import {
    TheatreShowingSelectSummary
} from "@/views/client/theatres/_comp/browse-theatres/TheatreShowingSelectSummary.tsx";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {HoverUnderlineCSS} from "@/common/constants/css/TextCSS.ts";
import {TheatreWithRecentShowings} from "@/domains/theatres/schema/theatre/TheatreWithRecentShowingsSchema.ts";

/** Props for the TheatreBrowseListCard component. */
type BrowseProps = {
    theatre: TheatreWithRecentShowings;
};

/** Renders a theatre card with location metadata and a list of selectable showings. */
export const TheatreBrowseListCard = ({theatre}: BrowseProps) => {
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
                    <LoggedLink to={`/browse/theatres/${slug}`} className={HoverUnderlineCSS}>
                        {name}
                    </LoggedLink>
                </CardTitle>
                <CardDescription>{locationString}</CardDescription>
            </CardHeader>

            <CardContent>
                <section className="grid grid-cols-1 gap-2">
                    {showings.map((showing) => (
                        <TheatreShowingSelectSummary
                            key={showing._id}
                            className={RoundedBorderCSS}
                            showing={showing}
                        />
                    ))}
                </section>
            </CardContent>
        </Card>
    );
}


