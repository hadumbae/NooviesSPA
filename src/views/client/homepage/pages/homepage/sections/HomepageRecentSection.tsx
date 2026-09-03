/**
 * @fileoverview Section component for displaying recently released movies in an interactive carousel on the homepage.
 */

import {ReactElement, useEffect, useState} from "react";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/views/common/_comp/ui";
import {MovieSummary} from "@/domains/movies/_schema/movie/MovieSummarySchema.ts";
import {HomepageMovieCard} from "@/views/client/homepage/_comp";
import {PageSectionHeader} from "@/views/common/_comp";
import {cn} from "@/common/_feat";
import Autoplay from "embla-carousel-autoplay";

/** Props for the HomepageRecentSection component. */
type SectionProps = {
    recentMovies: MovieSummary[];
};

/** Displays an autoplaying carousel of recently released movies with pagination indicators. */
export function HomepageRecentSection(
    {recentMovies}: SectionProps
): ReactElement {
    const [api, setAPI] = useState<CarouselApi>();
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    useEffect(() => {
        if (!api) return;

        setScrollSnaps(api.scrollSnapList());
        setSelectedIndex(api.selectedScrollSnap());

        const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
        api.on("select", onSelect);
        api.on("reInit", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api])

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Recent"/>

            <div className="space-y-2">
                <Carousel
                    setApi={setAPI}
                    opts={{align: "start", loop: true}}
                    plugins={[Autoplay({delay: 8000, stopOnInteraction: true})]}
                >
                    <CarouselContent>
                        {
                            recentMovies.map((recentMovie) => (
                                <CarouselItem key={recentMovie._id}>
                                    <HomepageMovieCard
                                        movie={recentMovie}
                                        classNames={{image: "h-64"}}
                                        showGenreBadges={true}
                                    />
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                </Carousel>

                <div className="flex justify-center items-center space-x-3">
                    {
                        scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => api?.scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                className={cn(
                                    "h-2 w-2 rounded-full transition-colors",
                                    index === selectedIndex
                                        ? "bg-black dark:bg-neutral-700"
                                        : "bg-neutral-200 dark:bg-neutral-500"
                                )}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}