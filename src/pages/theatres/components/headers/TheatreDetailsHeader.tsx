import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {Pencil, Trash} from "lucide-react";
import {useNavigate} from "react-router-dom";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import TheatreSubmitFormPanel from "@/pages/theatres/components/theatre-submit-form/TheatreSubmitFormPanel.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import TheatreDeleteWarningDialog
    from "@/pages/theatres/components/theatres/delete-theatre/TheatreDeleteWarningDialog.tsx";

interface Props {
    theatre: Theatre;
}

const TheatreDetailsHeader: FC<Props> = ({theatre}) => {
    const navigate = useNavigate();
    const {_id, name} = theatre;

    const onDelete = () => {
        console.log("To Delete")
        navigate("/admin/theatres")
    }

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center",
        )}>
            <section>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>Theatre</HeaderDescription>
            </section>

            <section className="space-x-2 flex justify-end items-center ">
                <TheatreSubmitFormPanel isEditing={true} theatre={theatre}>
                    <Button variant="link" className="text-neutral-400 hover:text-black">
                        <Pencil/> Edit
                    </Button>
                </TheatreSubmitFormPanel>

                <TheatreDeleteWarningDialog theatreID={_id} onDelete={onDelete}>
                    <Button variant="link" className="text-neutral-400 hover:text-black">
                        <Trash/> Delete
                    </Button>
                </TheatreDeleteWarningDialog>

            </section>
        </header>
    );
};

export default TheatreDetailsHeader;
