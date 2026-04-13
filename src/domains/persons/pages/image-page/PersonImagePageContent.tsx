/**
 * @file PersonImagePageContent.tsx
 *
 * Presentational component for managing a person's profile image.
 * Renders breadcrumbs, header, and an image upload form.
 */

import {Person, PersonDetails} from "@/domains/persons/schema/person/Person.types.ts";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import PersonImageDetailsBreadcrumbs
    from "@/domains/persons/components/breadcrumbs/admin/PersonImageDetailsBreadcrumbs.tsx";
import PersonProfileImageHeader from "@/domains/persons/components/headers/PersonProfileImageHeader.tsx";
import PageSection from "@/views/common/_comp/page/PageSection.tsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/common/components/ui/card.tsx";
import UploadPersonProfileImageFormContainer
    from "@/domains/persons/components/form/admin/profile-image/UploadPersonProfileImageFormContainer.tsx";
import {useNavigateToPerson} from "@/domains/persons/hooks/navigation/useNavigateToPerson.ts";

/**
 * Props for {@link PersonImagePageContent}.
 */
type ContentProps = {
    /** Fully populated person details. */
    person: PersonDetails;
};

/**
 * Renders the person profile image management UI.
 *
 * @remarks
 * - Displays contextual breadcrumbs and headers.
 * - Wraps the profile image upload form.
 * - Navigates back to the person details page on successful upload.
 *
 * @example
 * ```tsx
 * <PersonImagePageContent person={person} />
 * ```
 */
const PersonImagePageContent = ({person}: ContentProps) => {
    const navigate = useNavigateToPerson();
    const {_id, name, slug} = person;

    const onUpdate = (updated: Person) =>
        navigate({
            slug: updated.slug,
            message: "Navigation on successful update to person's profile image.",
            component: PersonImagePageContent.name,
        });

    return (
        <PageFlexWrapper className="space-y-5">
            <header className="space-y-5">
                <PersonImageDetailsBreadcrumbs personSlug={slug} name={name}/>
                <PersonProfileImageHeader name={name}/>
            </header>

            <PageSection>
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Images</CardTitle>
                        <CardDescription>
                            Select an image and click on `Submit`.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <UploadPersonProfileImageFormContainer
                            personID={_id}
                            onSubmitSuccess={onUpdate}
                        />
                    </CardContent>
                </Card>
            </PageSection>
        </PageFlexWrapper>
    );
};

export default PersonImagePageContent;
