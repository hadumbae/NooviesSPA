/**
 * @file Compact showings navigation section for a movie detail page.
 *
 * MovieOverviewShowings.tsx
 */

import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import { SectionHeaderCSS } from "@/common/constants/css/TextCSS.ts";
import { ChevronRight } from "lucide-react";

/**
 * Props for MovieOverviewShowings.
 */
type OverviewProps = {
    movieSlug: string;
};

/**
 * Renders a minimal “Showings” section with navigation
 * to the full movie showings page.
 *
 * Typically used within a movie detail view as a quick-access
 * link rather than displaying actual showtime data.
 */
const MovieOverviewShowings = ({ movieSlug }: OverviewProps) => {
    return (
        <section className="space-y-4">
            <SectionHeader className={SectionHeaderCSS}>
                Showings
            </SectionHeader>

            <div className="text-right">
                <LoggedHoverLink to={`/browse/movies/${movieSlug}/showings`}>
                    <ChevronRight /> Browse Showings
                </LoggedHoverLink>
            </div>
        </section>
    );
};

export default MovieOverviewShowings;