/**
 * @fileoverview Page component for creating a new showing in the admin panel.
 */
import {ReactElement} from 'react';
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {ShowingCreateHeader} from "@/views/admin/showings/create-page/header.tsx";
import {ShowingSubmitForm} from "@/views/admin/showings/_feat/submit-form/ShowingSubmitForm.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ShowingCreateBreadcrumbs} from "@/views/admin/showings/create-page/breadcrumbs.tsx";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {ShowingSubmitFormView} from "@/views/admin/showings/_feat/submit-form";
import {useNavigateToShowingDetails} from "@/domains/showings/_feat/navigation";

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
            <section className="space-y-2">
                <ShowingCreateBreadcrumbs/>
                <ShowingCreateHeader/>
            </section>

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
