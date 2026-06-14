/**
 * @fileoverview Section for displaying and managing the image of a specific genre.
 */

import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {GenreImageBanner} from "@/views/admin/genres/_comp";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {Genre} from "@/domains/genres/schema";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {Plus, Trash} from "lucide-react";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {GenreDetailsUIPendingStateContext, GenreDetailsUISetterContext} from "@/domains/genres/context";

/** Props for the GenreDetailsPageImageSection component. */
type SectionProps = {
    genre: Genre;
};

/**
 * Displays the genre banner image and provides actions to update or remove it.
 */
export function GenreDetailsPageImageSection(
    {genre}: SectionProps
): ReactElement {
    const {name, image} = genre;
    const {setIsUpdatingImage, setIsRemovingImage} = useRequiredContext({context: GenreDetailsUISetterContext});
    const {isImageRemovalPending} = useRequiredContext({context: GenreDetailsUIPendingStateContext});

    return (
        <section className="space-y-4">
            <SROnly text="Genre Image"/>

            <div className="flex justify-between items-center">
                <PageSectionHeader text="Image"/>

                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setIsUpdatingImage(true)}>
                        <Plus/> Update Image
                    </Button>

                    {
                        image &&
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={isImageRemovalPending}
                            onClick={() => setIsRemovingImage(true)}
                        >
                            {
                                isImageRemovalPending ? (<AnimatedLoader/>) : (
                                    <>
                                        <Trash/> Remove Image
                                    </>
                                )
                            }
                        </Button>
                    }
                </div>
            </div>

            {
                image
                    ? <GenreImageBanner genreName={name} image={image} className="w-full h-72"/>
                    : <EmptyArrayContainer text="No Image" className="border rounded-xl h-28"/>
            }
        </section>
    );
}