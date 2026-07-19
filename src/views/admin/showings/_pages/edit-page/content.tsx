/**
 * @fileoverview Content layout for the showing edit page.
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {PageHeader} from "@/views/common/_comp";

import {ShowingDetails, simplifyShowingDetails, useNavigateToShowingDetails} from "@/domains/showings";
import {ShowingSubmitForm, ShowingSubmitFormView} from "@/views/admin/showings/_feat";
import {ShowingEditBreadcrumbs} from "@/views/admin/showings/_pages/edit-page/breadcrumbs.tsx";

/** Props for the ShowingEditPageContent component. */
type ContentProps = {
    showing: ShowingDetails;
};

/** Renders the editor form and header for a specific movie showing. */
export function ShowingEditPageContent(
    {showing}: ContentProps
): ReactElement {
    const navigate = useNavigateToShowingDetails();

    const {
        movie: {title},
        screen: {name: screenName},
        theatre: {name: theatreName, location: {timezone}},
    } = showing;
    const simplifiedShowing = simplifyShowingDetails(showing);

    const submitConfig = {
        onSubmitSuccess: (updated: ShowingDetails) => navigate({slug: updated.slug}),
    };

    return (
        <PageFlexWrapper>
            <PageHeader
                title={`Edit ${title}`}
                description={`Edit showing on ${screenName} at ${theatreName}`}
                breadcrumbs={<ShowingEditBreadcrumbs showing={showing}/>}
            />

            <Card>
                <CardContent className="p-3">
                    <ShowingSubmitForm
                        showing={simplifiedShowing}
                        theatreTimezone={timezone}
                        onSubmitConfig={submitConfig}
                    >
                        <ShowingSubmitFormView/>
                    </ShowingSubmitForm>
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
}