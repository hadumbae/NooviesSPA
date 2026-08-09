/**
 * @fileoverview React component rendering the user status management section with activation/deactivation dialogs.
 */

import {ReactElement, useState} from "react";
import {ObjectId} from "@/common/_schemas";
import {useInvalidateUserQueriesOnModeration, UserStatus} from "@/domains/users";
import {PageSectionHeader} from "@/views/common/_comp";
import {UpdateUserStatusForm} from "@/domains/users/_feat/manage-user-status/forms";
import {UpdateUserStatusFormValues} from "@/domains/users/_feat/manage-user-status/schema";
import {Button} from "@/views/common/_comp/ui";
import {GenericFormDialog} from "@/views/common/_feat";
import {UpdateUserStatusFormView} from "@/views/admin/users/_feat";

/** Props for the UserDetailsPageStatusManagementSection component. */
type SectionProps = {
    userId: ObjectId;
    userStatus: UserStatus;
};

/**
 * Renders the page section that allows administrators to activate or deactivate a user's account status.
 */
export function UserDetailsPageStatusManagementSection(
    {userId, userStatus}: SectionProps
): ReactElement {
    const invalidateQueries = useInvalidateUserQueriesOnModeration();
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const dialogText = userStatus === "INACTIVE" ? "Activate" : "Deactivate";

    const activateValues: UpdateUserStatusFormValues = {
        action: "user_account_activated",
        status: "ACTIVE",
        message: "",
    }

    const deactivateValues: UpdateUserStatusFormValues = {
        action: "user_account_deactivated",
        status: "INACTIVE",
        message: "",
    }

    const onUpdateSubmit = () => setIsUpdating(false);
    const onStatusUpdate = () => invalidateQueries();

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Status"/>

            <UpdateUserStatusForm
                mutConfig={{userId}}
                onSubmit={onUpdateSubmit}
                onSubmitSuccess={onStatusUpdate}
                resetOnSuccess={true}
                presetValues={userStatus === "INACTIVE" ? activateValues : deactivateValues}
                resetValues={userStatus === "INACTIVE" ? deactivateValues : activateValues}
            >
                <GenericFormDialog
                    isOpen={isUpdating}
                    setIsOpen={setIsUpdating}
                    title={`${dialogText} User Account`}
                    description={`${dialogText} the account of the specified user.`}
                    submitText={dialogText}
                    trigger={(
                        <Button
                            variant="primary"
                            className="w-full py-12"
                        >
                            {dialogText} Account
                        </Button>
                    )}
                >
                    <UpdateUserStatusFormView disableFields={{
                        action: true,
                        status: userStatus !== "INACTIVE",
                    }}/>
                </GenericFormDialog>
            </UpdateUserStatusForm>
        </section>
    );
}