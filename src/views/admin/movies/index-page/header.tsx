/**
 * @fileoverview Header for the Movie Index page providing navigation to movie creation.
 *
 */

import {ReactElement} from 'react';
import {Plus} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {HeaderDescription, HeaderTitle} from "@/common/components/page/headers";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";

/** Props for the MovieIndexPageHeader component. */
type HeaderProps = {
    paginationState: PaginationValues;
}

/**
 * Administrative header for the movie index that preserves pagination state during navigation.
 */
export function MovieIndexPageHeader(
    {paginationState}: HeaderProps
): ReactElement {
    return (
        <header className={cn("flex justify-between items-center")}>
            <section>
                <HeaderTitle>Movies</HeaderTitle>
                <HeaderDescription>Registered movies.</HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <LoggedHoverLink
                    to="/admin/movies/create"
                    component={MovieIndexPageHeader.name}
                    message="Navigate to movie creation form."
                    options={{state: paginationState}}
                >
                    <Plus/> Create
                </LoggedHoverLink>
            </section>
        </header>
    );
}
