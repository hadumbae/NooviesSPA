import {FC} from 'react';
import TheatreScreensPreviewList from "@/pages/theatres/components/screens/preview/TheatreScreensPreviewList.tsx";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {ChevronRight, Plus} from "lucide-react";
import PageSection from "@/common/components/page/PageSection.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";

interface Props {
    screens: Screen[];
    theatreID: ObjectId;
}

const TheatreScreensPageSection: FC<Props> = ({screens, theatreID}) => {
    if (screens.length > 0) {
        return (
            <PageSection title="Screens">
                <section className="grid grid-cols-2 gap-3">
                    <TheatreScreensPreviewList screens={screens}/>
                </section>

                <section className="flex justify-end items-center">
                    <ButtonLink className="text-gray-400 hover:text-black" to={`/admin/theatres/get/${theatreID}/screens`}>
                        <ChevronRight /> More Details
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
                    <Plus /> Add Screens
                </ButtonLink>
            </section>
        </PageSection>
    );

};

export default TheatreScreensPageSection;
