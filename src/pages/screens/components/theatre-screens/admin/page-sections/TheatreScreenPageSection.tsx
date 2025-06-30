import {FC} from 'react';
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import EllipsisPaginationButtons from "@/common/components/pagination/EllipsisPaginationButtons.tsx";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import TheatreScreenListTable from "@/pages/screens/components/theatre-screens/admin/lists/TheatreScreenListTable.tsx";
import TheatreScreenDetailsDrawer
    from "@/pages/screens/components/theatre-screens/admin/lists/TheatreScreenDetailsDrawer.tsx";

type PageSectionProps = {
    screens: ScreenDetails[];
    page: number;
    perPage: number;
    totalItems: number;
    setPage: (value: string | number) => void;
}

const TheatreScreenPageSection: FC<PageSectionProps> = ({screens, page, perPage, setPage, totalItems}) => {
    const isDesktop = !useIsMobile();
    const hasPagination = totalItems > perPage;

    return (
        <PageSection srTitle="Screens Page Section" className="space-y-5 md:flex md:flex-col md:items-center">
            <section className="md:w-5/6">
                <h1 className="sr-only">Paginated Screens</h1>

                {
                    isDesktop
                        ? <TheatreScreenListTable screens={screens}/>
                        : <div className="grid grid-cols-1 gap-2">
                            {screens.map(screen => <TheatreScreenDetailsDrawer screen={screen} />)}
                        </div>
                }
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
