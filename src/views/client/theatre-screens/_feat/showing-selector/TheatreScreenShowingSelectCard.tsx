/**
 * @fileoverview Card component for displaying screen metadata alongside a selectable list of its associated showings.
 */

import {TheatreScreenSchedule} from "@/domains/theatre-screens/schema/model";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import {
    BrowseShowingSelector
} from "@/views/client/showings/_comp/browse-showing-selector/BrowseShowingSelector.tsx";
import {ReactElement} from "react";

/** Props for the TheatreScreenShowingSelectCard component. */
type CardProps = {
    screen: TheatreScreenSchedule;
};

/**
 * Renders screen information and iterates through available showings, providing an empty state if none exist.
 */
export function TheatreScreenShowingSelectCard(
    {screen}: CardProps
): ReactElement {
    const {name, screenType, showings} = screen;

    const emptySection = (
        <div className={cn(RoundedBorderCSS, "h-full min-h-28 flex justify-center items-center")}>
            <span className={cn(SecondaryTextBaseCSS, "select-none uppercase")}>
                No Showings
            </span>
        </div>
    );

    const showingSection = (
        <section className="grid grid-cols-1 gap-3">
            {showings.map(showing =>
                <BrowseShowingSelector
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
}