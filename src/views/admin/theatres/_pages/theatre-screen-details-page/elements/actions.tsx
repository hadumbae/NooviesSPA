/**
 * @fileoverview Action trigger component for the Theatre Screen details page.
 * Orchestrates the "Edit" and "Delete" workflows using domain-specific form containers and dialogs.
 */

import {ReactElement} from "react";
import {TheatreScreenForm, TheatreScreenFormPanel} from "@/views/admin/theatre-screens/_feat/submit-data";
import {TheatreScreenDetails, TheatreScreenWithVirtuals} from "@/domains/theatre-screens/_schema/model";
import {useLocation} from "react-router-dom";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {useNavigateToTheatre} from "@/domains/theatres/_feat/navigation";

import {simplifyScreenDetails} from "@/domains/theatre-screens/_feat/formatters";
import {ScreenDeleteWarningDialog} from "@/views/admin/theatre-screens/_feat/model-options";
import {TheatreDetails} from "@/domains/theatres";
import {
    ScreenDetailsUISetterContext,
    ScreenDetailsUIStateContext
} from "@/domains/theatre-screens/_ctx/screen-details";

/**
 * Props for the TheatreScreenDetailsPageScreenActions component.
 */
type ActionProps = {
    className?: string;
    theatre: TheatreDetails;
    screen: TheatreScreenWithVirtuals;
};

/**
 * Renders the primary management actions for a Theatre Screen.
 */
export function TheatreScreenDetailsPageScreenActions(
    {className, theatre, screen}: ActionProps
): ReactElement {
    const {search} = useLocation();
    const navigate = useLoggedNavigate();
    const navigateToTheatre = useNavigateToTheatre();

    const simplifiedScreen = simplifyScreenDetails(screen);

    const {isEditing, showDeleteWarning} = useRequiredContext({context: ScreenDetailsUIStateContext});
    const {setIsEditing, setShowDeleteWarning} = useRequiredContext({context: ScreenDetailsUISetterContext});

    const onUpdateSuccess = (updatedScreen: TheatreScreenDetails) => {
        const {theatre: {slug: theatreSlug}, slug: screenSlug} = updatedScreen;

        navigate({
            to: `/admin/theatres/get/${theatreSlug}/screen/${screenSlug}${search}`,
            message: "Replacing URL following screen update (slug synchronization).",
            options: {replace: true},
        });

        setIsEditing(false);
    };

    const onDeleteSuccess = () => {
        navigateToTheatre({
            slug: theatre.slug,
            message: "Navigating to parent theatre after screen deletion.",
        });
    };

    return (
        <div className={className}>
            <TheatreScreenForm
                presetValues={{theatre: theatre._id}}
                onSubmitSuccess={onUpdateSuccess}
                editEntity={simplifiedScreen}
            >
                <TheatreScreenFormPanel
                    isOpen={isEditing}
                    setIsOpen={setIsEditing}
                    disableFields={{theatre: true}}
                    title="Update Screen Details"
                    description={`Editing ${screen.name}.`}
                />
            </TheatreScreenForm>

            <ScreenDeleteWarningDialog
                screenID={screen._id}
                screenName={screen.name}
                isOpen={showDeleteWarning}
                setIsOpen={setShowDeleteWarning}
                onSubmitSuccess={onDeleteSuccess}
                successMessage="Theatre Screen Deleted."
            />
        </div>
    );
}