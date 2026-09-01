/**
 * @fileoverview Section for adding movie credits within the movie people administration page.
 */

import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {TextCollapsible} from "@/views/common/_comp/text-display/text-blocks/TextCollapsible.tsx";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {useIsMobile} from "@/common/_feat/handle-ui/useIsMobile.tsx";
import {ObjectId} from "@/common/_schemas";
import {RoleTypeDepartment} from "@/domains/roletypes";
import {MovieCreditForm, MovieCreditFormActions, MovieCreditFormView} from "@/views/admin/movie-credits";

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
                        <MovieCreditForm resetOnSuccess={true} presetValues={{department, movie: movieID}}>
                            <div className="space-y-4">
                                <MovieCreditFormView hideFields={{department: true, movie: true}}/>
                                <MovieCreditFormActions/>
                            </div>
                        </MovieCreditForm>
                    </CardContent>
                </Card>
            </TextCollapsible>
        </section>
    );
}