/**
 * @fileoverview Page component for creating a new showing in the admin panel.
 */
import {ReactElement} from 'react';
import {PageHeader} from "@/views/common/_comp";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {Card, CardContent} from "@/views/common/_comp/ui";

import {ShowingDetails, useNavigateToShowingDetails} from "@/domains/showings";
import {ShowingSubmitForm, ShowingSubmitFormView} from "@/views/admin/showings/_feat";
import {ShowingCreateBreadcrumbs} from "@/views/admin/showings/_pages/create-page/breadcrumbs.tsx";

/**
 * Renders the full page layout and form container for creating a new showing.
 */
export function ShowingCreatePage(): ReactElement {
    const navigate = useNavigateToShowingDetails();
    const onShowingCreated = ({slug}: ShowingDetails) => {
        navigate({slug, message: "Navigate to showing after creation."});
    }

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Create Showings"
                description="Enter details and press on `Submit` to create showings."
                breadcrumbs={<ShowingCreateBreadcrumbs/>}
            />

            <Card>
                <CardContent className="p-3">
                    <ShowingSubmitForm onSubmitConfig={{onSubmitSuccess: onShowingCreated}}>
                        <ShowingSubmitFormView/>
                    </ShowingSubmitForm>
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
}
