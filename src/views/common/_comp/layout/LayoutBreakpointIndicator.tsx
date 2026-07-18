/**
 * @fileoverview A visual utility component that displays the current Tailwind CSS breakpoint.
 */

import {ReactElement} from 'react';

/** A fixed-position indicator that reveals the active responsive breakpoint for debugging. */
export function LayoutBreakpointIndicator(): ReactElement {
    return (
        <>
            <span className="primary-text sm:hidden">Is XS</span>
            <span className="primary-text max-sm:hidden md:hidden">Is SM</span>
            <span className="primary-text max-md:hidden lg:hidden">Is MD</span>
            <span className="primary-text max-lg:hidden xl:hidden">Is LG</span>
            <span className="primary-text max-xl:hidden 2xl:hidden">Is XL</span>
            <span className="primary-text max-2xl:hidden">Is 2XL</span>
        </>
    );
}
