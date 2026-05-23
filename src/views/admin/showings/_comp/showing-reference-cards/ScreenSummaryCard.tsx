/**
 * @fileoverview Admin summary card displaying high-level screen information.
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import buildString from "@/common/utility/buildString.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {Film, Search, Sofa, Theater} from "lucide-react";
import IconTextSpan from "@/common/components/card-content/IconTextSpan.tsx";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {TheatreScreenDetails} from "@/domains/theatre-screens/schema/model";
import {ReactElement} from "react";

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
                        <SectionHeader srOnly>
                            Screen Details Header
                        </SectionHeader>

                        <PrimaryHeaderText as="h2">
                            {name}
                        </PrimaryHeaderText>

                        <SecondaryHeaderText as="h2" className="text-xs">
                            {screenType}
                        </SecondaryHeaderText>
                    </section>

                    <IconButton onClick={navigateToScreen}>
                        <Search/>
                    </IconButton>
                </div>

                <section
                    className={cn(
                        SecondaryTextBaseCSS,
                        "flex justify-between items-center",
                        "text-xs",
                    )}
                >
                    <SectionHeader srOnly>
                        Screen Metadata
                    </SectionHeader>

                    <IconTextSpan aria-description="Name Of Theatre">
                        <Theater/> {theatreName}
                    </IconTextSpan>

                    <IconTextSpan aria-description="Number Of Seats By Capacity">
                        <Sofa/> {formattedCapacity} Seats
                    </IconTextSpan>

                    <IconTextSpan aria-description="Upcoming Showings">
                        <Film/> {futureShowingCount} Showings
                    </IconTextSpan>
                </section>
            </CardContent>
        </Card>
    );
}
