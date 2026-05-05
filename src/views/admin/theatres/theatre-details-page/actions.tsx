/**
 * @fileoverview Renders the action controls for the Theatre Details page, including edit and delete functionality.
 */

import {ReactElement} from "react";
import {TheatreSubmitForm, TheatreSubmitFormPanel} from "@/views/admin/theatres/_feat/submit-data";
import {TheatreDeleteWarningDialog} from "@/views/admin/theatres/_feat/model-options";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {useNavigateToTheatre} from "@/domains/theatres/_feat/navigation";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {TheatreDetailsUIContext} from "@/domains/theatres/context/theatre-details-ui/TheatreDetailsUIContext.ts";
import {Theatre, TheatreDetails} from "@/domains/theatres/schema/theatre";

/** Props for the TheatreDetailsPageActions component. */
type ActionProps = {
    theatre: TheatreDetails;
    className?: string;
};

/** Renders the submit form panel and delete warning dialog for managing theatre details. */
export function TheatreDetailsPageActions(
    {theatre, className}: ActionProps
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

        setIsEditing(false);
    };

    const navigateOnDelete = () =>
        navigate({
            level: "log",
            to: "/admin/theatres",
            message: "Navigating after deleting theatre.",
        });

    return (
        <div className={className}>
            <TheatreSubmitForm editEntity={theatre} onSubmitSuccess={replaceOnUpdate} successMessage="Updated.">
                <TheatreSubmitFormPanel isEditing={true} isOpen={isEditing} setIsOpen={setIsEditing}/>
            </TheatreSubmitForm>

            <TheatreDeleteWarningDialog
                theatreID={theatre._id}
                onDeleteSuccess={navigateOnDelete}
                presetOpen={isDeleting}
                setPresetOpen={setIsDeleting}
            />
        </div>
    );
}