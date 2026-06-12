/**
 * @fileoverview Profile page tab content for updating the user's password.
 */

import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ReactElement} from "react";
import {UpdateUserPasswordForm, UpdateUserPasswordFormView} from "@/views/client/users/_feat";

/** Props for the MyProfilePagePasswordTab component. */
type TabProps = {
    tabValue: string;
    userID: ObjectId;
};

/** Renders the password update tab for the My Profile page. */
export function MyProfilePagePasswordTab(
    {tabValue, userID}: TabProps
): ReactElement {
    return (
        <TabsContent value={tabValue}>
            <PrimaryHeaderText>Update Password</PrimaryHeaderText>

            <Card>
                <CardHeader>
                    <CardTitle>Update Your Password</CardTitle>
                </CardHeader>

                <CardContent>
                    <UpdateUserPasswordForm userID={userID}>
                        <UpdateUserPasswordFormView />
                    </UpdateUserPasswordForm>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
