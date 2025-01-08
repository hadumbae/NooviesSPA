import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {TableOfContents} from "lucide-react";
import TheatreOptions from "@/pages/theatres/components/TheatreOptions.tsx";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {useNavigate} from "react-router-dom";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

interface Props {
    theatre: Theatre;
}

const TheatreDetailsHeader: FC<Props> = ({theatre}) => {
    const navigate = useNavigate();
    const navigateToIndex = () => {
        navigate("/admin/theatres");
    }

    const {name} = theatre;

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>Theatre</HeaderDescription>
            </div>

            <div className="flex items-center space-x-2">
                <Button className="p-2" variant="outline" onClick={navigateToIndex}>
                    <TableOfContents/>
                </Button>

                <TheatreOptions variant="outline" className="p-2"
                    theatre={theatre} onDelete={navigateToIndex}
                />
            </div>
        </header>
    );
};

export default TheatreDetailsHeader;
