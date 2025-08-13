import {FC, PropsWithChildren, useState} from 'react';
import {Person, PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {useNavigate} from "react-router-dom";
import PersonDeleteWarningDialog from "@/pages/persons/components/admin/dialog/PersonDeleteWarningDialog.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import PersonSubmitFormPanel from "@/pages/persons/components/form/admin/submit/PersonSubmitFormPanel.tsx";

/**
 * Props for handling the editing of a person.
 * Extends {@link FormMutationOnSubmitParams} without `onSubmitSuccess` and `onSubmitError`,
 * but redefines them to enforce explicit success and error handlers.
 */
type OnPersonEditProps = Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    /**
     * Callback fired when a person is successfully edited.
     * @param person - The updated person entity.
     */
    onSubmitSuccess: (person: Person) => void;
    /**
     * Callback fired when an error occurs while editing.
     * @param error - The error encountered.
     */
    onSubmitError: (error: unknown) => void;
};

/**
 * Props for handling the deletion of a person.
 * Extends {@link FormMutationOnSubmitParams} without `onSubmitSuccess` and `onSubmitError`,
 * but redefines them to enforce explicit success and error handlers.
 */
type OnPersonDeleteProps = Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    /**
     * Callback fired when a person is successfully deleted.
     */
    onSubmitSuccess: () => void;
    /**
     * Callback fired when an error occurs while deleting.
     * @param error - The error encountered.
     */
    onSubmitError: (error: unknown) => void;
};

/**
 * Props for the {@link PersonDetailsOptions} component.
 */
type PopoverProps = {
    /**
     * The person whose details are being managed.
     */
    person: Person | PersonDetails;
    /**
     * Optional editing configuration and callbacks.
     */
    onEditProps?: OnPersonEditProps;
    /**
     * Optional deletion configuration and callbacks.
     */
    onDeleteProps?: OnPersonDeleteProps;
};

/**
 * A popover menu containing options to update profile image,
 * edit personal details, or delete the person.
 *
 * @component
 * @example
 * ```tsx
 * <PersonDetailsOptions
 *   person={person}
 *   onEditProps={{
 *     mutation: editMutation,
 *     onSubmitSuccess: handleEditSuccess,
 *     onSubmitError: handleEditError
 *   }}
 *   onDeleteProps={{
 *     mutation: deleteMutation,
 *     onSubmitSuccess: handleDeleteSuccess,
 *     onSubmitError: handleDeleteError
 *   }}
 * >
 *   <Button>Options</Button>
 * </PersonDetailsOptions>
 * ```
 */
const PersonDetailsOptions: FC<PropsWithChildren<PopoverProps>> = (params) => {
    const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const {children, person, onEditProps, onDeleteProps} = params;
    const {_id, name} = person;

    /**
     * Navigate to the profile image update page for the person.
     */
    const updateProfileImage = () => {
        navigate(`/admin/persons/get/${person._id}/images/profile`);
    };

    /**
     * Close the popover after editing.
     */
    const closeOnEdit = (person: Person) => {
        setOpen(false);
        onEditProps?.onSubmitSuccess?.(person);
    };

    /**
     * Close the popover after deleting.
     */
    const closeOnDelete = () => {
        setOpen(false);
        onDeleteProps?.onSubmitSuccess?.();
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{children ? children : "Open"}</PopoverTrigger>
            <PopoverContent className="w-40 flex flex-col p-0">
                <Button
                    variant="link"
                    onClick={updateProfileImage}
                >
                    Update Profile Image
                </Button>

                <PersonSubmitFormPanel
                    isEditing={true}
                    person={person}
                    {...onEditProps}
                    onSubmitSuccess={closeOnEdit}
                >
                    <Button variant="link">Edit Person Details</Button>
                </PersonSubmitFormPanel>

                <PersonDeleteWarningDialog
                    personName={name}
                    personID={_id}
                    {...onDeleteProps}
                    onSubmitSuccess={closeOnDelete}
                >
                    <Button variant="link">Delete Person</Button>
                </PersonDeleteWarningDialog>
            </PopoverContent>
        </Popover>
    );
};

export default PersonDetailsOptions;
