/**
 * @fileoverview Main content component for the theatre showing creation administrative page.
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {Card, CardContent} from "@/views/common/_comp/ui/card.tsx";
import {
    ShowingSubmitForm,
    ShowingSubmitStorageKey
} from "@/views/admin/showings/_feat/submit-form/ShowingSubmitForm.tsx";
import {ReactElement} from "react";

import {Theatre} from "@/domains/theatres/_schema/theatre/TheatreSchema.ts";
import {ShowingSubmitFormView} from "@/views/admin/showings/_feat/submit-form";
import {PageHeader} from "@/views/common/_comp";
import {TheatreShowingCreateBreadcrumbs} from "@/views/admin/theatres";

/** Props for the TheatreShowingCreatePageContent component. */
type ContentProps = {
    theatre: Theatre;
};

/**
 * Renders the layout for the showing creation flow, including the header and submission form.
 */
export function TheatreShowingCreatePageContent(
    {theatre}: ContentProps
): ReactElement {
    const navigate = useLoggedNavigate();
    const {_id: theatreID, name: theatreName, slug: theatreSlug} = theatre;

    const onSubmit = () => {
        navigate({
            to: `/admin/theatres/get/${theatreSlug}/showings/list`,
            level: "log",
            message: "Navigate To Theatre's List Of Showing.",
            component: TheatreShowingCreatePageContent.name,
        });
    };

    return (
        <PageFlexWrapper>
            <PageHeader
                title={`${theatreName} | Showings`}
                description="Create showings for theatre here."
                breadcrumbs={
                    <TheatreShowingCreateBreadcrumbs
                        theatreSlug={theatreSlug}
                        theatreName={theatreName}
                    />
                }
            />

            <Card>
                <CardContent className="p-3">
                    <ShowingSubmitForm
                        localStorageKey={ShowingSubmitStorageKey}
                        presetValues={{theatre: theatreID}}
                        onSubmitSuccess={onSubmit}
                        resetOnSuccess={true}
                    >
                        <ShowingSubmitFormView disableFields={{theatre: true}}/>
                    </ShowingSubmitForm>
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
}