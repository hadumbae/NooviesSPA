/**
 * Showing Edit Page
 *
 * Admin page for editing an existing showing.
 * Handles route parameter validation, data fetching,
 * schema validation, and rendering of the edit form.
 */

import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingEditHeader from "@/pages/showings/components/headers/ShowingEditHeader.tsx";
import useFetchShowing from "@/pages/showings/hooks/queries/useFetchShowing.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import ShowingSubmitFormContainer from "@/pages/showings/components/forms/ShowingSubmitFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import useFetchRouteParams from "@/common/hooks/router/useFetchRouteParams.ts";
import {IDRouteParamSchema} from "@/common/schema/route-params/IDRouteParamSchema.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {ShowingDetailsSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import simplifyShowingDetails from "@/pages/showings/utilities/simplifyShowingDetails.ts";
import ShowingEditBreadcrumbs from "@/pages/showings/components/features/showing-edit-page/ShowingEditBreadcrumbs.tsx";

/**
 * Page component responsible for editing a showing.
 */
const ShowingEditPage: FC = () => {
    // --- Fetch Route Params ---
    const navigate = useLoggedNavigate();

    const onError = () => {
        navigate({
            level: "warn",
            component: ShowingEditPage.name,
            message: "Failed to fetch required route params. Please try again.",
            to: "/admin/showings"
        });
    };

    const {_id: showingID} = useFetchRouteParams({
        schema: IDRouteParamSchema,
        onError,
        onErrorMessage: "Invalid Route Params",
    }) ?? {};

    if (!showingID) {
        return <PageLoader />;
    }

    // --- Query ---
    const query = useFetchShowing({
        _id: showingID,
        populate: true,
        virtuals: true,
    });

    // --- Render ---
    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={ShowingDetailsSchema}>
                {(showing: ShowingDetails) => {
                    const {theatre: {location: {timezone}}} = showing;

                    const simplifiedShowing = simplifyShowingDetails(showing);

                    const onSubmit = (showing: ShowingDetails) => {
                        navigate({
                            level: "log",
                            component: ShowingEditPage.name,
                            message: "Navigate to showing after update.",
                            to: `/admin/showings/get/${showing._id}`,
                        });
                    };

                    return (
                        <PageFlexWrapper>
                            <ShowingEditBreadcrumbs showing={showing} />
                            <ShowingEditHeader showing={showing} />

                            <Card>
                                <CardContent className="p-3">
                                    <ShowingSubmitFormContainer
                                        onSubmitSuccess={onSubmit}
                                        entity={simplifiedShowing}
                                        theatreTimezone={timezone}
                                    />
                                </CardContent>
                            </Card>
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default ShowingEditPage;
