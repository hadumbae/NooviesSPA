/**
 * @fileoverview Header component for the Customer Profile administrative view.
 */

import {UserUniqueCode} from "@/domains/users/schema/fields/UserUniqueCodeSchema.ts";
import {ReactElement} from "react";

/** Props for the CustomerProfilePageHeader component. */
type HeaderProps = {
    name: string;
    code: UserUniqueCode;
};

/**
 * Renders the page title and customer identity metadata for the profile view.
 */
export function CustomerProfilePageHeader(
    {name, code}: HeaderProps
): ReactElement {
    return (
        <header className="space-y-1">
            <h1 className="page-title text-2xl font-bold tracking-tight">Customer Profile</h1>
            <h2 className="page-subtitle font-light">{code} | {name}</h2>
        </header>
    );
}