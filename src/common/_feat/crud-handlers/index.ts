import {FindDocumentsConfig, handleFind} from "@/common/_feat/crud-handlers/handleFind.ts";
import {CreateDocumentConfig, handleCreate} from "@/common/_feat/crud-handlers/handleCreate.ts";
import {DeleteDocumentConfig, handleDelete} from "@/common/_feat/crud-handlers/handleDelete.ts";
import {FindDocumentByIDConfig, handleFindByID} from "@/common/_feat/crud-handlers/handleFindByID.ts";
import {FindPaginatedDocumentsConfig, handlePaginated} from "@/common/_feat/crud-handlers/handlePaginated.ts";
import {FindDocumentsByQueryConfig, handleQuery} from "@/common/_feat/crud-handlers/handleQuery.ts";
import {handleUpdate, UpdateDocumentConfig} from "@/common/_feat/crud-handlers/handleUpdate.ts";
import {handleSoftDelete, SoftDeleteDocumentConfig} from "@/common/_feat/crud-handlers/handleSoftDelete.ts";
import {FindDocumentBySlugConfig, handleFindBySlug} from "@/common/_feat/crud-handlers/handleFindBySlug.ts";

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
