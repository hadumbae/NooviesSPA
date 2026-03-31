/**
 * @file Footer component for the primary application layout.
 * @filename BaseLayoutFooter.tsx
 */

import {ReactElement} from "react";

/**
 * Renders a consistent, minimal visual anchor at the bottom of the page.
 */
const BaseLayoutFooter = (): ReactElement => {
    /** Extracts the current year for the copyright notice. */
    const currentYear = (new Date()).getFullYear();

    return (
        <footer className="font-mono text-center text-neutral-500">
            <span className="text-xs lg:text-sm">
                All Rights Reserved <b>@ {currentYear}</b> | Noovies Ltd.
            </span>
        </footer>
    );
};

export default BaseLayoutFooter;