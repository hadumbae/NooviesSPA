/**
 * @fileoverview Section for adding movie credits within the movie people administration page.
 */

import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import TextCollapsible from "@/common/components/TextCollapsible.tsx";
import {Card, CardContent} from "@/common/components/ui";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RoleTypeDepartment} from "@/domains/roletypes";
import {MovieCreditForm, MovieCreditFormView} from "@/views/admin/movie-credits";

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

    return (
        <section className="space-y-3">
            <PageSectionHeader text="Add Credits"/>

            <TextCollapsible triggerText="Form" defaultOpen={isDesktop} className="py-2">
                <Card>
                    <CardContent className="p-4">
                        <MovieCreditForm formConfig={{presetValues: {department, movie: movieID}}}>
                            <MovieCreditFormView disableFields={{department: true, movie: true}}/>
                        </MovieCreditForm>
                    </CardContent>
                </Card>
            </TextCollapsible>
        </section>
    );
}