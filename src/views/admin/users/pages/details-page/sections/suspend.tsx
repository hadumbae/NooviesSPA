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
import {SuspendUserForm, UnsuspendUserForm,} from "@/domains/users/_feat/manage-user-suspension/forms";
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

    const [isSuspending, setIsSuspending] = useState<boolean>(false);
    const [isUnsuspending, setIsUnsuspending] = useState<boolean>(false);

    const invalidateQueries = useInvalidateUserQueriesOnModeration();

    const onUserStatusChange = ({user}: UpdateUserSuspensionReturns) => {
        setIsUserSuspended(user.status === "SUSPENDED");
        invalidateQueries();
    }

    const onStatusSubmit = () => {
        setIsSuspending(false);
        setIsUnsuspending(false);
    }

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Suspension"/>

            {
                isUserSuspended ? (
                    <UnsuspendUserForm
                        mutConfig={{userId}}
                        onSubmit={onStatusSubmit}
                        onSubmitSuccess={onUserStatusChange}
                        presetValues={{
                            action: "user_unsuspended",
                            suspend: false,
                        }}
                    >
                        <GenericFormDialog
                            isOpen={isUnsuspending}
                            setIsOpen={setIsUnsuspending}
                            title="Unsuspend User?"
                            description="Lift the suspension on the specified user."
                            submitText="Suspend"
                            trigger={(
                                <Button variant="secondary" className="w-full py-12">
                                    Unsuspend User
                                </Button>
                            )}
                        >
                            <UpdateUserSuspensionFormView/>
                        </GenericFormDialog>
                    </UnsuspendUserForm>
                ) : (
                    <SuspendUserForm
                        mutConfig={{userId}}
                        onSubmit={onStatusSubmit}
                        onSubmitSuccess={onUserStatusChange}
                        presetValues={{
                            action: "user_suspended",
                            suspend: true,
                        }}
                    >
                        <GenericFormDialog
                            isOpen={isSuspending}
                            setIsOpen={setIsSuspending}
                            title="Suspend User?"
                            description="Suspend the specified user."
                            submitText="Suspend"
                            trigger={(
                                <Button variant="primary" className="w-full py-12">
                                    Suspend User
                                </Button>
                            )}
                        >
                            <UpdateUserSuspensionFormView/>
                        </GenericFormDialog>
                    </SuspendUserForm>
                )
            }
        </section>
    );
}