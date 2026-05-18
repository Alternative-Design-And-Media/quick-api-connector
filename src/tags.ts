import type { BodyFor, QueryFor, QuickClient, ResponseFor } from './client.js';

export interface TagsApi {
  listTags(params?: QueryFor<'/2/tags', 'get'>): Promise<ResponseFor<'/2/tags', 'get'>>;
  createTags(body: BodyFor<'/2/tags/create', 'post'>): Promise<ResponseFor<'/2/tags/create', 'post'>>;
  updateTags(body: BodyFor<'/2/tags/update', 'patch'>): Promise<ResponseFor<'/2/tags/update', 'patch'>>;
  deleteTags(ids: number[]): Promise<ResponseFor<'/2/tags/delete', 'post'>>;
}

export const tagsMethods: TagsApi = {
  listTags(this: QuickClient, params) {
    return this.requestEndpoint('/2/tags', 'get', '/2/tags', { query: params });
  },

  createTags(this: QuickClient, body) {
    return this.requestEndpoint('/2/tags/create', 'post', '/2/tags/create', { body });
  },

  updateTags(this: QuickClient, body) {
    return this.requestEndpoint('/2/tags/update', 'patch', '/2/tags/update', { body });
  },

  deleteTags(this: QuickClient, ids) {
    return this.requestEndpoint('/2/tags/delete', 'post', '/2/tags/delete', { body: { ids } });
  },
};
