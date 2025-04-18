import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/base/ScreenSchema.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {Pencil, TableOfContents, Trash} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {cn} from "@/common/lib/utils.ts";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import useScreenDeleteMutation from "@/pages/screens/hooks/mutations/useScreenDeleteMutation.ts";
import HeaderButton from "@/common/components/page/headers/HeaderButton.tsx";

interface Props {
    screen: Screen;
}

const ScreenDetailsHeader: FC<Props> = ({screen}) => {
    const navigate = useNavigate();

    const {_id, name, screenType, theatre} = screen;
    const theatreName = (theatre as Theatre).name;

    const {mutate, isPending, isSuccess} = useScreenDeleteMutation({onDelete: () => navigate("/admin/screens")});
    const isDisabled = isPending || isSuccess;

    const deleteScreen = () => mutate({_id});

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center",
        )}>
            <section>
                <HeaderTitle>{name} | {screenType}</HeaderTitle>
                <HeaderDescription>Screen at {theatreName}.</HeaderDescription>
            </section>

            <section className="space-x-2 flex justify-end items-center">
                <HeaderLink variant="link" to="/admin/screens">
                    <TableOfContents/> Index
                </HeaderLink>

                <HeaderLink variant="link" to={`/admin/screens/edit/${_id}`}>
                    <Pencil /> Edit
                </HeaderLink>

                <HeaderButton variant="link" onClick={deleteScreen} disabled={isDisabled}>
                    <Trash /> Delete
                </HeaderButton>
            </section>
        </header>
    );
};

export default ScreenDetailsHeader;
