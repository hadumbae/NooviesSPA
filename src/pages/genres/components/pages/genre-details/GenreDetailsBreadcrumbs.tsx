import {FC} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";

/**
 * Props for the {@link GenreDetailsBreadcrumbs} component.
 */
type BreadcrumbProps = {
    /**
     * The name of the genre currently being viewed.
     */
    genreName: string;
};

/**
 * A breadcrumb navigation component for the genre details page.
 * It provides a link back to the "All Genres" list and shows
 * the current genre name as the active page.
 *
 * @component
 * @example
 * ```tsx
 * <GenreDetailsBreadcrumbs genreName="Action" />
 * ```
 *
 * @param {BreadcrumbProps} props - The props object.
 * @param {string} props.genreName - The name of the genre to display in the breadcrumb.
 *
 * @returns {JSX.Element} A breadcrumb navigation bar for genre details.
 */
const GenreDetailsBreadcrumbs: FC<BreadcrumbProps> = ({genreName}) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/genres">All Genres</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>{genreName} | Details</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default GenreDetailsBreadcrumbs;
