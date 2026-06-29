import {SeatMapCRUDBaseURL} from "@/domains/seatmaps/_feat/crud/baseURL.ts";
import {create, destroy, find, findByID, paginated, query, update} from "@/domains/seatmaps/_feat/crud/repository.ts";

export {
    SeatMapCRUDBaseURL,
    find,
    findByID,
    paginated,
    query,
    create,
    update,
    destroy,
}

