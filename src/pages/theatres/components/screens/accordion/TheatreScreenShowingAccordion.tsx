import {FC} from 'react';

import {Accordion} from "@/common/components/ui/accordion.tsx";
import {ShowingWithMovie} from "@/pages/showings/schema/populated/ShowingWithMovieSchema.ts";
import TheatreScreenShowingAccordionItem
    from "@/pages/theatres/components/screens/accordion/TheatreScreenShowingAccordionItem.tsx";

interface TheatreScreenShowingAccordionProps {
    showings: ShowingWithMovie[];
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
