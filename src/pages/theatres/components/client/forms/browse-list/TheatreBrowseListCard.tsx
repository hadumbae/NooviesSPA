/**
 * @file TheatreBrowseListCard.tsx
 *
 * Browse list card for displaying a theatre with its recent showings.
 *
 * Used in public browse contexts where theatres are rendered
 * alongside a small, preloaded subset of showings.
 */

import {TheatreWithRecentShowings} from "@/pages/theatres/schema/model/theatre/TheatreWithRecentShowings.types.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import buildString from "@/common/utility/buildString.ts";
import ISO3166Alpha2ShortCountryConstant from "@/common/constants/country/ISO3166Alpha2ShortCountryConstant.ts";
import TheatreShowingSelectSummary
    from "@/pages/theatres/components/client/forms/browse-list/TheatreShowingSelectSummary.tsx";
import {cn} from "@/common/lib/utils.ts";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {HoverUnderlineCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for {@link TheatreBrowseListCard}.
 */
type BrowseProps = {
    /** Theatre entity with recent showings populated */
    theatre: TheatreWithRecentShowings;
};

/**
 * Renders a theatre card with location metadata and selectable showings.
 *
 * Displays:
 * - Theatre name and location
 * - A list of recent showings with selection actions
 */
const TheatreBrowseListCard = ({theatre}: BrowseProps) => {
    // --- PARAMS ---
    const {name, location, slug, showings} = theatre;
    const {city, state, country} = location;

    // --- FORMAT ---
    const locationString = buildString(
        [city, state, ISO3166Alpha2ShortCountryConstant[country]],
        ", "
    );

    // --- RENDER ---
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
                            className={cn(RoundedBorderCSS, "p-3")}
                            showing={showing}
                        />
                    ))}
                </section>
            </CardContent>
        </Card>
    );
};

export default TheatreBrowseListCard;
