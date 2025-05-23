import {createBaseRequestRepository} from "@/common/repositories/BaseRequestRepository.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/movie/credits`;
const repository = createBaseRequestRepository({baseURL});

export default repository;