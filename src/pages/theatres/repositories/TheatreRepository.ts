import {createRequestRepository} from "@/common/repositories/request-repository/RequestRepository.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/theatres`;
const repository = createRequestRepository({baseURL});

export default repository;