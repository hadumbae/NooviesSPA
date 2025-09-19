import {FC} from 'react';
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Plus, Trash} from "lucide-react";
import {useNavigate} from "react-router-dom";
import ScreenDeleteWarningDialog from "@/pages/screens/components/screens/ScreenDeleteWarningDialog.tsx";
import SeatSubmitFormPanel from "@/pages/seats/components/forms/submit-form/SeatSubmitFormPanel.tsx";

import {SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";

type DetailsHeader = {
    theatre: TheatreDetails;
    screen: ScreenDetails;
};

const TheatreScreenDetailsHeader: FC<DetailsHeader> = ({theatre, screen}) => {
    const navigate = useNavigate();

    const {_id: theatreID, name: theatreName} = theatre;
    const {_id: screenID, name: screenName} = screen;

    const onDelete = () => navigate(`/admin/theatres/get/${theatreID}`);
    const presetValues = {theatre: theatreID, screen: screenID};
    const disableFields: (keyof SeatFormValues)[] = ["theatre", "screen"];

    const seatFormPanel = (
        <SeatSubmitFormPanel presetValues={presetValues} disableFields={disableFields}>
            <Button variant="link" size="sm" className="text-neutral-400 hover:text-black">
                <Plus/> Seat
            </Button>
        </SeatSubmitFormPanel>
    );

    const screenDeleteDialog = (
        <ScreenDeleteWarningDialog screenID={screenID} onSubmitSuccess={onDelete}>
            <Button variant="link" size="sm" className="text-neutral-400 hover:text-black">
                <Trash/> Delete
            </Button>
        </ScreenDeleteWarningDialog>
    );

    return (
        <header className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <section>
                <HeaderTitle>{screenName} Details</HeaderTitle>
                <HeaderDescription>Screen at {theatreName}. Handle seats and showings here.</HeaderDescription>
            </section>
            <section className="text-right">
                {seatFormPanel}
                {screenDeleteDialog}
            </section>
        </header>
    );
};

export default TheatreScreenDetailsHeader;
