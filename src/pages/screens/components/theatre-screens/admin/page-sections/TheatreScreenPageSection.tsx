import {FC} from 'react';
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import TheatreScreenAccordion from "@/pages/screens/components/theatre-screens/admin/lists/TheatreScreenAccordion.tsx";

type PageSectionProps = {
    screens: ScreenDetails[];
    page: number;
    perPage: number;
    totalItems: number;
}

const TheatreScreenPageSection: FC<PageSectionProps> = ({screens, page, perPage, totalItems}) => {
    return (
        <PageSection srTitle="Screens Page Section">
            <section>
                <h1 className="sr-only">Paginated Screens</h1>

                <TheatreScreenAccordion screens={screens} />
            </section>

            <section className="flex flex-col space-y-2">
                <h1 className="sr-only">Pagination</h1>

                <span>Current Page : {page}</span>
                <span>Should Have Pagination : {totalItems > perPage}</span>
            </section>
        </PageSection>
    );
};

export default TheatreScreenPageSection;
