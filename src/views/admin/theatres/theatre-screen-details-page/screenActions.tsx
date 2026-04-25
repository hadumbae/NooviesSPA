/**
 * @fileoverview Action trigger component for the Theatre Screen details page.
 * Orchestrates the "Edit" and "Delete" workflows using domain-specific form containers and dialogs.
 */

import {ReactElement} from "react";
import {TheatreScreenSubmitForm, TheatreScreenSubmitFormPanel} from "@/views/admin/theatre-screens/_feat/submit-data";
import {TheatreScreenDetails} from "@/domains/theatre-screens/schema/model";
import {useLocation} from "react-router-dom";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useNavigateToTheatre from "@/domains/theatres/hooks/navigation/navigate-to-theatre/useNavigateToTheatre.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {ScreenDetailsUIContext} from "@/domains/theatre-screens/contexts/screen-details/ScreenDetailsUIContext.ts";
import simplifyScreenDetails from "@/domains/theatre-screens/utilities/simplifyScreenDetails.ts";
import {TheatreDetails} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import {ScreenDeleteWarningDialog} from "@/views/admin/theatre-screens/components/dialog/ScreenDeleteWarningDialog.tsx";

/**
 * Props for the TheatreScreenDetailsPageScreenActions component.
 */
type ActionProps = {
    className?: string;
    theatre: TheatreDetails;
    screen: TheatreScreenDetails;
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

    const {isEditing, setIsEditing, showDeleteWarning, setShowDeleteWarning} = useRequiredContext({
        context: ScreenDetailsUIContext,
    });

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
            <TheatreScreenSubmitForm
                presetValues={{theatre: theatre._id}}
                onSubmitSuccess={onUpdateSuccess}
                editEntity={simplifiedScreen}
            >
                <TheatreScreenSubmitFormPanel
                    isOpen={isEditing}
                    setIsOpen={setIsEditing}
                    disableFields={{theatre: true}}
                    title="Update Screen Details"
                    description={`Editing ${screen.name}.`}
                />
            </TheatreScreenSubmitForm>

            <ScreenDeleteWarningDialog
                screenID={screen._id}
                screenName={screen.name}
                presetOpen={showDeleteWarning}
                setPresetOpen={setShowDeleteWarning}
                onSubmitSuccess={onDeleteSuccess}
            />
        </div>
    );
}