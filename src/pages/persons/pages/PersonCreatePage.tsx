import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PersonSubmitFormContainer from "@/pages/persons/components/form/admin/submit/PersonSubmitFormContainer.tsx";
import PersonCreateHeader from "@/pages/persons/components/headers/PersonCreateHeader.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import PersonCreateBreadcrumbs from "@/pages/persons/components/breadcrumbs/admin/PersonCreateBreadcrumbs.tsx";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Page component for creating a new person (actor or crew) in the admin interface.
 *
 * @remarks
 * - Renders breadcrumbs, page header, and the person submission form.
 * - Uses {@link PersonSubmitFormContainer} for handling form input and submission.
 * - Navigates to the newly created person's details page upon successful submission.
 * - Organized using {@link PageFlexWrapper} and {@link PageSection} for layout.
 *
 * @example
 * ```tsx
 * <PersonCreatePage />
 * ```
 */
const PersonCreatePage: FC = () => {
    const navigate = useLoggedNavigate();

    /**
     * Handles successful form submission.
     *
     * @param person - The newly created person object.
     * @remarks
     * Navigates to the person's details page using their `_id`.
     */
    const onSubmit = (person: Person) => {
        navigate({to: `/admin/persons/get/${person._id}`, component: PersonCreatePage.name});
    };

    return (
        <PageFlexWrapper>
            {/* Page header section */}
            <PageSection srTitle="Person Create Header">
                <PersonCreateBreadcrumbs />
                <PersonCreateHeader />
            </PageSection>

            {/* Person creation form section */}
            <PageSection srTitle="Person Create Form">
                <Card>
                    <CardContent className="p-4">
                        <PersonSubmitFormContainer onSubmitSuccess={onSubmit} />
                    </CardContent>
                </Card>
            </PageSection>
        </PageFlexWrapper>
    );
};

export default PersonCreatePage;
