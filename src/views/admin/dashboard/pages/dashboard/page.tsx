import {ReactElement} from "react";
import {useSetAdminPageTitle} from "@/common/_feat";
import {DashboardPageContent} from "@/views/admin/dashboard/pages/dashboard/content.tsx";
import {QueryDataLoader} from "@/views/common/_feat";
import {useFetchAdminDashboardViewData} from "@/domains/pages/_feat/admin-view-data";

export function AdminDashboardPage(): ReactElement {
    useSetAdminPageTitle({presetTitle: "Dashboard"})

    const query = useFetchAdminDashboardViewData();

    return (
        <QueryDataLoader query={query}>
            {(data) => (
                <DashboardPageContent stats={data}/>
            )}
        </QueryDataLoader>

    );
}