import { FC } from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreSubmitFormContainer from "@/pages/theatres/components/theatre-submit-form/TheatreSubmitFormContainer.tsx";
import { Theatre } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import TheatreCreateHeader from "@/pages/theatres/components/headers/TheatreCreateHeader.tsx";
import TheatreCreateBreadcrumbs from "@/pages/theatres/components/breadcrumbs/admin/TheatreCreateBreadcrumbs.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * **TheatreCreatePage**
 *
 * Page component for creating a new theatre.
 *
 * Features:
 * - Displays breadcrumbs and a header for theatre administration.
 * - Renders a form panel for creating a new theatre via {@link TheatreSubmitFormContainer}.
 * - On successful submission, navigates to the newly created theatre's detail page.
 *
 * @component
 *
 * @example
 * ```tsx
 * <TheatreCreatePage />
 * ```
 */
const TheatreCreatePage: FC = () => {
    const navigate = useLoggedNavigate();

    /**
     * Callback executed when the theatre is successfully created.
     * Navigates to the theatre detail page.
     *
     * @param theatre - The theatre entity returned from the form submission.
     */
    const onSubmit = (theatre: Theatre) => {
        navigate({
            to: `/admin/theatres/get/${theatre._id}`,
            component: TheatreCreatePage.name,
            message: "Navigation on theatre creation."
        });
    }

    return (
        <PageFlexWrapper>
            <TheatreCreateBreadcrumbs />
            <TheatreCreateHeader />

            <PageSection srTitle="Theatre Create Form">
                <Card>
                    <CardContent className="p-4">
                        <TheatreSubmitFormContainer onSubmitSuccess={onSubmit} />
                    </CardContent>
                </Card>
            </PageSection>
        </PageFlexWrapper>
    );
};

export default TheatreCreatePage;
