import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import { Clapperboard, Theater, TvMinimal } from "lucide-react";
import StackedIconCardLink
    from "@/common/components/navigation/logged-link/StackedIconCardLink.tsx";
import { ShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import buildString from "@/common/utility/buildString.ts";

/**
 * @summary
 * Props for {@link SeatMapDetailsReferenceLinks}.
 */
type SectionProps = {
    /**
     * Fully populated showing details used to build reference links.
     */
    showing: ShowingDetails;
};

/**
 * @component SeatMapDetailsReferenceLinks
 *
 * @description
 * Reference-link section for the SeatMap details context panel.
 *
 * Renders navigational links related to the current showing:
 * - Movie details page
 * - Theatre details page
 * - Screen details page
 *
 * @remarks
 * - Movie title is formatted with its release year when available.
 * - Uses `StackedIconCardLink` for consistent admin navigation cards.
 * - Layout is handled via a responsive two-column CSS grid.
 */
const SeatMapDetailsReferenceLinks = ({ showing }: SectionProps) => {
    const {
        movie: { _id: movieID, title: movieTitle, releaseDate },
        screen: { _id: screenID, name: screenName },
        theatre: { _id: theatreID, name: theatreName },
    } = showing;

    const formattedMovieTitle = buildString([
        movieTitle,
        releaseDate && `(${releaseDate.toFormat("yyyy")})`,
    ]);

    return (
        <section>
            <SectionHeader srOnly={true}>Showing Links</SectionHeader>

            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <StackedIconCardLink
                        className="col-span-2"
                        to={`/admin/movies/get/${movieID}`}
                        icon={Clapperboard}
                        text={formattedMovieTitle}
                    />

                    <StackedIconCardLink
                        to={`/admin/theatres/get/${theatreID}`}
                        icon={Theater}
                        text={theatreName}
                    />

                    <StackedIconCardLink
                        to={`/admin/theatres/get/${theatreID}/screen/${screenID}`}
                        icon={TvMinimal}
                        text={screenName}
                    />
                </div>
            </div>
        </section>
    );
};

export default SeatMapDetailsReferenceLinks;
