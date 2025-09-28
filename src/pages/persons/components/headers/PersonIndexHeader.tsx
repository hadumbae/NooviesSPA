import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Plus} from "lucide-react";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Header component for the "Persons" index page.
 *
 * @remarks
 * - Displays the page title and description for the persons section.
 * - Includes a call-to-action link to create a new person entry.
 * - Uses responsive flex layout:
 *   - On medium screens and up (`md:`), title and link are justified between.
 *   - On smaller screens (`max-md:`), layout stacks vertically.
 *
 * @example
 * ```tsx
 * <PersonIndexHeader />
 * ```
 */
const PersonIndexHeader: FC = () => {
    return (
        <header
            className={cn(
                "flex",
                "max-md:flex-col",
                "md:justify-between md:items-center",
            )}
        >
            {/* Page title and description */}
            <section>
                <HeaderTitle>Persons</HeaderTitle>
                <HeaderDescription>
                    The actors and crew behind movies.
                </HeaderDescription>
            </section>

            {/* Call-to-action link for creating a new person */}
            <section className="flex justify-end items-center">
                <HeaderLink
                    variant="link"
                    to="/admin/persons/create"
                    component={PersonIndexHeader.name}
                    message="Navigate to form for creating persons."
                >
                    <Plus /> Create
                </HeaderLink>
            </section>
        </header>
    );
};

export default PersonIndexHeader;
