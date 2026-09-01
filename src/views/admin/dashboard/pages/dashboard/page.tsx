import {ReactElement} from "react";
import {useSetAdminPageTitle} from "@/common/_feat";
import {DashboardPageContent} from "@/views/admin/dashboard/pages/dashboard/content.tsx";

export function AdminDashboardPage(): ReactElement {
    useSetAdminPageTitle({presetTitle: "Dashboard"})

    return (
        <DashboardPageContent/>
    );
}