import {FC} from 'react';
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {Accordion} from "@/common/components/ui/accordion.tsx";
import TheatreScreenAccordionItem
    from "@/pages/screens/components/theatre-screens/admin/lists/TheatreScreenAccordionItem.tsx";

type AccordionProps = {
    screens: ScreenDetails[];
}

const TheatreScreenAccordion: FC<AccordionProps> = ({screens}) => {
    return (
        <Accordion type="single" collapsible={true}>
            {screens.map(screen => <TheatreScreenAccordionItem key={screen._id} screen={screen}/>)}
        </Accordion>
    );
};

export default TheatreScreenAccordion;
