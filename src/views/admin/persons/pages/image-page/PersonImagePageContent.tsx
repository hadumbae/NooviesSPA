/**
 * @fileoverview Presentation component for the Person Profile Image page.
 * Provides the interface for managing and uploading a person's profile image,
 * including contextual navigation and upload feedback.
 */

import {Person, PersonDetails} from "@/domains/persons/schema/person/Person.types.ts";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import PersonImageDetailsBreadcrumbs
    from "@/views/admin/persons/pages/image-page/PersonImageDetailsBreadcrumbs.tsx";
import PersonProfileImageHeader from "@/views/admin/persons/pages/image-page/PersonProfileImageHeader.tsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/common/components/ui/card.tsx";
import UploadPersonProfileImageFormContainer
    from "@/views/admin/persons/_feat/profile-image-form/UploadPersonProfileImageFormContainer.tsx";
import {useNavigateToPerson} from "@/domains/persons/_feat/navigation/useNavigateToPerson.ts";
import {ReactElement} from "react";

type ContentProps = {
    person: PersonDetails;
};

/**
 * Renders the administrative interface for person profile image management.
 */
function PersonImagePageContent({person}: ContentProps): ReactElement {
    const navigate = useNavigateToPerson();
    const {_id, name, slug} = person;

    const onUpdate = (updated: Person) =>
        navigate({
            slug: updated.slug,
            message: "Navigation to profile after successful image upload.",
            component: PersonImagePageContent.name
        });

    return (
        <PageFlexWrapper className="space-y-5">
            <header className="space-y-5">
                <PersonImageDetailsBreadcrumbs personSlug={slug} name={name}/>
                <PersonProfileImageHeader name={name}/>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Upload Images</CardTitle>
                    <CardDescription>
                        Select an image and click on "Submit".
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <UploadPersonProfileImageFormContainer
                        personID={_id}
                        onSubmitSuccess={onUpdate}
                    />
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
}

export default PersonImagePageContent;