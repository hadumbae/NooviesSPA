import {ReactElement} from "react";
import {PageFlexWrapper, PageHeader} from "@/views/common/_comp";
import {useAuthContext} from "@/domains/auth";

type ContentProps = {};

export function HomePageContent(
    {}: ContentProps
): ReactElement {
    const {user} = useAuthContext();

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Noovies"
                description={user ? `Hello, ${user.name}!` : "Hello!"}
            />
        </PageFlexWrapper>
    );
}