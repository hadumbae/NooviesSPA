import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {EntityPaginatedQuery} from "@/common/type/repositories/EntityRequestParamTypes.ts";

export type FetchTheatreDetailsParams = {
    theatreID: ObjectId;
    pagination: {screen?: EntityPaginatedQuery, showing?: EntityPaginatedQuery}
}