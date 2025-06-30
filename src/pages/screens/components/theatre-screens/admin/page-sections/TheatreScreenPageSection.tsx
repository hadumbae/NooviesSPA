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
    const hasPagination = totalItems > perPage;

    console.log("Total Items", totalItems);
    console.log("Per Page", perPage);
    console.log("Has Pagination", hasPagination);

    return (
        <PageSection srTitle="Screens Page Section" className="space-y-5 md:flex md:flex-col md:items-center">
            <section className="md:w-1/2">
                <h1 className="sr-only">Paginated Screens</h1>
                <TheatreScreenAccordion screens={screens}/>
            </section>

            {
                hasPagination &&
                <section>
                    <h1 className="sr-only">Pagination</h1>
                    <EllipsisPaginationButtons
                        page={page}
                        perPage={perPage}
                        totalItems={totalItems}
                        setPage={setPage}
                    />
                </section>
            }
        </PageSection>
    );
};

export default TheatreScreenPageSection;
