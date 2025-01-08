import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {TableOfContents} from "lucide-react";
import ScreenOptions from "@/pages/screens/components/ScreenOptions.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "@/common/components/ui/button.tsx";

interface Props {
    screen: Screen;
}

const ScreenDetailsHeader: FC<Props> = ({screen}) => {
    const navigate = useNavigate();
    const navigateToIndex = () => {
        navigate("/admin/screens");
    }

    const {name, screenType, theatre} = screen;
    const theatreName = (theatre as Theatre).name;

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{name} | {screenType}</HeaderTitle>
                <HeaderDescription>Screen at {theatreName}.</HeaderDescription>
            </div>

            <div className="space-x-2">
                <Button
                    className="p-2"
                    variant="outline"
                    onClick={navigateToIndex}
                >
                    <TableOfContents/>
                </Button>

                <ScreenOptions
                    screen={screen}
                    onDelete={navigateToIndex}
                    variant="outline"
                    className="p-2"
                />
            </div>
        </header>
    );
};

export default ScreenDetailsHeader;
