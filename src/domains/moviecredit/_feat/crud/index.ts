import {MovieCreditCRUDBaseURL} from "@/domains/moviecredit/_feat/crud/baseURL.ts";
import {MovieCreditCRUDQueryKeys} from "@/domains/moviecredit/_feat/crud/queryKeys.ts";
import {MovieCreditCRUDMutationKeys} from "@/domains/moviecredit/_feat/crud/mutationKeys.ts";
import {
    create, destroy,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    update
} from "@/domains/moviecredit/_feat/crud/repository.ts";

export {
    MovieCreditCRUDBaseURL,
    MovieCreditCRUDQueryKeys,
    MovieCreditCRUDMutationKeys,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    create,
    update,
    destroy,
}

