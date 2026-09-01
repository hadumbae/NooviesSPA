import {ReactElement} from 'react';
import {useSetPageTitle} from "@/common/_feat";
import {HomePageContent} from "@/views/client/homepage/pages/homepage/content.tsx";

export function HomePage(): ReactElement {
    useSetPageTitle({presetTitle: "Home"})

    return (
        <HomePageContent/>
    );
}


