/**
 * @file ShowingEditPage.tsx
 *
 * Admin page for editing an existing `Showing`.
 *
 * Handles:
 * - Route parameter validation via slug
 * - Showing data fetching and schema validation
 * - Transformation of API data into form-ready values
 * - Submission success navigation
 */

import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingEditHeader from "@/pages/showings/components/headers/ShowingEditHeader.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import ShowingSubmitFormContainer from "@/pages/showings/components/forms/ShowingSubmitFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ShowingDetailsSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import simplifyShowingDetails from "@/pages/showings/utilities/simplifyShowingDetails.ts";
import ShowingEditBreadcrumbs from "@/pages/showings/components/features/showing-edit-page/ShowingEditBreadcrumbs.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchShowingBySlug from "@/pages/showings/hooks/queries/useFetchShowingBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Page component for editing a Showing.
 */
const ShowingEditPage: FC = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        sourceComponent: ShowingEditPage.name,
        errorTo: "/admin/showings",
        errorMessage: "Failed to resolve route parameters.",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const query = useFetchShowingBySlug({
        slug,
        config: {populate: true, virtuals: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={ShowingDetailsSchema}>
            {(showing: ShowingDetails) => {
                const navigate = useLoggedNavigate();

                const {theatre: {location: {timezone}}} = showing;
                const simplifiedShowing = simplifyShowingDetails(showing);

                const onSuccess = (updated: ShowingDetails) => {
                    navigate({
                        level: "log",
                        component: ShowingEditPage.name,
                        message: "Navigate to showing after update.",
                        to: `/admin/showings/get/${updated._id}`,
                    });
                };

                return (
                    <PageFlexWrapper>
                        <ShowingEditBreadcrumbs showing={showing}/>
                        <ShowingEditHeader showing={showing}/>

                        <Card>
                            <CardContent className="p-3">
                                <ShowingSubmitFormContainer
                                    entity={simplifiedShowing}
                                    theatreTimezone={timezone}
                                    onSubmitSuccess={onSuccess}
                                />
                            </CardContent>
                        </Card>
                    </PageFlexWrapper>
                );
            }}
        </ValidatedDataLoader>
    );
};

export default ShowingEditPage;
