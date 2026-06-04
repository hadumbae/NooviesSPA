/**
 * @fileoverview Header component for the authentication login page.
 */

import {ReactElement} from "react";

/**
 * Renders the header section of the login page containing the primary title.
 */
export function AuthLoginPageHeader(): ReactElement {
    return (
        <header>
            <h1 className="primary-text uppercase text-3xl font-extrabold">
                Login
            </h1>
        </header>
    );
}