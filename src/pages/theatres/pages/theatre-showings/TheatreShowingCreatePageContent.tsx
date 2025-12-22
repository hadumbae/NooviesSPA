/**
 * @file TheatreShowingCreatePageContent.tsx
 *
 * @summary
 * Page content component for creating a new showing for a theatre.
 */

import { Theatre, TheatreDetails } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import TheatreShowingCreateBreadcrumbs
    from "@/pages/theatres/components/admin/pages/theatre-showing-create/TheatreShowingCreateBreadcrumbs.tsx";
import TheatreShowingCreateHeader
    from "@/pages/theatres/components/admin/pages/theatre-showing-create/TheatreShowingCreateHeader.tsx";
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import ShowingSubmitFormContainer from "@/pages/showings/components/forms/ShowingSubmitFormContainer.tsx";

/**
 * Props for {@link TheatreShowingCreatePageContent}.
 */
type ContentProps = {
    /** Theatre entity used for routing and display */
    theatre: Theatre | TheatreDetails;
};

/**
 * Renders the main content area for the theatre showing creation page.
 *
 * Handles:
 * - Breadcrumb and header rendering
 * - Showing creation form submission
 * - Post-submit navigation back to the showing list
 *
 * @param props - Component props
 * @returns Theatre showing creation page content
 */
const TheatreShowingCreatePageContent = ({ theatre }: ContentProps) => {
    const navigate = useLoggedNavigate();
    const { _id: theatreID, name: theatreName } = theatre;

    // --- Handlers ---
    const onSubmit = () => {
        navigate({
            to: `/admin/theatres/get/${theatreID}/showings/list`,
            level: "log",
            message: "Navigate To Theatre's List Of Showing.",
            component: TheatreShowingCreatePageContent.name,
        });
    };

    // --- Render ---
    return (
        <PageFlexWrapper>
            <section className="space-y-2">
                <TheatreShowingCreateBreadcrumbs
                    theatreID={theatreID}
                    theatreName={theatreName}
                />
                <TheatreShowingCreateHeader
                    theatreID={theatreID}
                    theatreName={theatreName}
                />
            </section>

            <Card>
                <CardContent className="p-3">
                    <ShowingSubmitFormContainer
                        onSubmitSuccess={onSubmit}
                        presetValues={{ theatre: theatreID }}
                        disableFields={["theatre"]}
                    />
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
};

export default TheatreShowingCreatePageContent;
