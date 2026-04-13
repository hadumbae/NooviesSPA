/**
 * @fileoverview Defines the header for the Movie Index page.
 * Provides a titled descriptive section and a contextual creation link
 * that preserves current pagination state via location state.
 */

import {FC} from 'react';
import {Plus} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import usePaginationSearchParams from "@/common/features/fetch-pagination-search-params/hooks/usePaginationSearchParams.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {HeaderDescription, HeaderTitle} from "@/common/components/page/headers";

/**
 * Renders the administrative movie index header.
 */
const MovieIndexPageHeader: FC = () => {
    const {page, perPage, hasPaginationValues} = usePaginationSearchParams();

    const state = hasPaginationValues ? {page, perPage} : {};

    const createNavigationObject = {
        to: "/admin/movies/create",
        options: {state},
        component: MovieIndexPageHeader.name,
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
                    <Plus /> Create
                </LoggedHoverLink>
            </section>
        </header>
    );
};

export default MovieIndexPageHeader;