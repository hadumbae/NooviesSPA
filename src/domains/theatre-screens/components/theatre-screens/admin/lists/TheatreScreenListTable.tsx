import {FC} from 'react';
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/common/components/ui/table.tsx";
import TheatreScreenListTableRow
    from "@/domains/theatre-screens/components/theatre-screens/admin/lists/TheatreScreenListTableRow.tsx";
import {TheatreScreenDetails} from "@/domains/theatre-screens/schema/model";

type ListTableProps = {
    screens: TheatreScreenDetails[];
}

const TheatreScreenListTable: FC<ListTableProps> = ({screens}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Registered Seats</TableHead>
                    <TableHead>Seat Capacity</TableHead>
                    <TableHead>Upcoming Showings</TableHead>
                    <TableHead className="text-center">Details</TableHead>
                    <TableHead className="text-center">Edit</TableHead>
                    <TableHead className="text-center">Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {screens.map(screen => <TheatreScreenListTableRow key={screen._id} screen={screen} />)}
            </TableBody>
        </Table>
    );
};

export default TheatreScreenListTable;
