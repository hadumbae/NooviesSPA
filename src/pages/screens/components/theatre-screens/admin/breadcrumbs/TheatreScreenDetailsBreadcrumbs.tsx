import {FC} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

type DetailsBreadcrumbs = {
    theatreID: ObjectId;
    theatreName?: string;
    screenName?: string;
}

const TheatreScreenDetailsBreadcrumbs: FC<DetailsBreadcrumbs> = ({theatreID, theatreName, screenName}) => {
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
                        <Link to={`/admin/theatres/get/${theatreID}`}>
                            {theatreName ?? "Theatre"} | Details
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={`/admin/theatres/get/${theatreID}/screens`}>
                            Screens
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>{screenName ?? "Screen Details"}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default TheatreScreenDetailsBreadcrumbs;
