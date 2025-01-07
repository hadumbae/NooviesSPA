import {FC} from 'react';
import useFetchTheatre from "@/pages/theatres/hooks/useFetchTheatre.ts";
import useFetchTheatreParams from "@/pages/theatres/hooks/useFetchTheatreParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {useNavigate} from "react-router-dom";
import {TableOfContents} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import TheatreOptions from "@/pages/theatres/components/TheatreOptions.tsx";

const TheatrePage: FC = () => {
    const navigate = useNavigate();
    const {theatreID} = useFetchTheatreParams();
    const {data: theatre, isPending, isError, error} = useFetchTheatre({_id: theatreID!});

    const navigateToIndex = () => {
        navigate("/admin/theatres");
    }

    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />

    const {name} = theatre;

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <HeaderTitle>{name}</HeaderTitle>

                <div className="flex items-center space-x-2">
                    <Button className="p-2" variant="outline" onClick={navigateToIndex}>
                        <TableOfContents />
                    </Button>

                    <TheatreOptions
                        theatre={theatre}
                        onDelete={navigateToIndex}
                        variant="outline"
                        className="p-2"
                    />
                </div>
            </header>


        </PageFlexWrapper>
    );
};

export default TheatrePage;
