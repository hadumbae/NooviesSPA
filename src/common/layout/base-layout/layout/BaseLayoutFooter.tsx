import {FC} from 'react';

/**
 * @component BaseLayoutFooter
 * @description
 * A simple footer component that displays ownership and copyright information
 * for Noovies Ltd., including the dynamically generated current year.
 *
 * The footer uses a stylized font and neutral color scheme to complement
 * the overall layout design, providing a consistent and minimal visual anchor
 * at the bottom of the page.
 *
 * @example
 * ```tsx
 * <BaseLayoutFooter />
 * ```
 *
 * @remarks
 * - Automatically updates the displayed year using `new Date().getFullYear()`.
 * - Uses the `dotgothic16-regular` font for a distinctive aesthetic.
 * - Center-aligns its text and applies a neutral tone (`text-neutral-500`).
 * - Intended to be used at the bottom of the `BaseLayout`.
 *
 * @returns {JSX.Element} A styled footer displaying copyright text and the current year.
 */
const BaseLayoutFooter: FC = () => {
    const currentYear = (new Date()).getFullYear();

    return (
        <footer className="dotgothic16-regular text-center text-neutral-500">
            <span className="text-sm">
                All Rights Reserved <span className="font-bold">@{currentYear}</span> | Noovies Ltd.
            </span>
        </footer>
    );
};

export default BaseLayoutFooter;
