/**
 * @fileoverview Component for displaying the theatre and screen names for a specific showing.
 */

import {ReactElement} from "react";
import {TvMinimal} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {Theatre, TheatreDetails} from "@/domains/theatres";
import {TheatreScreen, TheatreScreenDetails} from "@/domains/theatre-screens";

/** Style overrides for the premises container and its labels. */
type PremisesClassNames = {
    container?: string;
    theatre?: string;
    screen?: string;
}

/** Props for the ShowingInfoPremises component. */
type InfoProps = {
    theatre: Theatre | TheatreDetails;
    screen: TheatreScreen | TheatreScreenDetails;
    classNames?: PremisesClassNames;
};

/**
 * Displays the theatre name as a link and the screen name with an icon.
 */
export function ShowingInfoPremises(
    {theatre, screen, classNames}: InfoProps
): ReactElement {
    const {name: theatreName, slug: theatreSlug, location: {city}} = theatre;
    const {name: screenName} = screen;

    return (
        <div className={cn("flex flex-col", classNames?.container)}>
            <div className="flex justify-between items-center">
                <LoggedLink
                    to={`/browse/theatres/${theatreSlug}`}
                    className={cn(
                        "font-extrabold primary-text line-clamp-1",
                        "hover:underline hover:underline-offset-4",
                        classNames?.theatre
                    )}
                >
                    {theatreName}
                </LoggedLink>

                <span className="secondary-text font-bold">
                    {city}
                </span>
            </div>

            <div className={cn(
                "text-with-icon text-sm font-bold secondary-text",
                classNames?.screen
            )}>
                <TvMinimal/> {screenName}
            </div>
        </div>
    );
}
