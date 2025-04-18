import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import convertObjectsToIDs from "@/common/utility/convertObjectsToIDs.ts";
import {ShowingSubmit, ShowingSubmitSchema} from "@/pages/showings/schema/ShowingSubmitSchema.ts";
import {Showing} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {format} from "date-fns";

export default function useShowingSubmitForm(params?: { showing?: Showing }) {
    const {showing} = params || {};

    const defaultValues: ShowingSubmit = {
        startTime: "",
        endTime: "",
        ticketPrice: "",
        language: "",

        subtitleLanguages: [],

        isSpecialEvent: false,
        isActive: true,

        movie: undefined,
        theatre: undefined,
        screen: undefined,
    }

    const startTime = showing ? format(showing.startTime, "yyyy-MM-dd'T'hh:mm") : "";
    const endTime = showing?.endTime ? format(showing.endTime, "yyyy-MM-dd'T'hh:mm") : "";

    const relations = {
        movie: showing ? convertObjectsToIDs(showing.movie) : defaultValues.movie,
        theatre: showing ? convertObjectsToIDs(showing.theatre) : defaultValues.theatre,
        screen: showing ? convertObjectsToIDs(showing.screen) : defaultValues.screen
    }

    return useForm<ShowingSubmit>({
        resolver: zodResolver(ShowingSubmitSchema),
        defaultValues: {
            ...defaultValues,
            ...(showing ? showing : {}),
            startTime,
            endTime,
            ...relations,
        },
    });
}