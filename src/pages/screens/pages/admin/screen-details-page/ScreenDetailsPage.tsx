import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchTheatre from "@/pages/theatres/hooks/query/useFetchTheatre.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import useFetchScreen from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreen.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {ScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import useFetchRouteParams from "@/common/hooks/router/useFetchRouteParams.ts";
import {TheatreScreenRouteParamSchema} from "@/pages/theatres/schema/params/TheatreScreenRouteParamSchema.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useFetchSeats from "@/pages/seats/hooks/query/useFetchSeats.ts";
import {SeatDetailsArraySchema} from "@/pages/seats/schema/seat/SeatRelated.schema.ts";
import {SeatDetailsArray} from "@/pages/seats/schema/seat/SeatRelated.types.ts";
import ScreenDetailsPageContent from "@/pages/screens/pages/admin/screen-details-page/ScreenDetailsPageContent.tsx";
import {ReactElement} from "react";

type QueryData = {
    theatre: TheatreDetails;
    screen: ScreenDetails;
    seats: SeatDetailsArray;
}

/**
 * Page component displaying detailed information for a specific theatre screen.
 *
 * Includes:
 * - Breadcrumb navigation for the theatre and screen
 * - Header with screen details and action buttons
 * - Tabs for viewing seats and showings
 * - Seats tab renders `TheatreScreenSeatsByRowCard` for seat management
 * - Showings tab displays pagination info for screen showings
 *
 * Fetches theatre and screen data using `useFetchTheatre` and `useFetchScreen` hooks,
 * and validates them with Zod schemas via `CombinedValidatedQueryBoundary`.
 *
 * @component
 * @returns A JSX element rendering the full screen details page.
 */
const ScreenDetailsPage = (): ReactElement => {
    const navigate = useLoggedNavigate();
    const onError = () => navigate({level: "error", to: "admin/theatres"});

    const {theatreID, screenID} = useFetchRouteParams({
        schema: TheatreScreenRouteParamSchema,
        onError,
        onErrorMessage: "Failed to parse theatre and screen route parameters."
    }) ?? {};

    if (!theatreID || !screenID) return <PageLoader/>;

    const theatreQuery = useFetchTheatre<TheatreDetails>({_id: theatreID, virtuals: true, populate: true});
    const screenQuery = useFetchScreen<ScreenDetails>({_id: screenID, virtuals: true, populate: true});
    const seatQuery = useFetchSeats({
        queries: {
            populate: true,
            virtuals: true,
            theatre: theatreID,
            screen: screenID,
        }
    });

    const validationQueries: CombinedSchemaQuery[] = [
        {key: "theatre", query: theatreQuery, schema: TheatreDetailsSchema},
        {key: "screen", query: screenQuery, schema: ScreenDetailsSchema},
        {key: "seats", query: seatQuery, schema: SeatDetailsArraySchema},
    ];

    return (
        <CombinedQueryBoundary queries={[theatreQuery, screenQuery]}>
            <CombinedValidatedQueryBoundary queries={validationQueries}>
                {(data) => {
                    const {theatre, screen, seats} = data as QueryData;

                    return (
                        <ScreenDetailsPageContent
                            theatre={theatre}
                            screen={screen}
                            seats={seats}
                        />
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default ScreenDetailsPage;
