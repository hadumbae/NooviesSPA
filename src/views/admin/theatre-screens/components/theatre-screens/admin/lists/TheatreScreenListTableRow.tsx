/**
 * @fileoverview Table row component for the Theatre Screens administration list.
 * Handles the display of screen metadata and integrates mutation entry points (Edit/Delete).
 */

import {FC, useState} from 'react';
import {TableCell, TableRow} from "@/common/components/ui/table.tsx";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {Pencil, Search, Trash} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import {ScreenDeleteWarningDialog} from "@/views/admin/theatre-screens/components/dialog/ScreenDeleteWarningDialog.tsx";
import simplifyScreenDetails from "@/domains/theatre-screens/utilities/simplifyScreenDetails.ts";
import {TheatreScreenDetails} from "@/domains/theatre-screens/schema/model";
import {TheatreScreenSubmitForm, TheatreScreenSubmitFormPanel} from "@/views/admin/theatre-screens/_feat/submit-data";

/** Props for the TheatreScreenListTableRow component. */
type RowProps = {
    /** The fully hydrated screen details object from the API. */
    screen: TheatreScreenDetails;
};

/**
 * Renders a single row in the Theatre Screens table.
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
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

    return (
        <TableRow key={`screen-list-item-${_id}`}>
            <TableCell className="font-medium">{name}</TableCell>

            <TableCell>{screenType}</TableCell>

            <TableCell>{seatCount} seats</TableCell>

            <TableCell>{capacity} capacity</TableCell>

            <TableCell>{futureShowingCount} showings</TableCell>

            <TableCell className="text-center">
                <ButtonLink
                    to={`/admin/theatres/get/${theatreSlug}/screen/${screenSlug}`}
                    variant="link"
                    size="sm"
                    target="_blank"
                >
                    <Search className="mr-2 h-4 w-4"/> Details
                </ButtonLink>
            </TableCell>

            <TableCell className="text-center">
                <TheatreScreenSubmitForm
                    editEntity={simplifiedScreen}
                    presetValues={{theatre: theatreID}}
                    successMessage="Screen updated successfully."
                >
                    <TheatreScreenSubmitFormPanel
                        isOpen={isEditOpen}
                        setIsOpen={setIsEditOpen}
                        title="Edit Screen"
                        description={`Updating ${name}. Provide new capacity or configuration below.`}
                        disableFields={{theatre: true}}
                    >
                        <Button variant="link" size="sm" className="text-neutral-400 hover:text-primary">
                            <Pencil/> Edit
                        </Button>
                    </TheatreScreenSubmitFormPanel>
                </TheatreScreenSubmitForm>
            </TableCell>

            <TableCell className="text-center">
                <ScreenDeleteWarningDialog screenID={_id} screenName={name}>
                    <Button variant="link" size="sm" className="text-neutral-400 hover:text-destructive">
                        <Trash/> Delete
                    </Button>
                </ScreenDeleteWarningDialog>
            </TableCell>
        </TableRow>
    );
};

export default TheatreScreenListTableRow;