/**
 * @file TheatreScreenListTableRow.tsx
 *
 * Table row component for rendering a single theatre screen entry
 * within the admin screens list.
 *
 * Provides quick access to:
 * - Screen details view
 * - Screen edit drawer
 * - Screen delete confirmation dialog
 */

import {FC} from 'react';
import {TableCell, TableRow} from "@/common/components/ui/table.tsx";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {Pencil, Search, Trash} from "lucide-react";
import TheatreScreenFormDrawer
    from "@/pages/screens/components/theatre-screens/admin/forms/TheatreScreenFormDrawer.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import ScreenDeleteWarningDialog from "@/pages/screens/components/dialog/ScreenDeleteWarningDialog.tsx";
import simplifyScreenDetails from "@/pages/screens/utilities/simplifyScreenDetails.ts";

/**
 * Props for {@link TheatreScreenListTableRow}.
 */
type RowProps = {
    /**
     * Fully hydrated screen details object.
     */
    screen: ScreenDetails;
};

/**
 * Admin table row for a theatre screen.
 *
 * Renders screen metadata alongside contextual actions
 * for viewing, editing, and deleting the screen.
 *
 * @param screen Screen details to render
 */
const TheatreScreenListTableRow: FC<RowProps> = ({screen}) => {
    const {
        _id,
        name,
        screenType,
        seatCount,
        capacity,
        futureShowingCount,
        theatre: {_id: theatreID, slug: theatreSlug},
        slug: screenSlug,
    } = screen;

    const simplifiedScreen = simplifyScreenDetails(screen);

    return (
        <TableRow key={`screen-list-item-${_id}`}>
            <TableCell>{name}</TableCell>

            <TableCell>{screenType}</TableCell>

            <TableCell>{seatCount} seats</TableCell>

            <TableCell>{capacity} seats</TableCell>

            <TableCell>{futureShowingCount} showings</TableCell>

            <TableCell className="text-center">
                <ButtonLink
                    to={`/admin/theatres/get/${theatreSlug}/screen/${screenSlug}`}
                    variant="link"
                    size="sm"
                    target="_blank"
                >
                    <Search /> Details
                </ButtonLink>
            </TableCell>

            <TableCell className="text-center">
                <TheatreScreenFormDrawer
                    theatreID={theatreID}
                    isEditing={true}
                    screen={simplifiedScreen}
                >
                    <Button
                        variant="link"
                        size="sm"
                        className="text-neutral-400 hover:text-black"
                    >
                        <Pencil /> Editing
                    </Button>
                </TheatreScreenFormDrawer>
            </TableCell>

            <TableCell className="text-center">
                <ScreenDeleteWarningDialog
                    screenID={_id}
                    screenName={name}
                >
                    <Button
                        variant="link"
                        size="sm"
                        className="text-neutral-400 hover:text-black"
                    >
                        <Trash /> Delete
                    </Button>
                </ScreenDeleteWarningDialog>
            </TableCell>
        </TableRow>
    );
};

export default TheatreScreenListTableRow;
