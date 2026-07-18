import {FindDocumentsConfig, handleFind} from "@/common/_feat/crud-handlers/handlers/handleFind.ts";
import {CreateDocumentConfig, handleCreate} from "@/common/_feat/crud-handlers/handlers/handleCreate.ts";
import {DeleteDocumentConfig, handleDelete} from "@/common/_feat/crud-handlers/handlers/handleDelete.ts";
import {FindDocumentByIDConfig, handleFindByID} from "@/common/_feat/crud-handlers/handlers/handleFindByID.ts";
import {FindPaginatedDocumentsConfig, handlePaginated} from "@/common/_feat/crud-handlers/handlers/handlePaginated.ts";
import {FindDocumentsByQueryConfig, handleQuery} from "@/common/_feat/crud-handlers/handlers/handleQuery.ts";
import {handleUpdate, UpdateDocumentConfig} from "@/common/_feat/crud-handlers/handlers/handleUpdate.ts";
import {handleSoftDelete, SoftDeleteDocumentConfig} from "@/common/_feat/crud-handlers/handlers/handleSoftDelete.ts";
import {FindDocumentBySlugConfig, handleFindBySlug} from "@/common/_feat/crud-handlers/handlers/handleFindBySlug.ts";

export {
    handleFind,
    handleCreate,
    handleDelete,
    handleFindByID,
    handlePaginated,
    handleQuery,
    handleUpdate,
    handleSoftDelete,
    handleFindBySlug,
}
export type {
    FindDocumentsConfig,
    CreateDocumentConfig,
    DeleteDocumentConfig,
    FindDocumentByIDConfig,
    FindPaginatedDocumentsConfig,
    FindDocumentsByQueryConfig,
    UpdateDocumentConfig,
    SoftDeleteDocumentConfig,
    FindDocumentBySlugConfig,
}
