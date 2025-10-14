import {FC} from 'react';

import {Accordion} from "@/common/components/ui/accordion.tsx";
import TheatreScreenShowingAccordionItem
    from "@/pages/theatres/components/screens/accordion/TheatreScreenShowingAccordionItem.tsx";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";

interface TheatreScreenShowingAccordionProps {
    showings: ShowingDetails[];
}

const TheatreScreenShowingAccordion: FC<TheatreScreenShowingAccordionProps> = ({showings}) => {
    return (
        <Accordion type="single" collapsible>
            {
                showings.map(
                    (showing, index) => <TheatreScreenShowingAccordionItem
                        value={`item-${index}`}
                        showing={showing}
                    />
                )
            }
        </Accordion>
    );
};

export default TheatreScreenShowingAccordion;
