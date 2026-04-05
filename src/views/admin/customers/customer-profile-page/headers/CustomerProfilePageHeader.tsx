/**
 * @file Header component for the Customer Profile administrative view.
 * @filename CustomerProfilePageHeader.tsx
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";

/**
 * Properties for the CustomerProfilePageHeader component.
 */
type HeaderProps = {
    /** The full legal or display name of the customer. */
    name: string;

    /** The unique identification code (e.g., USR-XXXXX) for the customer. */
    code: UserUniqueCode;
};

/**
 * Renders the standardized page title and customer identity metadata.
 * ---
 */
export const CustomerProfilePageHeader = (
    {name, code}: HeaderProps
) => {
    return (
        <header className="space-y-1">
            <h1 className="page-title text-2xl font-bold tracking-tight">Customer Profile</h1>
            <h2 className="page-subtitle font-light">{code} | {name}</h2>
        </header>
    );
};