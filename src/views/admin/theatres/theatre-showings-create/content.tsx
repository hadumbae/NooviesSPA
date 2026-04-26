/**
 * @fileoverview Main content component for the theatre showing creation administrative page.
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {TheatreShowingCreateHeader}
    from "@/views/admin/theatres/theatre-showings-create/header.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import ShowingSubmitFormContainer from "@/domains/showings/components/forms/ShowingSubmitFormContainer.tsx";
import {ReactElement} from "react";

import {Theatre} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";

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
    const {_id: theatreID, name: theatreName} = theatre;

    const onSubmit = () => {
        navigate({
            to: `/admin/theatres/get/${theatreID}/showings/list`,
            level: "log",
            message: "Navigate To Theatre's List Of Showing.",
            component: TheatreShowingCreatePageContent.name,
        });
    };

    return (
        <PageFlexWrapper>
            <TheatreShowingCreateHeader
                theatreID={theatreID}
                theatreName={theatreName}
            />

            <Card>
                <CardContent className="p-3">
                    <ShowingSubmitFormContainer
                        onSubmitSuccess={onSubmit}
                        presetValues={{theatre: theatreID}}
                        disableFields={["theatre"]}
                    />
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
}