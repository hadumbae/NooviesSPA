import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

import {RequestPaginationOptions} from "@/common/type/request/RequestOptions.ts";

export type FetchTheatreDetailsParams = {
    theatreID: ObjectId;
    pagination: {screen?: RequestPaginationOptions, showing?: RequestPaginationOptions}
}