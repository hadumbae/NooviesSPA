import {FC} from 'react';
import {TabsContent} from "@/common/components/ui/tabs.tsx";

type ShowingsTabProps  = {
    tabValue: string;
    page: number;
    perPage: number;
};


const TheatreScreenPageShowingsTab: FC<ShowingsTabProps> = ({tabValue = "showings", page, perPage}) => {
    return (
        <TabsContent value={tabValue}>
            <p>Showings</p>
            <p>Page : {page}</p>
            <p>Per Page : {perPage}</p>
        </TabsContent>
    );
};

export default TheatreScreenPageShowingsTab;
