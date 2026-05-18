import type { BodyFor, QueryFor, QuickClient, ResponseFor } from './client.js';

export type ListDocumentsParams = QueryFor<'/1/documents', 'get'>;
export type ListDocumentFilesParams = QueryFor<'/1/documents/files', 'get'>;

export interface DocumentsApi {
  listDocuments(params?: ListDocumentsParams): Promise<ResponseFor<'/1/documents', 'get'>>;
  listDocumentFiles(params?: ListDocumentFilesParams): Promise<ResponseFor<'/1/documents/files', 'get'>>;
  listDocumentTypes(): Promise<ResponseFor<'/2/document-types', 'get'>>;
  getDocument(documentId: number): Promise<ResponseFor<'/2/documents/{document_id}', 'get'>>;
  updateDocument(documentId: number, body: BodyFor<'/2/documents/update/{document_id}', 'post'>): Promise<ResponseFor<'/2/documents/update/{document_id}', 'post'>>;
  createDocuments(body: BodyFor<'/2/documents/create', 'post'>): Promise<ResponseFor<'/2/documents/create', 'post'>>;
  deleteDocuments(body: BodyFor<'/2/documents/delete', 'post'>): Promise<ResponseFor<'/2/documents/delete', 'post'>>;
  attachDocuments(body: BodyFor<'/1/documents/attach', 'post'>): Promise<ResponseFor<'/1/documents/attach', 'post'>>;
  detachDocuments(body: BodyFor<'/1/documents/detach', 'post'>): Promise<ResponseFor<'/1/documents/detach', 'post'>>;
  searchDocument(body: BodyFor<'/2/documents/search', 'post'>): Promise<ResponseFor<'/2/documents/search', 'post'>>;
}

export const documentsMethods: DocumentsApi = {
  listDocuments(this: QuickClient, params) {
    return this.requestEndpoint('/1/documents', 'get', '/1/documents', { query: params });
  },

  listDocumentFiles(this: QuickClient, params) {
    return this.requestEndpoint('/1/documents/files', 'get', '/1/documents/files', { query: params });
  },

  listDocumentTypes(this: QuickClient) {
    return this.requestEndpoint('/2/document-types', 'get', '/2/document-types');
  },

  getDocument(this: QuickClient, documentId) {
    return this.requestEndpoint('/2/documents/{document_id}', 'get', `/2/documents/${documentId}`);
  },

  updateDocument(this: QuickClient, documentId, body) {
    return this.requestEndpoint('/2/documents/update/{document_id}', 'post', `/2/documents/update/${documentId}`, { body });
  },

  createDocuments(this: QuickClient, body) {
    return this.requestEndpoint('/2/documents/create', 'post', '/2/documents/create', { body });
  },

  deleteDocuments(this: QuickClient, body) {
    return this.requestEndpoint('/2/documents/delete', 'post', '/2/documents/delete', { body });
  },

  attachDocuments(this: QuickClient, body) {
    return this.requestEndpoint('/1/documents/attach', 'post', '/1/documents/attach', { body });
  },

  detachDocuments(this: QuickClient, body) {
    return this.requestEndpoint('/1/documents/detach', 'post', '/1/documents/detach', { body });
  },

  searchDocument(this: QuickClient, body) {
    return this.requestEndpoint('/2/documents/search', 'post', '/2/documents/search', { body });
  },
};
