/**
 * @fileoverview Navigation links for the seat map details panel.
 */

import {ReactElement} from "react";
import {Clapperboard, Theater, TvMinimal} from "lucide-react";
import {PanelCardLink} from "@/views/common/_feat";
import {buildString} from "@/common/_feat";
import {ShowingDetails} from "@/domains/showings";
import {SROnly} from "@/views/common/_comp";

/** Props for the SeatMapDetailsReferenceLinks component. */
type SectionProps = {
    showing: ShowingDetails;
};

/** Renders navigational links to the movie, theatre, and screen associated with a showing. */
export function SeatMapDetailsReferenceLinks({showing}: SectionProps): ReactElement {
    const {
        movie: {_id: movieID, title: movieTitle, releaseDate},
        screen: {slug: screenSlug, name: screenName},
        theatre: {slug: theatreSlug, name: theatreName},
    } = showing;

    const formattedMovieTitle = buildString([
        movieTitle,
        releaseDate && `(${releaseDate.toFormat("yyyy")})`,
    ]);

    return (
        <section>
            <SROnly text="Showing Links"/>

            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <PanelCardLink
                        className="col-span-2"
                        to={`/admin/movies/get/${movieID}`}
                        icon={Clapperboard}
                        text={formattedMovieTitle}
                    />

                    <PanelCardLink
                        to={`/admin/theatres/get/${theatreSlug}`}
                        icon={Theater}
                        text={theatreName}
                    />

                    <PanelCardLink
                        to={`/admin/theatres/get/${theatreSlug}/screen/${screenSlug}`}
                        icon={TvMinimal}
                        text={screenName}
                    />
                </div>
            </div>
        </section>
    );
}
