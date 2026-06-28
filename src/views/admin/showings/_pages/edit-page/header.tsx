/**
 * @fileoverview Header section for the showing edit page.
 */

import {ReactElement} from "react";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

import {ShowingDetails} from "@/domains/showings";
import {ShowingEditBreadcrumbs} from "@/views/admin/showings/_pages/edit-page/breadcrumbs.tsx";

/** Props for the ShowingEditHeader component. */
type HeaderProps = {
    showing: ShowingDetails;
};

/** Renders the movie title and contextual screen information for a showing. */
export function ShowingEditHeader({showing}: HeaderProps): ReactElement {
    const {
        movie: {title: movieTitle},
        screen: {name: screenName},
        theatre: {name: theatreName},
    } = showing;

    return (
        <header className="space-y-3">
            <ShowingEditBreadcrumbs showing={showing}/>

            <div>
                <HeaderTitle>Edit {movieTitle}</HeaderTitle>
                <HeaderDescription>
                    Edit showing on {screenName} at {theatreName}.
                </HeaderDescription>
            </div>
        </header>
    );
}
