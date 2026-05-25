import type { BodyFor, QueryFor, ResponseFor } from './client.js';
import type { QuickClient } from './client.js';

export type ListDocumentsParams = QueryFor<'/1/documents', 'get'>;
export type ListDocumentFilesParams = QueryFor<'/1/documents/files', 'get'>;

export class DocumentsApi {
  constructor(private readonly client: QuickClient) {}

  public list(params?: ListDocumentsParams): Promise<ResponseFor<'/1/documents', 'get'>> {
    return this.client.requestEndpoint('/1/documents', 'get', '/1/documents', { query: params });
  }

  public listFiles(params?: ListDocumentFilesParams): Promise<ResponseFor<'/1/documents/files', 'get'>> {
    return this.client.requestEndpoint('/1/documents/files', 'get', '/1/documents/files', { query: params });
  }

  public listTypes(): Promise<ResponseFor<'/2/document-types', 'get'>> {
    return this.client.requestEndpoint('/2/document-types', 'get', '/2/document-types');
  }

  public get(documentId: number): Promise<ResponseFor<'/2/documents/{document_id}', 'get'>> {
    return this.client.requestEndpoint('/2/documents/{document_id}', 'get', `/2/documents/${documentId}`);
  }

  public update(documentId: number, body: BodyFor<'/2/documents/update/{document_id}', 'post'>): Promise<ResponseFor<'/2/documents/update/{document_id}', 'post'>> {
    return this.client.requestEndpoint('/2/documents/update/{document_id}', 'post', `/2/documents/update/${documentId}`, { body });
  }

  public create(body: BodyFor<'/2/documents/create', 'post'>): Promise<ResponseFor<'/2/documents/create', 'post'>> {
    return this.client.requestEndpoint('/2/documents/create', 'post', '/2/documents/create', { body });
  }

  public delete(body: BodyFor<'/2/documents/delete', 'post'>): Promise<ResponseFor<'/2/documents/delete', 'post'>> {
    return this.client.requestEndpoint('/2/documents/delete', 'post', '/2/documents/delete', { body });
  }

  public attach(body: BodyFor<'/1/documents/attach', 'post'>): Promise<ResponseFor<'/1/documents/attach', 'post'>> {
    return this.client.requestEndpoint('/1/documents/attach', 'post', '/1/documents/attach', { body });
  }

  public detach(body: BodyFor<'/1/documents/detach', 'post'>): Promise<ResponseFor<'/1/documents/detach', 'post'>> {
    return this.client.requestEndpoint('/1/documents/detach', 'post', '/1/documents/detach', { body });
  }

  public search(body: BodyFor<'/2/documents/search', 'post'>): Promise<ResponseFor<'/2/documents/search', 'post'>> {
    return this.client.requestEndpoint('/2/documents/search', 'post', '/2/documents/search', { body });
  }
}
