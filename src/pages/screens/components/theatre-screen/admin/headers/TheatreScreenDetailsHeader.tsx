import { FC } from 'react';
import { TheatreDetails } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import { ScreenDetails } from "@/pages/screens/schema/screen/Screen.types.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import { Plus, Trash } from "lucide-react";
import ScreenDeleteWarningDialog from "@/pages/screens/components/screens/ScreenDeleteWarningDialog.tsx";
import SeatSubmitFormPanel from "@/pages/seats/components/forms/submit-form/SeatSubmitFormPanel.tsx";

import { SeatFormValues } from "@/pages/seats/schema/form/SeatForm.types.ts";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";

/**
 * Props for the `TheatreScreenDetailsHeader` component.
 */
type DetailsHeader = {
    /** The theatre to which the screen belongs. */
    theatre: TheatreDetails;

    /** The screen whose details are displayed. */
    screen: ScreenDetails;
};

/**
 * Displays a header section for a theatre's screen details.
 *
 * Includes:
 * - The screen's title and description.
 * - A button to add a new seat.
 * - A button to delete the screen with confirmation dialog.
 *
 * @param props - Component props.
 * @param props.theatre - The theatre to which the screen belongs.
 * @param props.screen - The screen whose details are displayed.
 *
 * @returns A React header element with screen details and actionable buttons.
 */
const TheatreScreenDetailsHeader: FC<DetailsHeader> = ({ theatre, screen }) => {
    const navigate = useLoggedNavigate();

    const { _id: theatreID, name: theatreName } = theatre;
    const { _id: screenID, name: screenName } = screen;

    const presetValues = { theatre: theatreID, screen: screenID };
    const disableFields: (keyof SeatFormValues)[] = ["theatre", "screen"];

    /**
     * Callback fired when the screen is successfully deleted.
     * Navigates back to the theatre details page.
     */
    const onDelete = () => {
        navigate({
            component: ScreenDeleteWarningDialog.name,
            to: `/admin/theatres/get/${theatreID}`,
        });
    }

    /**
     * Seat addition panel with preset values for theatre and screen.
     */
    const seatFormPanel = (
        <SeatSubmitFormPanel presetValues={presetValues} disableFields={disableFields}>
            <Button variant="link" size="sm" className="text-neutral-400 hover:text-black">
                <Plus /> Seat
            </Button>
        </SeatSubmitFormPanel>
    );

    /**
     * Screen deletion dialog with confirmation.
     */
    const screenDeleteDialog = (
        <ScreenDeleteWarningDialog screenID={screenID} onDeleteSuccess={onDelete}>
            <Button variant="link" size="sm" className="text-neutral-400 hover:text-black">
                <Trash /> Delete
            </Button>
        </ScreenDeleteWarningDialog>
    );

    return (
        <header className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <section>
                <HeaderTitle>{screenName} Details</HeaderTitle>
                <HeaderDescription>
                    Screen at {theatreName}. Handle seats and showings here.
                </HeaderDescription>
            </section>
            <section className="text-right">
                {seatFormPanel}
                {screenDeleteDialog}
            </section>
        </header>
    );
};

export default TheatreScreenDetailsHeader;
