/**
 * @file MyProfilePagePasswordTab.tsx
 *
 * Profile page tab content for updating the user's password.
 */

import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import UpdateUserPasswordFormContainer from "@/pages/users/components/forms/UpdateUserPasswordFormContainer.tsx";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

type TabProps = {
    /** Tab identifier used by the parent Tabs component */
    tabValue: string;

    /** ID of the user whose password is being updated */
    userID: ObjectId;
};

/**
 * Renders the password update tab for the My Profile page.
 *
 * Displays a password update form scoped to the
 * currently authenticated user.
 */
const MyProfilePagePasswordTab = ({tabValue, userID}: TabProps) => {
    return (
        <TabsContent value={tabValue}>
            <PrimaryHeaderText>Update Password</PrimaryHeaderText>

            <Card>
                <CardHeader>
                    <CardTitle>Update Your Password</CardTitle>
                </CardHeader>

                <CardContent>
                    <UpdateUserPasswordFormContainer userID={userID}/>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default MyProfilePagePasswordTab;
