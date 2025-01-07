import {createBaseRequestRepository} from "@/common/repositories/BaseRequestRepository.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/persons`;
const personRepository = createBaseRequestRepository({baseURL: baseURL});

export default personRepository;