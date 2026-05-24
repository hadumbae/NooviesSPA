/**
 * @fileoverview Content layout for the showing edit page.
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {ShowingEditHeader} from "@/views/admin/showings/edit-page/header.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ShowingSubmitForm, ShowingSubmitFormView} from "@/views/admin/showings/_feat/submit-form";
import {useNavigateToShowingDetails} from "@/domains/showings/_feat/navigation";
import {simplifyShowingDetails} from "@/domains/showings/_feat/formatters";
import {ShowingDetails} from "@/domains/showings/schema/showing";

/** Props for the ShowingEditPageContent component. */
type ContentProps = {
    showing: ShowingDetails;
};

/** Renders the editor form and header for a specific movie showing. */
export function ShowingEditPageContent(
    {showing}: ContentProps
): ReactElement {
    const navigate = useNavigateToShowingDetails();

    const {theatre: {location: {timezone}}} = showing;
    const simplifiedShowing = simplifyShowingDetails(showing);

    const submitConfig = {
        onSubmitSuccess: (updated: ShowingDetails) => navigate({slug: updated.slug}),
    };

    return (
        <PageFlexWrapper>
            <ShowingEditHeader showing={showing}/>

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