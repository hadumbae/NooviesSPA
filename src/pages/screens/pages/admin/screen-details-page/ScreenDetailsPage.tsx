import PageLoader from "@/common/components/page/PageLoader.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {SeatDetailsArray} from "@/pages/seats/schema/seat/SeatRelated.types.ts";
import ScreenDetailsPageContent from "@/pages/screens/pages/admin/screen-details-page/ScreenDetailsPageContent.tsx";
import {ReactElement} from "react";
import ScreenDetailsUIContextProvider from "@/pages/screens/contexts/screen-details/ScreenDetailsUIContextProvider.tsx";
import ScreenFormContextProvider from "@/pages/screens/contexts/screen-form/ScreenFormContextProvider.tsx";
import {ScreenForm, ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import simplifyScreenDetails from "@/pages/screens/utilities/simplifyScreenDetails.ts";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {ScreenDetailsRouteParamSchema} from "@/pages/screens/schema/params/ScreenDetailsRouteParamSchema.ts";
import useScreenDetailsPageQueries from "@/pages/screens/hooks/page/screen-details/useScreenDetailsPageQueries.ts";

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
    const routeParams = useFetchByIdentifierRouteParams({
        schema: ScreenDetailsRouteParamSchema,
        errorTo: "admin/theatres",
        errorMessage: "Failed to parse theatre and screen route parameters.",
        sourceComponent: ScreenDetailsPage.name,
    });

    if (!routeParams) {
        return <PageLoader/>;
    }

    const queries = useScreenDetailsPageQueries(routeParams);

    return (
        <MultiQueryDataLoader queries={queries}>
                {(data) => {
                    const {theatre, screen, seats} = data as QueryData;

                    const simplifiedScreen = simplifyScreenDetails(screen);
                    const presetValues: Partial<ScreenForm> = {theatre: theatre._id};
                    const disableFields: (keyof ScreenFormValues)[] = ["theatre"];

                    return (
                        <ScreenDetailsUIContextProvider>
                            <ScreenFormContextProvider
                                presetValues={presetValues}
                                disableFields={disableFields}
                                editEntity={simplifiedScreen}
                            >
                                <ScreenDetailsPageContent
                                    theatre={theatre}
                                    screen={screen}
                                    seats={seats}
                                />
                            </ScreenFormContextProvider>
                        </ScreenDetailsUIContextProvider>
                    );
                }}
        </MultiQueryDataLoader>
    );
};

export default ScreenDetailsPage;
