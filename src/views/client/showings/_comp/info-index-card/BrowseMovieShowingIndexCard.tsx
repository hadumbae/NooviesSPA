/**
 * @fileoverview A card component that displays location information and time selection for a movie showing.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/common/components/ui";
import {BrowseMovieShowingSelector, ShowingInfoPremises} from "@/views/client/showings/_comp";
import {PopulatedShowing, ShowingDetails} from "@/domains/showings";

/** Props for the BrowseMovieShowingIndexCard component. */
type CardProps = {
    showing: PopulatedShowing | ShowingDetails;
};

/** Card component displaying theatre and screen details alongside a showing time selector. */
export function BrowseMovieShowingIndexCard(
    {showing}: CardProps
): ReactElement {
    const {theatre, screen} = showing;

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <ShowingInfoPremises
                    theatre={theatre}
                    screen={screen}
                />

                <BrowseMovieShowingSelector showing={showing}/>
            </CardContent>
        </Card>
    );
}