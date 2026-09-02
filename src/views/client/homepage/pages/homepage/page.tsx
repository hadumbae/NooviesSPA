import {ReactElement} from 'react';
import {getUserCountry, useSetPageTitle} from "@/common/_feat";
import {HomePageContent} from "@/views/client/homepage/pages/homepage/content.tsx";
import {
    ClientHomepageViewRouteConfigSchema,
    useFetchClientHomepageViewData
} from "@/domains/pages/_feat/client-view-data";
import {QueryDataLoader} from "@/views/common/_feat";


export function HomePage(): ReactElement {
    useSetPageTitle({presetTitle: "Home"})
    const country = getUserCountry({presetCountry: "NZ"});
    const {data: queries} = ClientHomepageViewRouteConfigSchema.safeParse({country});

    const query = useFetchClientHomepageViewData({queries});

    return (
        <QueryDataLoader query={query}>
            {(data) => (
                <HomePageContent viewData={data}/>
            )}
        </QueryDataLoader>
    );
}


