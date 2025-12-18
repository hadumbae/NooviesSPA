/**
 * @file ShowingCreatePage.tsx
 * @description
 * Page component for creating a new `Showing` in the admin panel.
 *
 * Combines:
 * - Breadcrumbs navigation (`ShowingCreateBreadcrumbs`)
 * - Page header (`ShowingCreateHeader`)
 * - Multi-step showing submission form (`ShowingSubmitFormContainer`)
 *
 * Handles navigation after a successful submission using `useLoggedNavigate`.
 *
 * @example
 * ```tsx
 * <ShowingCreatePage />
 * ```
 */

import { FC } from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingCreateHeader from "@/pages/showings/components/features/showing-create-page/ShowingCreateHeader.tsx";
import ShowingSubmitFormContainer from "@/pages/showings/components/forms/ShowingSubmitFormContainer.tsx";
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import ShowingCreateBreadcrumbs
    from "@/pages/showings/components/features/showing-create-page/ShowingCreateBreadcrumbs.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * `ShowingCreatePage` renders the full page for creating a new showing.
 *
 * Features:
 * - Displays breadcrumbs for navigation context
 * - Displays page header with title and instructions
 * - Includes multi-step form for submitting showing details
 * - Redirects to the newly created showing after successful submission
 *
 * @example
 * ```tsx
 * <ShowingCreatePage />
 * ```
 */
const ShowingCreatePage: FC = () => {
    const navigate = useLoggedNavigate();

    /**
     * Handles navigation to the newly created showing after form submission.
     *
     * @param showing - The newly created `Showing` object.
     */
    const onSubmit = (showing: ShowingDetails) => {
        navigate({
            level: "log",
            to: `/admin/showings/get/${showing._id}`,
            component: ShowingCreatePage.name,
            message: "Navigate to showing after creation.",
        });
    };

    return (
        <PageFlexWrapper>
            <section className="space-y-2">
                <ShowingCreateBreadcrumbs />
                <ShowingCreateHeader />
            </section>

            <Card>
                <CardContent className="p-3">
                    <ShowingSubmitFormContainer
                        onSubmitSuccess={onSubmit}
                    />
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
};

export default ShowingCreatePage;
