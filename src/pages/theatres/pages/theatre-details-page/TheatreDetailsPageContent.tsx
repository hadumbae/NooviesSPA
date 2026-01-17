import {FC} from 'react';
import {Theatre, TheatreDetails} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreDetailsBreadcrumbs
    from "@/pages/theatres/components/admin/pages/theatre-details/TheatreDetailsBreadcrumbs.tsx";
import TheatreDetailsHeader from "@/pages/theatres/components/admin/pages/theatre-details/TheatreDetailsHeader.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {TheatreDetailsUIContext} from "@/pages/theatres/context/theatre-details-ui/TheatreDetailsUIContext.ts";
import TheatreDetailsPageTabs from "@/pages/theatres/pages/theatre-details-page/tabs/TheatreDetailsPageTabs.tsx";
import TheatreSubmitFormPanel
    from "@/pages/theatres/components/admin/form/theatre-submit-form/TheatreSubmitFormPanel.tsx";
import TheatreDeleteWarningDialog
    from "@/pages/theatres/components/admin/theatre-actions/TheatreDeleteWarningDialog.tsx";
import TheatreDetailsCard from "@/pages/theatres/components/admin/theatre-details/TheatreDetailsCard.tsx";
import useNavigateToTheatre from "@/pages/theatres/hooks/navigation/navigate-to-theatre/useNavigateToTheatre.ts";

/**
 * ⚡ **TheatreDetailsPageContent** ⚡
 *
 * Main content section for the Theatre Details page.
 *
 * ### Features
 * - Renders breadcrumbs, header, and theatre details card
 * - Screens + Showings tabs with pagination
 * - Edit + Delete panels controlled by context state
 *
 * @example
 * ```tsx
 * <TheatreDetailsPageContent theatre={theatre} />
 * ```
 */
type TheatreDetailsPageContentProps = {
    /** Theatre entity used to render all sections */
    theatre: TheatreDetails;
};

const TheatreDetailsPageContent: FC<TheatreDetailsPageContentProps> = ({theatre}) => {
    const navigate = useLoggedNavigate();
    const updateSlugURL = useNavigateToTheatre();

    const {isEditing, setIsEditing, isDeleting, setIsDeleting} = useRequiredContext({
        context: TheatreDetailsUIContext,
        message: "Must be used within a provider for `TheatreDetailsUIContext`."
    });

    const replaceOnUpdate = (theatre: Theatre) => {
        updateSlugURL({
            slug: theatre.slug,
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
            {/* Header */}
            <section>
                <SectionHeader srOnly={true}>Header</SectionHeader>
                <TheatreDetailsBreadcrumbs theatreName={theatre.name}/>
                <TheatreDetailsHeader theatreName={theatre.name}/>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                {/* Details Card */}
                <section>
                    <SectionHeader srOnly={true}>Theatre Details Card</SectionHeader>
                    <TheatreDetailsCard theatre={theatre}/>
                </section>

                {/* Tabs */}
                <section className="h-full">
                    <SectionHeader srOnly={true}>Theatre Screens And Movie Showings</SectionHeader>
                    <TheatreDetailsPageTabs theatreID={theatre._id}/>
                </section>
            </div>

            {/* Contextual Form Panel */}
            <div className="hidden">
                <TheatreSubmitFormPanel
                    isEditing={true}
                    entity={theatre}
                    presetOpen={isEditing}
                    setPresetOpen={setIsEditing}
                    onSubmitSuccess={replaceOnUpdate}
                />
            </div>

            {/* Contextual Warning Dialog */}
            <div className="hidden">
                <TheatreDeleteWarningDialog
                    theatreID={theatre._id}
                    onDeleteSuccess={navigateOnDelete}
                    presetOpen={isDeleting}
                    setPresetOpen={setIsDeleting}
                />
            </div>
        </PageFlexWrapper>
    );
};

export default TheatreDetailsPageContent;

// http://localhost:3000/admin/theatres/get/aaa-e9mgjm
// http://localhost:3000/admin/theatres/get/ass-2wh3m5