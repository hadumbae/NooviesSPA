/**
 * @fileoverview Renders the action controls for the Theatre Details page, including edit and delete functionality.
 */

import {ReactElement} from "react";
import {TheatreSubmitForm, TheatreSubmitFormPanel} from "@/views/admin/theatres/_feat/submit-data";
import {TheatreDeleteWarningDialog} from "@/views/admin/theatres/_feat/model-options";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {useNavigateToTheatre} from "@/domains/theatres/_feat/navigation";
import {useRequiredContext} from "@/common/_feat/use-context/useRequiredContext.ts";
import {
    TheatreDetailsUIStateContext
} from "@/domains/theatres/_ctx/theatre-details-ui/TheatreDetailsUIStateContext.ts";
import {Theatre, TheatreDetails} from "@/domains/theatres/_schema/theatre";
import {TheatreDetailsUISetterContext} from "@/domains/theatres";

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

    const {isEditing, isDeleting} = useRequiredContext({context: TheatreDetailsUIStateContext});
    const {setIsEditing, setIsDeleting} = useRequiredContext({context: TheatreDetailsUISetterContext});

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
            <TheatreSubmitForm
                formConfig={{editEntity: theatre}}
                onSubmitSuccess={replaceOnUpdate}
                successMessage="Updated."
            >
                <TheatreSubmitFormPanel
                    isEditing={true}
                    isOpen={isEditing}
                    setIsOpen={setIsEditing}
                />
            </TheatreSubmitForm>

            <TheatreDeleteWarningDialog
                theatreID={theatre._id}
                onSubmitSuccess={navigateOnDelete}
                isOpen={isDeleting}
                setIsOpen={setIsDeleting}
            />
        </div>
    );
}