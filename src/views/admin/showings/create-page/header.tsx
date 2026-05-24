/**
 * @fileoverview Header component for the showing creation page in the admin panel.
 */

import {ReactElement} from "react";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

/** Header for the Create Showings page that displays the title and submission instructions. */
export function ShowingCreateHeader(): ReactElement {
    return (
        <header className="space-y-1">
            <HeaderTitle>Create Showings</HeaderTitle>
            <HeaderDescription>
                Enter details and press on `Submit` to create showings.
            </HeaderDescription>
        </header>
    );
}
