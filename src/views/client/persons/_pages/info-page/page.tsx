/**
 * @fileoverview Page component for displaying detailed information and filmography of a specific person.
 */

import {ReactElement} from "react";
import {PersonInfoContent} from "@/views/client/persons/_pages/info-page/content.tsx";
import {usePersonInfoRouteParams} from "@/domains/persons/_feat/fetch-route-params";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {PageLoader} from "@/views/common/_comp";
import {toast} from "react-toastify";
import {useFetchPersonInfoViewData} from "@/domains/persons/_feat/client-view-data";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

/**
 * Entry point for the person details view.
 */
export function PersonInfoPage(): ReactElement {
    const navigate = useLoggedNavigate();
    const {slug} = usePersonInfoRouteParams();

    const query = useFetchPersonInfoViewData({
        slug: slug!,
        options: {enabled: !!slug},
    });

    if (!slug) {
        navigate({level: "warn", to: "/browse/persons", message: "Invalid person slug."});
        toast.warn("Person Not Found.");

        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {({person, filmography}) => (
                <PersonInfoContent
                    person={person}
                    filmography={filmography}/>
            )}
        </QueryDataLoader>
    );
}