import {FC} from 'react';
import {TableCell, TableRow} from "@/common/components/ui/table.tsx";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {Pencil, Search, Trash} from "lucide-react";
import TheatreScreenFormDrawer
    from "@/pages/screens/components/theatre-screens/admin/forms/TheatreScreenFormDrawer.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import ScreenDeleteWarningDialog from "@/pages/screens/components/dialog/ScreenDeleteWarningDialog.tsx";

type RowProps = {
    screen: ScreenDetails;
}

const TheatreScreenListTableRow: FC<RowProps> = ({screen}) => {
    const {_id, name, screenType, seatCount, capacity, futureShowingCount, theatre: {_id: theatreID}} = screen;
    const simpleScreen = {...screen, theatre: theatreID};

    return (
        <TableRow key={`screen-list-item-${_id}`}>
            <TableCell>{name}</TableCell>

            <TableCell>{screenType}</TableCell>

            <TableCell>{seatCount} seats</TableCell>

            <TableCell>{capacity} seats</TableCell>

            <TableCell>{futureShowingCount} showings</TableCell>

            <TableCell className="text-center">
                <ButtonLink
                    to={`/admin/theatres/get/${theatreID}/screen/${_id}`}
                    variant="link" size="sm" target="_blank"
                >
                    <Search/> Details
                </ButtonLink>
            </TableCell>

            <TableCell className="text-center">
                <TheatreScreenFormDrawer theatreID={theatreID} isEditing={true} screen={simpleScreen}>
                    <Button variant="link" size="sm" className="text-neutral-400 hover:text-black">
                        <Pencil/> Editing
                    </Button>
                </TheatreScreenFormDrawer>
            </TableCell>

            <TableCell className="text-center">
                <ScreenDeleteWarningDialog screenID={_id} screenName={name}>
                    <Button variant="link" size="sm" className="text-neutral-400 hover:text-black">
                        <Trash/> Delete
                    </Button>
                </ScreenDeleteWarningDialog>
            </TableCell>
        </TableRow>
    );
};

export default TheatreScreenListTableRow;
