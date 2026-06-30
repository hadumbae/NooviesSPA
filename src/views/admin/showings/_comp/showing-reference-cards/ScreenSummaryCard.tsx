/**
 * @fileoverview Admin summary card displaying high-level screen information.
 */

import {ReactElement} from "react";
import {Film, Search, Sofa, Theater} from "lucide-react";
import {Card, CardContent} from "@/common/components/ui";
import buildString from "@/common/utility/buildString.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {TheatreScreenDetails} from "@/domains/theatre-screens";
import {SROnly, SubsectionSubtitle, SubsectionTitle} from "@/views/common/_comp";

/** Props for the ScreenSummaryCard component. */
type CardProps = {
    screen: TheatreScreenDetails;
};

/**
 * Admin summary card displaying high-level screen information.
 */
export function ScreenSummaryCard({screen}: CardProps): ReactElement {
    const {
        name,
        screenType,
        futureShowingCount,
        seatCount,
        capacity,
        slug: screenSlug,
        theatre: {slug: theatreSlug, name: theatreName},
    } = screen;

    const navigate = useLoggedNavigate();

    const navigateToScreen = () => {
        navigate({
            level: "log",
            component: ScreenSummaryCard.name,
            message: "Navigate to screen from summary.",
            to: `/admin/theatres/get/${theatreSlug}/screen/${screenSlug}`,
        });
    };

    const formattedCapacity = buildString([seatCount, capacity], "/");

    return (
        <Card>
            <CardContent className="px-5 py-3 space-y-4">
                <div className="flex justify-between items-center">
                    <section>
                        <SROnly text="Screen Details Header"/>
                        <SubsectionTitle as="h2">{name}</SubsectionTitle>
                        <SubsectionSubtitle as="h2" className="text-xs">{screenType}</SubsectionSubtitle>
                    </section>

                    <IconButton onClick={navigateToScreen}>
                        <Search/>
                    </IconButton>
                </div>

                <section className="secondary-text flex justify-between items-center text-xs">
                    <SROnly text="Screen Metadata" />

                    <span className="text-with-icon" aria-description="Name Of Theatre">
                        <Theater/> {theatreName}
                    </span>

                    <span className="text-with-icon" aria-description="Number Of Seats By Capacity">
                        <Sofa/> {formattedCapacity} Seats
                    </span>

                    <span className="text-with-icon" aria-description="Upcoming Showings">
                        <Film/> {futureShowingCount} Showings
                    </span>
                </section>
            </CardContent>
        </Card>
    );
}
