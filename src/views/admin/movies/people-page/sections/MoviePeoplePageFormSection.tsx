/**
 * @fileoverview Section for adding movie credits within the movie people administration page.
 */

import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import TextCollapsible from "@/common/components/TextCollapsible.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {MovieCreditForm, MovieCreditFormView} from "@/views/admin/movie-credits/_comp/forms";
import {MovieCreditFormDisableFields, MovieCreditFormValues} from "@/domains/moviecredit/_feat/submit-data";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RoleTypeDepartment} from "@/domains/roletype/schema/fields/RoleTypeDepartmentSchema.ts";

/** Props for the MoviePeoplePageFormSection component. */
type SectionProps = {
    movieID: ObjectId;
    department: RoleTypeDepartment;
};

/** Form section that allows administrators to add new credits to a specific movie and department. */
export function MoviePeoplePageFormSection(
    {movieID, department}: SectionProps
): ReactElement {
    const isDesktop = !useIsMobile();

    const presetValues: Partial<MovieCreditFormValues> = {
        department,
        movie: movieID,
    };

    const disableFields: MovieCreditFormDisableFields = {
        department: true,
        movie: true,
    }

    return (
        <section className="space-y-3">
            <PageSectionHeader text="Add Credits" />

            <TextCollapsible triggerText="Form" defaultOpen={isDesktop} className="py-2">
                <Card>
                    <CardContent className="p-4">
                        <MovieCreditForm presetValues={presetValues}>
                            <MovieCreditFormView disableFields={disableFields}/>
                        </MovieCreditForm>
                    </CardContent>
                </Card>
            </TextCollapsible>
        </section>
    );
}