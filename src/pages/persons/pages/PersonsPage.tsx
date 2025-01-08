import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import PersonCardList from "@/pages/persons/components/PersonCardList.tsx";
import usePaginationSearchParams from "@/common/hooks/usePaginationSearchParams.ts";
import useFetchPaginatedPersons from "@/pages/persons/hooks/useFetchPaginatedPersons.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {Link} from "react-router-dom";
import {cn} from "@/common/lib/utils.ts";

const PersonsPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedPersons({page, perPage, filters: {}});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    const {items: persons} = data;

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <div>
                    <HeaderTitle>Persons</HeaderTitle>
                    <HeaderDescription>The the actors, directors, and staff behind movies.</HeaderDescription>
                </div>

                <Link
                    className={cn(buttonVariants({variant: "link"}), "p-2")}
                    to="/admin/persons/create"
                >
                    <Plus />
                </Link>
            </header>

            <section className="flex-1 space-y-3">
                <PersonCardList persons={persons} onPersonDelete={() => refetch()} />
            </section>
        </PageFlexWrapper>
    );
};

export default PersonsPage;
