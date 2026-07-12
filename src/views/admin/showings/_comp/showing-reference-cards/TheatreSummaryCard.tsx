/**
 * @fileoverview Admin summary card component for displaying high-level theatre information.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/common/components/ui";
import {Film, Search, Sofa, TvMinimal} from "lucide-react";
import buildString from "@/common/utility/buildString.ts";
import ISO3166Alpha2ShortCountryConstant from "@/common/constants/country/ISO3166Alpha2ShortCountryConstant.ts";
import {IconButton} from "@/views/common/_comp";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {TheatreDetails} from "@/domains/theatres";
import {SROnly, SubsectionSubtitle, SubsectionTitle} from "@/views/common/_comp";

/** Props for the TheatreSummaryCard component. */
type CardProps = {
    theatre: TheatreDetails;
};

/**
 * Admin summary card displaying high-level theatre information and navigation to details.
 */
export function TheatreSummaryCard({theatre}: CardProps): ReactElement {
    const {
        name,
        seatCount,
        futureShowingCount,
        screenCount,
        location: {street, city, country},
        slug,
    } = theatre;

    const navigate = useLoggedNavigate();

    const navigateToTheatre = () => {
        navigate({
            level: "log",
            component: TheatreSummaryCard.name,
            message: "Navigate to theatre from summary.",
            to: `/admin/theatres/get/${slug}`,
        });
    };

    const formattedAddress = buildString(
        [street, city, ISO3166Alpha2ShortCountryConstant[country]],
        ", "
    );

    return (
        <Card>
            <CardContent className="px-5 py-3 space-y-4">
                <div className="flex justify-between items-center">
                    <section>
                        <SROnly text="Theatre Details Header"/>
                        <SubsectionTitle as="h2">{name}</SubsectionTitle>
                        <SubsectionSubtitle as="h3" className="text-xs">{formattedAddress}</SubsectionSubtitle>
                    </section>

                    <IconButton onClick={navigateToTheatre}>
                        <Search/>
                    </IconButton>
                </div>

                <div className="secondary-text flex justify-between items-center text-xs">
                    <span className="text-with-icon" aria-description="Number Of Screens">
                        <TvMinimal/> {screenCount} Screens
                    </span>

                    <span className="text-with-icon" aria-description="Number Of Seats">
                        <Sofa/> {seatCount} Seats
                    </span>

                    <span className="text-with-icon" aria-description="Number Of Upcoming Showings">
                        <Film/> {futureShowingCount} Showings
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
