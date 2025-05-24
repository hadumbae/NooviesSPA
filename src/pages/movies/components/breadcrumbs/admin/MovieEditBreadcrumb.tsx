import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";

interface EditProps {
    movie: Movie;
}

const MovieEditBreadcrumb: FC<EditProps> = ({movie}) => {
    const {_id} = movie;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/movies">
                        Index
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink href={`/admin/movies/get/${_id}`}>
                        Movie Details
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        Edit Movie
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default MovieEditBreadcrumb;
