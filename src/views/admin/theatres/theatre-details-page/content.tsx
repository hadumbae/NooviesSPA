/**
 * @fileoverview Main content component for the Theatre Details administrative page.
 */

import {ReactElement} from 'react';
import {Theatre, TheatreDetails} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {TheatreDetailsHeader} from "@/views/admin/theatres/theatre-details-page/header.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {TheatreDetailsUIContext} from "@/domains/theatres/context/theatre-details-ui/TheatreDetailsUIContext.ts";
import {TheatreDetailsPageTabs} from "@/views/admin/theatres/theatre-details-page/tabs/TheatreDetailsPageTabs.tsx";
import TheatreSubmitFormPanel
    from "@/views/admin/theatres/_feat/submit-data/TheatreSubmitFormPanel.tsx";
import {TheatreDetailsCard} from "@/views/admin/theatres/_comp/display-cards/TheatreDetailsCard.tsx";
import useNavigateToTheatre from "@/domains/theatres/hooks/navigation/navigate-to-theatre/useNavigateToTheatre.ts";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens/schema/model";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {PaginatedItems} from "@/common/types";
import {TheatreDeleteWarningDialog} from "@/views/admin/theatres/_feat/model-options";

/** Props for the TheatreDetailsPageContent component. */
type TheatreDetailsPageContentProps = {
    theatre: TheatreDetails;
    screens: PaginatedItems<TheatreScreenWithVirtuals>;
    showings: ShowingDetails[];
    screenPage: number;
    screenPerPage: number;
    setScreenPage: (page: number) => void;
};

/**
 * Renders the layout for theatre management, including details cards and related data tabs.
 * Requires TheatreDetailsUIContext.
 */
export function TheatreDetailsPageContent(
    {theatre, ...tabProps}: TheatreDetailsPageContentProps
): ReactElement {
    const navigate = useLoggedNavigate();
    const updateSlugURL = useNavigateToTheatre();

    const {isEditing, setIsEditing, isDeleting, setIsDeleting} = useRequiredContext({
        context: TheatreDetailsUIContext,
        message: "Must be used within a provider for `TheatreDetailsUIContext`."
    });

    const replaceOnUpdate = (updatedTheatre: Theatre) => {
        updateSlugURL({
            slug: updatedTheatre.slug,
            options: {replace: true},
        });
    }

    const navigateOnDelete = () =>
        navigate({
            level: "log",
            to: "/admin/theatres",
            component: TheatreDetailsPageContent.name,
            message: "Navigating after deleting theatre.",
        });

    return (
        <PageFlexWrapper>
            <TheatreDetailsHeader theatreName={theatre.name}/>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                <section>
                    <SROnly text="Theatre Details Card"/>
                    <TheatreDetailsCard theatre={theatre}/>
                </section>

                <section className="h-full">
                    <SROnly text="Theatre Screens And Movie Showings"/>
                    <TheatreDetailsPageTabs
                        theatreID={theatre._id}
                        theatreSlug={theatre.slug}
                        {...tabProps}
                    />
                </section>
            </div>

            <div className="hidden">
                <TheatreSubmitFormPanel
                    isEditing={true}
                    entity={theatre}
                    presetOpen={isEditing}
                    setPresetOpen={setIsEditing}
                    onSubmitSuccess={replaceOnUpdate}
                />
                <TheatreDeleteWarningDialog
                    theatreID={theatre._id}
                    onDeleteSuccess={navigateOnDelete}
                    presetOpen={isDeleting}
                    setPresetOpen={setIsDeleting}
                />
            </div>
        </PageFlexWrapper>
    );
}