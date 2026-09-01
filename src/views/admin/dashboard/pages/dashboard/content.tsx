import {ReactElement} from "react";
import {PageFlexWrapper, PageHeader} from "@/views/common/_comp";
import {DateTime} from "luxon";

type ContentProps = {};

export function DashboardPageContent(
    {}: ContentProps
): ReactElement {
    const todayDate = DateTime.now().toFormat("dd LLL, yyyy");

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Dashboard"
                description={todayDate}
            />
        </PageFlexWrapper>
    );
}