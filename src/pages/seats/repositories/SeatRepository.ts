import {createBaseRequestRepository} from "@/common/repositories/BaseRequestRepository.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/seats`;
const repository = createBaseRequestRepository({baseURL});

export default repository;