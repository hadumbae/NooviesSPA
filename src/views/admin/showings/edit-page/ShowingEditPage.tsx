/**
 * @fileoverview Admin page for editing an existing Showing.
 */

import {FC} from 'react';
import {PageFlexWrapper} from "@/views/common/_comp/page";
import ShowingEditHeader from "@/views/admin/showings/edit-page/ShowingEditHeader.tsx";
import {PageLoader} from "@/views/common/_comp/page";
import {
    ShowingSubmitFormContainer
} from "@/views/admin/showings/_feat/submit-form/ShowingSubmitFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {
    simplifyShowingDetails
} from "@/domains/showings/_feat/formatters/simplifyShowingDetails.ts";
import ShowingEditBreadcrumbs from "@/views/admin/showings/edit-page/ShowingEditBreadcrumbs.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchShowingBySlug} from "@/domains/showings/_feat/crud-hooks";

/**
 * Page component for editing a Showing.
 */
export const ShowingEditPage: FC = () => {
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
        schema: ShowingDetailsSchema,
    });

    return (
        <QueryDataLoader query={query}>
            {(showing: ShowingDetails) => {
                const navigate = useLoggedNavigate();

                const {theatre: {location: {timezone}}} = showing;
                const simplifiedShowing = simplifyShowingDetails(showing);

                const onSuccess = (updated: ShowingDetails) => {
                    navigate({
                        level: "log",
                        component: ShowingEditPage.name,
                        message: "Navigate to showing after update.",
                        to: `/admin/showings/get/${updated.slug}`,
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
        </QueryDataLoader>
    );
};


