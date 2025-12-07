/**
 * @file TheatreDetailsHeader.tsx
 * @description Header block for the Theatre Details admin page.
 *
 * Shows:
 * - Theatre name (title)
 * - Static subtitle ("Theatre")
 * - Right-side options button for admin actions
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import TheatreDetailsOptions from "@/pages/theatres/components/features/admin/TheatreDetailsOptions.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import { Ellipsis } from "lucide-react";

/** Props for {@link TheatreDetailsHeader}. */
export type HeaderProps = {
    /** Theatre name shown as page title. */
    theatreName: string;
};

/**
 * **TheatreDetailsHeader**
 * Title + subtitle + admin options button.
 *
 * @example
 * ```tsx
 * <TheatreDetailsHeader theatreName="Central Cinema" />
 * ```
 */
const TheatreDetailsHeader = ({ theatreName }: HeaderProps) => {
    return (
        <header className="flex justify-between items-center">
            <section>
                <HeaderTitle>{theatreName}</HeaderTitle>
                <HeaderDescription>Theatre</HeaderDescription>
            </section>

            <TheatreDetailsOptions>
                <IconButton>
                    <Ellipsis />
                </IconButton>
            </TheatreDetailsOptions>
        </header>
    );
};

export default TheatreDetailsHeader;
