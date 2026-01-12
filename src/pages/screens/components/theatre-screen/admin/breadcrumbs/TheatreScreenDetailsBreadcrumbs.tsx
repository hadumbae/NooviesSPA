import {FC} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";

type DetailsBreadcrumbs = {
    theatreSlug: string;
    theatreName?: string;
    screenName?: string;
}

const TheatreScreenDetailsBreadcrumbs: FC<DetailsBreadcrumbs> = ({theatreSlug, theatreName, screenName}) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/theatres">
                            Index
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={`/admin/theatres/get/${theatreSlug}`}>
                            {theatreName ?? "Theatre"} | Details
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>{screenName ?? "Screen Details"} | Screen</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default TheatreScreenDetailsBreadcrumbs;
