/**
 * @fileoverview Header component for the user registration page.
 */

import {ReactElement} from 'react';

/**
 * Renders the branding and introductory text for the account creation screen.
 */
export function AuthRegisterPageHeader(): ReactElement {
    return (
        <header>
            <h1 className="primary-text uppercase text-3xl font-extrabold">
                Register
            </h1>
        </header>
    );
}
