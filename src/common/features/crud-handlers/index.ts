import {FindDocumentsConfig, handleFind} from "@/common/features/crud-handlers/handleFind.ts";
import {CreateDocumentConfig, handleCreate} from "@/common/features/crud-handlers/handleCreate.ts";
import {DeleteDocumentConfig, handleDelete} from "@/common/features/crud-handlers/handleDelete.ts";
import {FindDocumentByIDConfig, handleFindByID} from "@/common/features/crud-handlers/handleFindByID.ts";
import {FindPaginatedDocumentsConfig, handlePaginated} from "@/common/features/crud-handlers/handlePaginated.ts";
import {FindDocumentsByQueryConfig, handleQuery} from "@/common/features/crud-handlers/handleQuery.ts";
import {handleUpdate, UpdateDocumentConfig} from "@/common/features/crud-handlers/handleUpdate.ts";
import {handleSoftDelete, SoftDeleteDocumentConfig} from "@/common/features/crud-handlers/handleSoftDelete.ts";
import {FindDocumentBySlugConfig, handleFindBySlug} from "@/common/features/crud-handlers/handleFindBySlug.ts";

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
