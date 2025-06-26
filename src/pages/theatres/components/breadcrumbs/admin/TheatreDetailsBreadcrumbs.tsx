import {FC} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";

type DetailsBreadcrumbProps = {
    theatreName?: string;
}

const TheatreDetailsBreadcrumbs: FC<DetailsBreadcrumbProps> = ({theatreName}) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/theatres">Index</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>{theatreName ?? "Theatre"} | Details</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default TheatreDetailsBreadcrumbs;
