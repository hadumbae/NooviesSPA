import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Plus} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";

/**
 * `MovieIndexHeader` is the header section for the movie index page.
 *
 * @remarks
 * This component:
 * - Displays the page title ("Movies") and description ("Registered movies.")
 * - Provides a "Create" button that navigates to the movie creation page.
 * - Persists pagination state (`page` and `perPage`) when navigating
 *   if the current URL contains valid pagination parameters.
 *
 * @example
 * ```tsx
 * <MovieIndexHeader />
 * ```
 *
 * @component
 * @returns {JSX.Element} The rendered movie index header.
 */
const MovieIndexHeader: FC = () => {
    const {page, perPage, hasPaginationValues} = usePaginationSearchParams();
    const state = hasPaginationValues ? {page, perPage} : {};

    const createNavigationObject = {
        to: "/admin/movies/create",
        options: {state},
        component: MovieIndexHeader.name,
        message: "Navigate to movie creation form.",
    };

    return (
        <header className={cn("flex justify-between items-center")}>
            <section>
                <HeaderTitle>Movies</HeaderTitle>
                <HeaderDescription>Registered movies.</HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <LoggedHoverLink {...createNavigationObject}>
                    <Plus/> Create
                </LoggedHoverLink>
            </section>
        </header>
    );
};

export default MovieIndexHeader;
