import {FC} from 'react';
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {ChevronRight, Plus} from "lucide-react";
import PageSection from "@/common/components/page/PageSection.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import TheatreScreenPreviewCard from "@/pages/theatres/components/screens/preview/TheatreScreenPreviewCard.tsx";

interface Props {
    screens: ScreenDetails[];
    theatreID: ObjectId;
}

const TheatreScreensPageSection: FC<Props> = ({screens, theatreID}) => {
    if (screens.length > 0) {
        return (
            <PageSection title="Screens" className="space-y-3">
                <section className="grid grid-cols-1 gap-3">
                    {screens.map(screen => <TheatreScreenPreviewCard key={screen._id} screen={screen}/>)}
                </section>

                <section className="flex justify-end items-center">
                    <ButtonLink
                        className="text-gray-400 hover:text-black"
                        to={`/admin/theatres/get/${theatreID}/screens`}
                    >
                        <ChevronRight/> More Details
                    </ButtonLink>
                </section>
            </PageSection>
        );
    }

    return (
        <PageSection title="Screens">
            <section className={cn(
                "flex flex-col",
                "justify-center items-center",
                "space-y-2",
            )}>
                <span className="select-none text-neutral-400">
                    There Are No Screens
                </span>

                <ButtonLink
                    className="text-gray-400 hover:text-black"
                    to={`/admin/theatres/get/${theatreID}/screens`}
                    size="sm"
                >
                    <Plus/> Add Screens
                </ButtonLink>
            </section>
        </PageSection>
    );

};

export default TheatreScreensPageSection;
