import {createRequestRepository} from "@/common/repositories/RequestRepository.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/movies`;
const repository = createRequestRepository({baseURL});

export default repository;

