import {FC, PropsWithChildren} from 'react';
import HeaderSubtitle from "@/common/components/page/headers/HeaderSubtitle.tsx";
import {cn} from "@/common/lib/utils.ts";

interface PageSectionProps {
    /**
     * Optional title displayed as a subtitle at the top of the section.
     */
    className?: string;

    /**
     * Optional title displayed as a subtitle at the top of the section.
     */
    title?: string;

    /**
     * Optional title for screen readers.
     */
    srTitle?: string;
}

/**
 * A layout component that renders a titled section with consistent vertical spacing.
 *
 * @remarks
 * This component is useful for grouping related content under a common heading,
 * maintaining consistent spacing and styling across different sections of a page.
 *
 * @param title - Optional title displayed as a subtitle at the top of the section.
 * @param srTitle - Optional title for screen readers at the top of the section.
 * @param className - Optional additional CSS classes to customize the inner content container.
 * @param children - The content to be rendered within the section.
 *
 * @returns The rendered section element containing an optional title and the provided children.
 *
 */
const PageSection: FC<PropsWithChildren<PageSectionProps>> = ({children, className, title, srTitle}) => {
    return (
        <section className="space-y-2">
            {title && <HeaderSubtitle>{title}</HeaderSubtitle>}
            {srTitle && <h1 className="sr-only">{srTitle}</h1>}

            <div className={cn(className)}>
                {children}
            </div>
        </section>
    );
};

export default PageSection;
