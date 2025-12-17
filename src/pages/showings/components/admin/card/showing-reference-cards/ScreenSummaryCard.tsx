import { ScreenDetails } from "@/pages/screens/schema/screen/Screen.types.ts";
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import buildString from "@/common/utility/buildString.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import { Film, Search, Sofa, Theater } from "lucide-react";
import IconTextSpan from "@/common/components/card-content/IconTextSpan.tsx";
import { cn } from "@/common/lib/utils.ts";
import { SecondaryTextBaseCSS } from "@/common/constants/css/TextCSS.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

type CardProps = {
    /** Fully populated screen details */
    screen: ScreenDetails;
};

/**
 * Admin summary card displaying high-level screen information.
 *
 * @remarks
 * - Shows screen name and type.
 * - Displays capacity, seat usage, and upcoming showings.
 * - Provides a quick navigation action to the screen detail page.
 * - Includes screen-reader-only section headers for accessibility.
 */
const ScreenSummaryCard = ({ screen }: CardProps) => {
    const {
        _id: screenID,
        name,
        screenType,
        futureShowingCount,
        seatCount,
        capacity,
        theatre: { _id: theatreID, name: theatreName },
    } = screen;

    // --- Navigation ---
    const navigate = useLoggedNavigate();

    const navigateToScreen = () => {
        navigate({
            level: "log",
            component: ScreenSummaryCard.name,
            message: "Navigate to screen from summary.",
            to: `/admin/theatres/get/${theatreID}/screen/${screenID}`,
        });
    };

    // --- Formatted Strings ---
    const formattedCapacity = buildString([seatCount, capacity], "/");

    // --- Render ---
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
                        <Search />
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
                        <Theater /> {theatreName}
                    </IconTextSpan>

                    <IconTextSpan aria-description="Number Of Seats By Capacity">
                        <Sofa /> {formattedCapacity} Seats
                    </IconTextSpan>

                    <IconTextSpan aria-description="Upcoming Showings">
                        <Film /> {futureShowingCount} Showings
                    </IconTextSpan>
                </section>
            </CardContent>
        </Card>
    );
};

export default ScreenSummaryCard;
