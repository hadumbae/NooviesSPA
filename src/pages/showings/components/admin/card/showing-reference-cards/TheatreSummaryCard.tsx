import { TheatreDetails } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import buildString from "@/common/utility/buildString.ts";
import ISO3166Alpha2ShortCountryConstant from "@/common/constants/country/ISO3166Alpha2ShortCountryConstant.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import { Film, Search, Sofa, TvMinimal } from "lucide-react";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import IconTextSpan from "@/common/components/card-content/IconTextSpan.tsx";
import { cn } from "@/common/lib/utils.ts";
import { SecondaryTextBaseCSS } from "@/common/constants/css/TextCSS.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

type CardProps = {
    /** Fully populated theatre details */
    theatre: TheatreDetails;
};

/**
 * Admin summary card displaying high-level theatre information.
 *
 * @remarks
 * - Shows theatre name and formatted address.
 * - Displays derived counts (screens, seats, future showings).
 * - Provides a quick navigation action to the theatre detail page.
 */
const TheatreSummaryCard = ({ theatre }: CardProps) => {
    // --- Theatre ---
    const {
        _id,
        name,
        seatCount,
        futureShowingCount,
        screenCount,
        location: { street, city, country },
    } = theatre;

    // --- Navigation ---
    const navigate = useLoggedNavigate();

    const navigateToTheatre = () => {
        navigate({
            level: "log",
            component: TheatreSummaryCard.name,
            message: "Navigate to theatre from summary.",
            to: `/admin/theatres/get/${_id}`,
        });
    };

    // --- Formatted Strings ---
    const formattedAddress = buildString(
        [street, city, ISO3166Alpha2ShortCountryConstant[country]],
        ", "
    );

    // --- Render ---
    return (
        <Card>
            <CardContent className="px-5 py-3 space-y-4">
                <div className="flex justify-between items-center">
                    <section>
                        <SectionHeader srOnly={true}>Theatre Details Header</SectionHeader>

                        <PrimaryHeaderText as="h2">
                            {name}
                        </PrimaryHeaderText>

                        <SecondaryHeaderText as="h3" className="text-xs">
                            {formattedAddress}
                        </SecondaryHeaderText>
                    </section>

                    <IconButton onClick={navigateToTheatre}>
                        <Search />
                    </IconButton>
                </div>

                <div
                    className={cn(
                        SecondaryTextBaseCSS,
                        "flex justify-between items-center",
                        "text-xs",
                    )}
                >
                    <IconTextSpan aria-description="Number Of Screens">
                        <TvMinimal /> {screenCount} Screens
                    </IconTextSpan>

                    <IconTextSpan aria-description="Number Of Seats">
                        <Sofa /> {seatCount} Seats
                    </IconTextSpan>

                    <IconTextSpan aria-description="Number Of Upcoming Showings">
                        <Film /> {futureShowingCount} Showings
                    </IconTextSpan>
                </div>
            </CardContent>
        </Card>
    );
};

export default TheatreSummaryCard;
