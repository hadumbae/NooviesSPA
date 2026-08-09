/**
 * @fileoverview User details page section component for toggling and managing user suspension state.
 */

import {ReactElement, useState} from "react";
import {ObjectId} from "@/common/_schemas";
import {PageSectionHeader} from "@/views/common/_comp";
import {GenericFormDialog} from "@/views/common/_feat";
import {Button} from "@/views/common/_comp/ui";
import {UpdateUserSuspensionFormView} from "@/views/admin/users/_feat";
import {UserStatus} from "@/domains/users/_schema/fields";
import {useInvalidateUserQueriesOnModeration,} from "@/domains/users/_feat/user-moderation-actions";
import {UpdateUserSuspensionForm,} from "@/domains/users/_feat/manage-user-suspension/forms";
import {UpdateUserSuspensionReturns,} from "@/domains/users/_feat/manage-user-suspension";

/** Props for the UserDetailsPageSuspensionSection component. */
type SectionProps = {
    userId: ObjectId;
    userStatus: UserStatus;
};

/**
 * Renders the suspension control section on the user details page, allowing administrators to suspend or unsuspend a user account.
 */
export function UserDetailsPageSuspensionSection(
    {userId, userStatus}: SectionProps
): ReactElement {
    const [isUserSuspended, setIsUserSuspended] = useState<boolean>(userStatus === "SUSPENDED");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const invalidateQueries = useInvalidateUserQueriesOnModeration();

    const suspendValues = {action: "user_suspended", suspend: true, message: ""};
    const unsuspendValues = {action: "user_unsuspended", suspend: false, message: ""};

    const adminVerb = isUserSuspended ? "Unsuspend" : "Suspend";
    const dialogDescription = isUserSuspended
        ? "Lift the suspension on the specified user."
        : "Suspend the specified user.";

    const onStatusSubmit = () => setIsUpdating(false);
    const onUserStatusChange = ({user}: UpdateUserSuspensionReturns) => {
        setIsUserSuspended(user.status === "SUSPENDED");
        invalidateQueries();
    }

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Suspension"/>

            <UpdateUserSuspensionForm
                mutConfig={{userId}}
                onSubmit={onStatusSubmit}
                onSubmitSuccess={onUserStatusChange}
                presetValues={isUserSuspended ? unsuspendValues : suspendValues}
                resetValues={!isUserSuspended ? unsuspendValues : suspendValues}
                resetOnSuccess={true}
            >
                <GenericFormDialog
                    isOpen={isUpdating}
                    setIsOpen={setIsUpdating}
                    title={`${adminVerb} User?`}
                    description={dialogDescription}
                    submitText={adminVerb}
                    trigger={(
                        <Button variant="primary" className="w-full py-12" disabled={userStatus === "INACTIVE"}>
                            {userStatus === "INACTIVE" ? "Inactive User" : `${adminVerb} User`}
                        </Button>
                    )}
                >
                    <UpdateUserSuspensionFormView
                        disableFields={{action: true, suspend: true}}
                    />
                </GenericFormDialog>
            </UpdateUserSuspensionForm>
        </section>
    );
}