import {FC} from 'react';
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import TheatreScreenAccordion from "@/pages/screens/components/theatre-screens/admin/lists/TheatreScreenAccordion.tsx";
import EllipsisPaginationButtons from "@/common/components/pagination/EllipsisPaginationButtons.tsx";

type PageSectionProps = {
    screens: ScreenDetails[];
    page: number;
    perPage: number;
    totalItems: number;
    setPage: (value: string | number) => void;
}

const TheatreScreenPageSection: FC<PageSectionProps> = ({screens, page, perPage, setPage, totalItems}) => {
    return (
        <PageSection srTitle="Screens Page Section">
            <section>
                <h1 className="sr-only">Paginated Screens</h1>

                <TheatreScreenAccordion screens={screens} />
            </section>

            <section>
                <h1 className="sr-only">Pagination</h1>

                <EllipsisPaginationButtons page={page} perPage={perPage} totalItems={totalItems} setPage={setPage} />
            </section>
        </PageSection>
    );
};

export default TheatreScreenPageSection;
