/**
 * @file ShowingCreateHeader.tsx
 * @description
 * Header component for the "Create Showings" page in the admin panel.
 *
 * Displays the page title and a brief description of the page purpose.
 *
 * Uses `HeaderTitle` for the main title and `HeaderDescription` for supplemental instructions.
 *
 * @example
 * ```tsx
 * <ShowingCreateHeader />
 * ```
 */

import { FC } from "react";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

/**
 * `ShowingCreateHeader` renders the header for the "Create Showings" page.
 *
 * - Displays the main page title: "Create Showings"
 * - Displays a description: "Enter details and press on `Submit` to create showings."
 *
 * @example
 * ```tsx
 * <ShowingCreateHeader />
 * ```
 */
const ShowingCreateHeader: FC = () => {
    return (
        <header className="space-y-1">
            <HeaderTitle>Create Showings</HeaderTitle>
            <HeaderDescription>
                Enter details and press on `Submit` to create showings.
            </HeaderDescription>
        </header>
    );
};

export default ShowingCreateHeader;
