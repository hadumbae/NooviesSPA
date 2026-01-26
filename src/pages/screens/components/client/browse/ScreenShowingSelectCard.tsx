/**
 * @file ScreenShowingSelectCard.tsx
 *
 * Card component for displaying a screen and its associated showings.
 *
 * Used in theatre browsing flows to present:
 * - Screen metadata (name, type)
 * - A selectable list of showings
 * - An empty-state when no showings are available
 */

import {ScreenWithShowings} from "@/pages/screens/schema/screen/ScreenWithShowingsSchema.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import TheatreShowingSelectSummary
    from "@/pages/theatres/components/client/forms/browse-list/TheatreShowingSelectSummary.tsx";

/**
 * Props for {@link ScreenShowingSelectCard}.
 */
type CardProps = {
    /** Screen entity populated with its related showings */
    screen: ScreenWithShowings;
};

/**
 * Screen showing selection card.
 *
 * Renders:
 * - Screen title and type
 * - A list of available showings
 * - A placeholder state when no showings exist
 *
 * @param screen - Screen with populated showings
 */
const ScreenShowingSelectCard = (
    {screen}: CardProps
) => {
    const {name, screenType, showings} = screen;

    /** Empty-state UI when no showings are available */
    const emptySection = (
        <div className={cn(RoundedBorderCSS, "h-full min-h-28 flex justify-center items-center")}>
            <span className={cn(SecondaryTextBaseCSS, "select-none uppercase")}>
                No Showings
            </span>
        </div>
    );

    /** List of selectable showings */
    const showingSection = (
        <section className="grid grid-cols-1 gap-3">
            {showings.map(showing =>
                <TheatreShowingSelectSummary
                    key={showing._id}
                    showing={showing}
                    className={cn(RoundedBorderCSS, "p-3")}
                />
            )}
        </section>
    );

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{screenType}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                {
                    showings.length > 0
                        ? showingSection
                        : emptySection
                }
            </CardContent>
        </Card>
    );
};

export default ScreenShowingSelectCard;
